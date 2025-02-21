import {useEffect, useState} from 'react';
import {MultiSelect} from "@mantine/core";
import {FetchApi} from "@/api/FetchApi.js";
import {deepSignal} from "deepsignal/react";
import PropTypes from "prop-types";

const waitForWriting = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

const serializer = (data, api) => {
    if (api.model) {
        data = data.map(item => new api.model(item));
    }
    return data.map(item => {
        return {
            value: `${item[api.value]}`,
            label: `${item[api.label]}`
        }
    });
};

const store = deepSignal({
    data: {},

    getData: async (api) => {
        await store.filterBlankFn({api});
    },

    handleFirst: async (api, value) => {
        if (value) {
            await store.getData(api, value);
        }
    },

    filterFn: waitForWriting(async ({value, api}) => {
        if (value.length >= 3 && value) {
            let response = await FetchApi(api.url, 'GET', null, {
                filter: JSON.stringify([{
                    property: api.label,
                    value,
                    operator: 'like'
                }])
            });
            store.saveData(response, api);
        }
    }, 700),

    filterBlankFn: async ({api}) => {
        let response = await FetchApi(api.url, 'GET');
        store.saveData(response, api);
    },

    saveData: (response, api) => {
        store.data[api.reference] = {
            local: serializer(response.data, api),
            remote: response.data
        }
    }
});

const EzRemoteMultiSelect = ({api, onChange, ...rest}) => {
    const [first, setFirst] = useState(true);
    const [lastValue, setLastValue] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        store.handleFirst(api, rest.value).then(() => {
            if (rest?.value.length) {
                setLoading(false);
                setFirst(false);
            }
        })

        return () => {
            store.data = {};
        }
    }, []);

    return (
        <MultiSelect
            {...rest}
            data={store?.data?.[api.reference]?.local || []}
            onChange={(value) => {
                setLoading(true);
                if (!value) {
                    if (!store.data[api.reference]) {
                        store.data[api.reference] = {};
                    }
                    store.data[api.reference].local = [];
                }

                onChange(value || '')
            }}
            nothingFoundMessage={first || loading ? "Loading..." : "Nothing found"}
            onDropdownOpen={async () => {
                if (first) {
                    setLoading(true);
                    await store.getData(api, rest.value);
                    setLoading(false);
                    setFirst(false);
                }
            }}
            onSearchChange={async (value) => {
                setLoading(true);
                if (lastValue === value) return;

                if (!value) {
                    if (!store.data[api.reference]) {
                        store.data[api.reference] = {};
                    }
                    store.data[api.reference].local = [];
                    onChange('');
                    setLastValue('')

                    await store.filterBlankFn({value, api});
                    return setLoading(false);
                }

                await store.filterFn({value, api});
                setLastValue(value)
                setLoading(false);
            }}
            searchable
        />
    );
};

EzRemoteMultiSelect.propTypes = {
    api: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default EzRemoteMultiSelect;