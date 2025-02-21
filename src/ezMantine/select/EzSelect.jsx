import {useLayoutEffect, useRef} from 'react';
import {
    CloseButton,
    Combobox,
    InputBase,
    Input,
    Loader,
    useCombobox,
    ScrollArea,
    Group,
    CheckIcon
} from '@mantine/core';
import PropTypes from "prop-types";
import {FetchApi} from "@/api/FetchApi.js";
import {useDebouncedCallback} from "@mantine/hooks";
import {deepSignal} from "deepsignal/react";
import {valueToLabel} from "@/util/convertData.js";

async function getAsyncData(url) {
    return await FetchApi(url)
}

async function filterFn(value, url) {
    return await FetchApi(url, 'GET', null, {
        filter: JSON.stringify([{
            value,
            operator: 'like'
        }])
    });
}

/**
 * This component can work as remote or local or as a hybrid:
 * If you want to work local or need to manage the states outside for any reason, need to pass
 * data,loading and value.
 *
 * To work remote just pass the url and the iterator, like an obj {value: 'specify value',label:
 * 'specify label'}, just in case the data does not come with that format.
 * @param url - to work remotely
 * @param comboProps
 * @param onOptionSubmit
 * @param searchable
 * @param clearable
 * @param value
 * @param iterator - {value: 'specify value', label: 'specify label'}
 * @param loading
 * @param data - only when use it local and handling the states outside
 * @param inputProps
 * @returns {JSX.Element}
 * @constructor
 */

export function EzSelect({
    url,
    comboProps,
    onOptionSubmit,
    searchable,
    clearable,
    value,
    iterator,
    loading,
    data,
    ...inputProps
}) {
    if (!data || !Array.isArray(data)) {
        if (!url || typeof url !== 'string')
            throw new Error('To work as remote select, it must provide url and must be a string');
    }
    // Create a unique `signal` instance for each component instance
    // little trick using useRef to keep the signal instance between renders
    const signal = useRef(deepSignal({
        data: [],
        search: '',
        loading: false,
        isSearching: false,
        storeName: url?.split('/').pop() || null,
        lastUrlUsed: ''
    })).current;

    useLayoutEffect(() => {
        signal.data = data || []
        signal.loading = loading
    }, [data, loading]);

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: async () => {
            if (data && data.length > 0) {
                signal.loading = false
                combobox.resetSelectedOption();
            } else {
                if (url !== signal.lastUrlUsed || signal.data.length === 0 && !signal.loading) {
                    await getData()
                }
            }
        }
    });

    const handleSearch = useDebouncedCallback(async () => {
        signal.loading = true
        const response = await filterFn(signal.search, url);
        signal.data = response.data;
        signal.loading = false
    }, 500);

    const options = signal.data
        .filter((item) => {
            return item.label.toLowerCase().includes(signal.search.trim().toLowerCase())
        })
        .map(({label, value: val}) => {
            const is = value === val || label === value
            return <Combobox.Option
                value={val}
                key={val}
            >
                <Group gap="sm">
                    {is ? <CheckIcon size={12}/> : null}
                    <span>{label}</span>
                </Group>
            </Combobox.Option>
        });

    const getData = async () => {
        signal.loading = true
        const response = await getAsyncData(url);
        const {checkIfObjectHasKey} = await import('../../util/index.js')
        const hasRequiredKeys = response.data.every((item) => {
            return checkIfObjectHasKey(item, ['value', 'label'])
        })
        if (!hasRequiredKeys) {
            signal.storeName = undefined
            if (iterator || typeof iterator === 'object' || checkIfObjectHasKey(iterator, ['value', 'label'])) {
                signal.data = response.data.map((item) => {
                    return {
                        label: item[iterator.label],
                        value: item[iterator.value].toString(),
                    }
                })
            } else {
                throw new Error(`Must provide "Iterator" like an object, having value and label defined in it`)
            }
        } else {
            signal.data = response.data;
        }

        signal.loading = false
        signal.lastUrlUsed = url;
        combobox.resetSelectedOption();
    }

    const renderLabel = async () => {
        const {isNumber} = await import('../../util/index.js');
        return !isNumber(value) && value ||
            valueToLabel(signal.storeName, value) ||
            <Input.Placeholder>{inputProps.placeholder || 'Pick value'}</Input.Placeholder>
    }

    return (
        <Combobox
            store={combobox}
            flex={1}
            offset={4}
            {...comboProps}
            onOptionSubmit={(val) => {
                signal.isSearching = false;
                combobox.closeDropdown();
                onOptionSubmit(val);
            }}
        >
            <Combobox.Target>
                <InputBase
                    {...inputProps}
                    flex={1}
                    component="button"
                    type="button"
                    pointer
                    onClick={() => {
                        combobox.toggleDropdown()
                        if (combobox.dropdownOpened) {
                            signal.isSearching = false;
                            signal.search = '';
                        }
                    }}
                    {...(clearable && !value && {rightSectionPointerEvents: "none"})}
                    rightSection={
                        signal.loading
                            ? <Loader size={18} />
                            : clearable && value ? (
                                <CloseButton
                                    size="sm"
                                    onMouseDown={(event) => event.preventDefault()}
                                    onClick={async () => {
                                        onOptionSubmit('')
                                        signal.isSearching = false;
                                        signal.search = '';
                                        if (!combobox.dropdownOpened) combobox.openDropdown();
                                        if (searchable) await getData()
                                    }}
                                    aria-label="Clear value"
                                />
                            ) : (
                                <Combobox.Chevron
                                    style={{cursor: 'pointer'}}
                                />
                            )
                    }
                >
                    {renderLabel()}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                {searchable && <Combobox.Search
                    value={signal.search}
                    onChange={async (event) => {
                        signal.search = event.currentTarget.value;
                        if (!event.currentTarget?.value) {
                            await getData()
                        } else {
                            if (event.currentTarget.value.length >= 3) {
                                signal.isSearching = true;
                                handleSearch();
                            }
                        }
                    }}
                    placeholder="Filter or Search (min 3 characters)"
                />}
                <Combobox.Options>
                    <ScrollArea.Autosize mah={200} type="always" scrollbars='y'>
                        {signal.loading
                            ? <Combobox.Empty>Loading....</Combobox.Empty>
                            : options.length > 0
                            ? options
                            : <Combobox.Empty>Nothing found</Combobox.Empty>
                        }
                    </ScrollArea.Autosize>
                </Combobox.Options>
                {/*<Combobox.Footer>*/}
                {/*    <span>this is a test</span>*/}
                {/*</Combobox.Footer>*/}
            </Combobox.Dropdown>
        </Combobox>
    );
}

EzSelect.propTypes = {
    comboProps: PropTypes.object,
    inputProps: PropTypes.object,
    onOptionSubmit: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    url: PropTypes.string,
    searchable: PropTypes.bool,
    clearable: PropTypes.bool,
    iterator: PropTypes.object,
    loading: PropTypes.bool,
    data: PropTypes.array,
}

//with search in the same input
// <InputBase
//     value={signal.isSearching ? search : selectedOption?.label || ''}
//     label="Search value"
//     placeholder="Search value"
//     component="button"
//     type="button"
//     pointer
//     {...inputProps}
//     onClick={async (event) => {
//         combobox.openDropdown();
//         combobox.updateSelectedOptionIndex();
//         setSearch(event.currentTarget.value);
//         signal.isSearching = true;
//         if (!event.currentTarget?.value) {
//             await getData()
//         } else {
//             if (event.currentTarget.value.length >= 3) {
//                 handleSearch();
//             }
//         }
//     }}
//     // onClick={() => combobox.toggleDropdown()}
//     onFocus={() => combobox.openDropdown()}
//     onBlur={() => {
//         combobox.closeDropdown();
//         onOptionSubmit(value || {});
//     }}
//
//     rightSection={
//         signal.loading
//             ? <Loader size={18} />
//             : value?.value ? (
//                 <CloseButton
//                     size="sm"
//                     onMouseDown={(event) => event.preventDefault()}
//                     onClick={async () => {
//                         onOptionSubmit({})
//                         signal.isSearching = false;
//                         await getData()
//                     }}
//                     aria-label="Clear value"
//                 />
//             ) : (
//                 <Combobox.Chevron />
//             )
//     }
// />