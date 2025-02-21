import PropTypes from "prop-types";
import {
    ActionIcon,
    Autocomplete, Checkbox, Flex,
    NumberInput, rem,
    Stack, Textarea,
    TextInput
} from "@mantine/core";
import {DateInput, DatePickerInput, DateTimePicker, TimeInput} from "@mantine/dates";
import {formatPhoneNumber} from "@/util/index.js";
// import EzRemoteSelect from "./field/EzRemoteSelect.jsx";
// import EzRemoteMultiSelect from "@/component/forms/field/EzRemoteMultiSelect.jsx";
import moment from "moment";
import {useRef} from "react";
import {IconClock} from "@tabler/icons-react";
import {EzSelect} from "@/ezMantine/select/EzSelect.jsx";
import EzMultiSelect from "@/ezMantine/multiSelect/EzMultiSelect.jsx";

const splitArray = (arr, lengths) => {
    const result = [];
    let index = 0;
    for (const length of lengths) {
        if (index + length <= arr.length) {
            result.push(arr.slice(index, index + length));
            index += length;
        } else {
            throw new Error(`FormGenerator - Structure doesn't match Fields, cannot split the array.`);
        }
    }
    return result;
}

// const getPlaceholderFromName = (str) => {
//     return str.split('_')
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(' ');
// }

const variant = 'filled';

export default function FormGenerator({field, handleInput, structure, ...rest}) {
    // to store the ref of the time picker
    const timeRef = useRef({})

    const renderFieldsWithStyles = () => {
        const updateFields = splitArray(field, structure);
        return (
            <Stack flex={1} gap={16} {...rest.inputContainer}>
                {updateFields.map((item, index) => {
                    return <Flex key={`${item.name}-${index}`} gap={16} {...rest.inputWrapper}>
                        {GenerateFields(item)}
                    </Flex>
                })}
            </Stack>
        )
    }

    const GenerateFields = (field) => {
        return field.map(({type='string', name, label, placeholder, required, options, ...fieldRest}, index) => {
            switch (type) {
                case 'string':
                    return (
                        <TextInput
                            key={index}
                            variant={variant}
                            size={rest?.size || 'sm'}
                            flex={1}
                            name={name}
                            label={label}
                            placeholder={placeholder || label}
                            required={rest.required || required}
                            value={rest?.formData?.[name] || ''}
                            onChange={(e) => handleInput(name, e.target.value)}
                            error={rest.errors?.[name] || ''}
                            {...fieldRest}
                        />
                    )
                case 'number':
                    return (
                        <NumberInput
                            key={index}
                            label={label}
                            variant={variant}
                            size={rest?.size || 'sm'}
                            flex={1}
                            placeholder={placeholder || label}
                            required={rest.required || required}
                            hideControls
                            type='tel'
                            value={rest?.formData?.[name] || ''}
                            onChange={(v) => handleInput(name, v)}
                            error={rest.errors?.[name] || ''}
                            {...fieldRest}
                        />
                    )
                case 'phone':
                    return (
                        <TextInput
                            key={index}
                            variant={variant}
                            size={rest?.size || 'sm'}
                            flex={1}
                            name={name}
                            label={label}
                            placeholder={placeholder || label}
                            required={rest.required || required}
                            value={rest?.formData?.[name] || ''}
                            onChange={(e) => handleInput(name, formatPhoneNumber(e.target.value))}
                            error={rest.errors?.[name] || ''}
                            {...fieldRest}
                        />
                    )
                case 'textarea':
                    return (
                        <Textarea
                            key={index}
                            required={rest.required || required}
                            variant={variant}
                            label={label}
                            size={rest?.size || 'sm'}
                            flex={1}
                            placeholder={placeholder || label}
                            value={rest?.formData?.[name] || ''}
                            onChange={(e) => handleInput(name, e.target.value)}
                            error={rest.errors?.[name] || ''}
                            {...fieldRest}
                        />
                    )
                case 'select':
                    return (
                        <EzSelect
                            key={index}
                            variant={variant}
                            size={rest?.size || 'sm'}
                            label={label}
                            placeholder={placeholder || label}
                            data={options}
                            onOptionSubmit={(v) => handleInput(name, v)}
                            clearable
                            value={rest?.formData?.[name] || ''}
                            required={rest.required || required}
                            error={rest.errors?.[name] || ''}
                            //we have to send the flex property to the combobox
                            comboProps={{flex: fieldRest.flex}}
                            {...fieldRest}
                        />
                    )
                case 'multiSelect':
                    return (
                        <EzMultiSelect
                            key={index}
                            variant={variant}
                            size={rest?.size || 'sm'}
                            flex={1}
                            label={label}
                            clearable
                            placeholder={placeholder || label}
                            data={options}
                            onOptionSubmit={(v) => handleInput(name, v, true)}
                            value={rest?.formData?.[name] || []}
                            required={rest.required || required}
                            error={rest.errors?.[name] || ''}
                            {...fieldRest}
                        />
                    )
                case 'checkbox':
                    return (
                        <Checkbox
                            key={index}
                            variant={variant}
                            size={rest?.size || 'sm'}
                            flex={1}
                            label={label}
                            placeholder={placeholder || label}
                            data={options}
                            onChange={(e) => handleInput(name, e.target.checked)}
                            checked={rest?.formData?.[name] || ''}
                            required={rest.required || required}
                            error={rest.errors?.[name] || ''}
                            {...fieldRest}
                        />
                    )
                case 'autocomplete':
                    return (
                        <Autocomplete
                            key={index}
                            required={rest.required || required}
                            variant={variant}
                            label={label}
                            size={rest?.size || 'sm'}
                            flex={1}
                            placeholder={placeholder || label}
                            data={options}
                            value={rest?.formData?.[name] || ''}
                            onChange={(v) => handleInput(name, v)}
                            error={rest.errors?.[name] || ''}
                            {...fieldRest}
                        />
                    )
                case 'dateTimePicker':
                    return (
                        <DateTimePicker
                            key={index}
                            clearable
                            label={label}
                            required={rest.required || required}
                            variant={variant}
                            size={rest?.size || 'sm'}
                            flex={1}
                            placeholder={placeholder || label}
                            valueFormat="MMM DD YYYY hh:mm A"
                            value={rest?.formData?.[name]? new Date(rest?.formData?.[name]) : null}
                            onChange={(v) => handleInput(name, v)}
                            error={rest.errors?.[name] || ''}
                            {...fieldRest}
                        />
                    )
                case 'datePickerInput':
                    return (
                        <DatePickerInput
                            key={index}
                            clearable
                            label={label}
                            required={rest.required || required}
                            variant={variant}
                            size={rest?.size || 'sm'}
                            flex={1}
                            placeholder={placeholder || label}
                            valueFormat="MMM DD YYYY"
                            value={rest?.formData?.[name]? new Date(rest?.formData?.[name]) : null}
                            onChange={(v) => handleInput(name, v ? moment(v).format('MM/DD/YYYY') : null)}
                            error={rest.errors?.[name] || ''}
                            {...fieldRest}
                        />
                    )
                case 'date':
                    return (
                        <DateInput
                            key={index}
                            clearable
                            label={label}
                            required={rest.required || required}
                            variant={variant}
                            size={rest?.size || 'sm'}
                            flex={1}
                            placeholder={placeholder || label}
                            valueFormat="MMM DD YYYY"
                            value={rest?.formData?.[name]? new Date(rest?.formData?.[name]) : null}
                            onChange={(v) => handleInput(name, v ? moment(v).format('MM/DD/YYYY') : null)}
                            error={rest.errors?.[name] || ''}
                            {...fieldRest}
                        />
                    )
                case 'time': {
                    const pickerControl = (
                        <ActionIcon variant="subtle" color="gray" onClick={() => timeRef.current[name]?.showPicker()}>
                            <IconClock style={{width: rem(16), height: rem(16)}} stroke={1.5}/>
                        </ActionIcon>
                    );
                    return (
                        <TimeInput
                            key={index}
                            ref={(el) => timeRef.current[name] = el}
                            rightSection={pickerControl}
                            label={label}
                            required={rest.required || required}
                            variant={variant}
                            size={rest?.size || 'sm'}
                            flex={1}
                            placeholder={placeholder || label}
                            value={rest?.formData?.[name] || ''}
                            onChange={(e) => handleInput(name, e.target.value)}
                            error={rest.errors?.[name] || ''}
                            {...fieldRest}
                        />
                    )
                }
                default:
                    return null
            }
        })
    }

    if (structure && structure.length) {
        return renderFieldsWithStyles()
    } else {
        return GenerateFields(field)
    }
}

FormGenerator.propTypes = {
    field: PropTypes.array.isRequired,
    handleInput: PropTypes.func.isRequired,
    structure: PropTypes.array,
    rest: PropTypes.shape({
        inputContainer: PropTypes.object,
        inputWrapper: PropTypes.object,
        size: PropTypes.string,
        formData: PropTypes.object,
        errors: PropTypes.object,
        required: PropTypes.bool
    })
}


// <FormGenerator
//     field={FIELDS}
//     structure={[2]}
//     handleInput={(name, value, api) => handleInput(type, name, value, api)}
//     inputContainer={{gap: 8}}
//     formData={{...formData[type]}}
//     errors={errors[type]}
// />