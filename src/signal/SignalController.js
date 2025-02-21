import {SignalState} from "./SignalClass.js";

/**
 * All whereverData and whereverLoading is created from the GetData method:
 * example:
 * whereverGetData() -> remember wrapped in a setTimeout to simulate the server response
 * will create
 * whereverData: []
 * whereverLoading: false
 * @param recordId
 * this is the id we are going to use to fetch the data from the server, and to identify the every tab
 * @param method
 * resetState: SignalState create a deep copy from the props object to reset the state to its initial state
 * @param localData
 * when working with local data have to pass an object with the local data, from this the class will generate
 * isAdding and tempId needed to keep track of the local state
 * @param mode
 * can call this class with mode === 'create' to avoid the check for GetData methods and use it as a regular
 * state controller, to handle formData, errors, etc.
 */

export class SignalController extends SignalState {
    constructor(props, func) {
        if (!props || !func) throw new Error('SignalController requires props and func arguments');
        let defaultProps = {
            recordId: null,
            modal: {loading: true, state: ''},
            formState: 'create',
            formData: {},
            errors: {},
            references: {},
            ...props
        };
        super(defaultProps, func);
        this.addDefaultMethods();
    }

    addDefaultMethods() {
        let defaultMethods = {
            handleInput: (type, name, value, api) => {
                if (!type && typeof type === 'string') throw new Error('type is required')
                if (!name && typeof name === 'string') console.warn('no name was provided')
                if (!this.signal['errors'][type]) this.signal['errors'][type] = {}
                let tempValue = value;

                if (api) {
                    const isArr = Array.isArray(value);
                    // if the key doesn't exist in the formData object, create it
                    const keyExist = Object.prototype.hasOwnProperty.call(this.signal['formData'], type) && Object.prototype.hasOwnProperty.call(this.signal['formData'][type], name);
                    // if we have an obj, add it
                    if (!keyExist) {
                        tempValue = !isArr ? [value] : value;
                    } else {
                        tempValue = !isArr ? [...this.signal['formData'][type][name], value] : value;
                    }
                }

                if (this.signal['errors'][type][name] && value) {
                    delete this.signal['errors'][type][name]
                }

                if (name !== null) {
                    this.signal['formData'][type] = {
                        ...this.signal['formData'][type],
                        [name]: tempValue
                    }
                } else {
                    this.signal['formData'] = {
                        ...this.signal['formData'],
                        [type]: tempValue
                    }
                }

            },
            /**
             * single: setErrors(type, name, msg)
             * multiple: setErrors([[type, name, msg], [type, name, msg]])
             * */
            setErrors: (type, name, msg) => {
                if (Array.isArray(type)) {
                    type.forEach(([type, name, msg]) => {
                        if (!this.signal['errors'][type]) this.signal['errors'][type] = {};
                        this.signal['errors'][type][name] = msg;
                    });
                } else {
                    if (!this.signal['errors'][type]) this.signal['errors'][type] = {}
                    this.signal['errors'][type][name] = msg;
                }
            },
            checkRequired: (type, fields) => {
                //check if at least is one required field
                if (fields.some(field => field.required)) {
                    fields.forEach(field => {
                        if (field.required && !this.signal['formData'][type]?.[field.name]) {
                            this.signal['setErrors'](type, field.name, 'This field is required')
                        }
                    })
                } else {
                    console.warn(`checkRequired-${type}: No required fields found`)
                }

                if (Object.prototype.hasOwnProperty.call(this.signal['errors'], type)) {
                    return !Object.keys(this.signal['errors'][type]).length;
                } else {
                    return true;
                }
            },
            closeModal: () => {
                //this is to let the animation finish
                setTimeout(() => {this.signal.modal.loading = false}, 200)
            },
            resetState: () => {
                //this is to let the animation finish
                setTimeout(() => {
                    //reset all keys to their initial state
                    Object.keys(this.reset).forEach(key => {
                        this.signal[key] = this.reset[key]
                    })
                    //here is a bug so, I have to reset the errors and formData manually
                    this.signal.errors = {}
                    this.signal.formData = {}
                    this.signal.modal = {loading: true, state: ''};
                }, 200)
            },
            /**
             * to manage to load data from the server when the modal is in edit mode, need to pass the editMap
             * with all the cases needed
             * */
            modalData: async (type, id, who) => {
                if (!type && typeof type === 'string') throw new Error('Type is required')
                if (id) {
                    if (!this.signal['editMap'] && !(typeof this.signal['editMap'] === 'object')) {
                        throw new Error('editMap is required')
                    }
                    await this.signal['editMap'][type](id, who)
                }
                // no id means modal is in create mode
                this.signal['modal'] = {
                    ...this.signal['modal'],
                    loading: false,
                    state: id ? 'edit' : 'create'
                }
            },
        }

        let keys = Object.keys(this.signal),
            loadingKeys = [],
            dataMethods = [];
        //creating variable to store data for each get method
        keys.map(key => {
            if (key.includes('GetData')) {
                let dataKey = key.replace('Get', ''),
                    loadingKey = key.replace('GetData', 'Loading');
                this.signal[dataKey] = []
                this.signal[loadingKey] = true

                // Store loading keys for later use in reloadView
                loadingKeys.push(loadingKey);

                //refreshView method
                dataMethods.push(this.signal[key]);
            }
        });

        if (this.signal['mode'] !== 'create') {
            if (!loadingKeys.length || !dataMethods.length) {
                throw new Error('No GetData methods found');
            }
        }

        // Add reloadView method
        if(loadingKeys.length > 0) {
            defaultMethods['reloadView'] = () => {
                // Reset all loading keys to true
                loadingKeys.forEach(loadingKey => {
                    this.signal[loadingKey] = true;
                });
            };
        }

        // Add refreshView method
        if (dataMethods.length > 0) {
            defaultMethods['refreshView'] = async () => {
                // Call all GetData methods asynchronously using Promise.all
                await Promise.all(
                    dataMethods.map((method) => method())
                );
            };
        }

        //inject default methods into signal
        for (const key in defaultMethods) {
            if (!Object.prototype.hasOwnProperty.call(this.signal, key)) {
                this.signal[key] = defaultMethods[key].bind(this.signal);
            }
        }
    }
}