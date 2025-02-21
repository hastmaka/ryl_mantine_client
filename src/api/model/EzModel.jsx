import moment from "moment";

const convertData = (value, type) => {
    let valueTypes = {
        int: (value) => {
            if (!value && value !== 0) return null;
            return parseInt(value);
        },
        boolean: (value) => {
            return !!value;
        },
        string: (value) => {
            if (!value) return '';
            return value.toString()
        },
        object: (value) => {
            if (!value) return {};
            return {...value}
        },
        array: (value) => {
            if (!value) return [];
            return [...value]
        },
        date: (value) => {
            if (!value) return '';
            return moment(value).format('MM/DD/YYYY');
        },
        'date-from-time-stamp': (value) => {
            if (!value) return '';
            return moment.unix(value.seconds).format('MM/DD/YYYY');
        },
        json: (value) => {
            if (!value) return '';
            return JSON.parse(value)
        },
        phone: async (value) => {
            if (!value) return '';
            const {formatPhoneNumber} = await import('../../util/index.js')
            return formatPhoneNumber(value)
        }
    }

    try {
        return valueTypes[type](value)
    } catch (error) {
        return null
    }
}

export default class EzModel {
    constructor({fields, data, suffix, requiresPrimary}) {
        // model name, it matches with the db table name
        EzModel.suffix = suffix;

        for (let {name, type, render, mapping, instance} of fields) {
            // if instance is provided, it means that the field is an instance or
            // an array of instances of the model provided in the instance field
            if (instance) {
                this[name] = instance.instantiate(data[mapping] || data[name]);
                if (instance.getPrimary) {
                    if (this[name]?.length || this[name]?.[instance.suffix]) {
                        this[suffix + '_primary_' + instance.suffix] = instance.getPrimary(this[name]);
                    }
                }
            }
            // if render is provided, it means that the field is a computed field
            else if (render) {
                this[name] = render(data[mapping] || data[name], data);
            } else {
                this[name] = convertData(data[mapping] || data[name], type);
            }

            data[name] = this[name];
        }

        // this adds a function to all models that instantiates the model with the data provided
        EzModel.instantiate = function (dataToInstantiate) {
            let me = this;

            if (!dataToInstantiate) return [];

            if (Array.isArray(dataToInstantiate)) {
                return dataToInstantiate.map(instance => new me(instance));
            }

            return new me(dataToInstantiate);
        };

        // when a model is created, it checks if the model requires a primary
        // instance, if it does, it adds a function to get the primary instance
        if (requiresPrimary) {
            EzModel.getPrimary = (dataToGetPrimary) => {
                // if the data is an array, it returns the first instance that has the primary field set to true
                if (!dataToGetPrimary?.length) return dataToGetPrimary[suffix + '_id']? dataToGetPrimary : {};

                return dataToGetPrimary.find(instance => instance[suffix + '_primary']) || dataToGetPrimary[0];
            };
        }
    }

    get(field) {
        return this[field];
    }

    set(field, value) {
        if (field !== undefined && field !== null && typeof field === 'object') {
            for (let [key, val] of Object.entries(field)) {
                if (Object.prototype.hasOwnProperty.call(field, key)) {
                    this[key] = val;
                }
            }
        } else {
            this[field] = value;
        }
    }
}