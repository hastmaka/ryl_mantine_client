import PropTypes from "prop-types";
import {useRef} from "react";
import {deepSignal} from "deepsignal/react";
import {
    CheckIcon,
    CloseButton,
    Combobox,
    Group,
    Input,
    Loader, Pill, PillsInput,
    ScrollArea,
    useCombobox
} from "@mantine/core";
import {valueToLabel} from "@/util/convertData.js";
import {FetchApi} from "@/api/FetchApi.js";
import {useDebouncedCallback} from "@mantine/hooks";

async function getAsyncData(url) {
    return await FetchApi(url, 'GET')
}

async function filterFn(value, url) {
    return await FetchApi(url, 'GET', null, {
        filter: JSON.stringify([{
            value,
            operator: 'like'
        }])
    });
}

export default function EzMultiSelect({
    url,
    comboProps,
    onOptionSubmit,
    searchable,
    clearable,
    value,
    ...inputProps
}) {
    if (!url || typeof url !== 'string') throw new Error('url is required and must be a string');

    // Create a unique `signal` instance for each component instance
    // little trick using useRef to keep the signal instance between renders
    const signal = useRef(deepSignal({
        data: [],
        search: '',
        loading: false,
        isSearching: false,
        storeName: url.split('/').pop()
    })).current;

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: async () => {
            if (signal.data.length === 0 && !signal.loading) {
                await getData()
            }
        },
    });

    const handleValueRemove = (val) => {
        onOptionSubmit(value.filter((v) => v !== val))
    }

    const handleSearch = useDebouncedCallback(async () => {
        signal.loading = true
        const response = await filterFn(signal.search, url);
        signal.data = response.data;
        signal.loading = false
    }, 500);

    const values = value.map((item) => (
        <Pill
            key={item}
            withRemoveButton
            onRemove={() => handleValueRemove(item)}
        >
            {valueToLabel(signal.storeName, item)}
        </Pill>
    ));

    const options = signal.data
        .filter((item) => {
            return item.label.toLowerCase().includes(signal.search.trim().toLowerCase())
        })
        .map(({label, value: val}) => {
            const is = value.some((v) => v === val);
            return <Combobox.Option
                value={val}
                key={val}
                onClick={() => {
                    if (is) handleValueRemove(val)
                }}
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
        signal.data = response.data;
        signal.loading = false
        combobox.resetSelectedOption();
    }

    return (
        <Combobox
            store={combobox}
            flex={1}
            offset={4}
            {...comboProps}
            onOptionSubmit={(val) => {
                signal.isSearching = false;
                onOptionSubmit(val);
            }}
        >
            <Combobox.DropdownTarget>
                <PillsInput
                    onClick={() => {
                        combobox.toggleDropdown()
                        if (combobox.dropdownOpened) {
                            signal.isSearching = false;
                            signal.search = '';
                        }
                    }}
                    pointer
                    {...inputProps}
                    {...(clearable && !value.length && {rightSectionPointerEvents: "none"})}
                    rightSection={
                        signal.loading
                            ? <Loader size={18} />
                            : clearable && value.length > 0 ? (
                                <CloseButton
                                    size="sm"
                                    onMouseDown={(event) => event.preventDefault()}
                                    onClick={async () => {
                                        onOptionSubmit([])
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
                    <Pill.Group>
                        {values.length > 0 ? (
                            values
                        ) : (
                            <Input.Placeholder>{inputProps.placeholder || 'Pick value'}</Input.Placeholder>
                        )}

                        <Combobox.EventsTarget>
                            <PillsInput.Field
                                type="hidden"
                                onKeyDown={(event) => {
                                    if (event.key === 'Backspace') {
                                        event.preventDefault();
                                        handleValueRemove(value[value.length - 1]);
                                    }
                                }}
                            />
                        </Combobox.EventsTarget>
                    </Pill.Group>
                </PillsInput>
            </Combobox.DropdownTarget>

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

EzMultiSelect.propTypes = {
    comboProps: PropTypes.object,
    inputProps: PropTypes.object,
    onOptionSubmit: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired,
    url: PropTypes.string.isRequired,
    searchable: PropTypes.bool,
    clearable: PropTypes.bool,
}
