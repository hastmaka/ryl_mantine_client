import PropTypes from "prop-types";
import classes from './FormGenerator.module.scss'
import {generalSignal} from "@/signal/generalSignal.js";
import {
    Button, Checkbox, Flex,
    LoadingOverlay,
    Stack, Text,
    Textarea,
} from "@mantine/core";
import {deepSignal} from "deepsignal/react";
import FormGenerator from "./FormGenerator.jsx";
// import {Optional} from "../../static/bookingForm/BookingFormFields.jsx";


const s = deepSignal({
    formData: {},
    handleInput(name, v){
        s.formData[name] = v;
    }
})

export default function ServiceForm({fields}) {
    const {handleSubmitForm, loading, needExtra, setNeedExtra} = generalSignal
    const handleSubmitService = async (e) => {
        e.preventDefault()
        await handleSubmitForm(s.formData)
    }

    return (
        <Stack component='form' onSubmit={handleSubmitService}>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Text size='clamp(.6rem, .6vw, .6rem)' c='dark.6'>every service has a flat rate of 100/hr</Text>
            <FormGenerator data={fields} handleInput={s.handleInput}/>

            <Textarea
                variant="filled"
                placeholder="Message..."
                onChange={(e) => s.handleInput('note', e.target.value)}
            />

            <Checkbox
                checked={needExtra}
                color='#ffa200'
                label='Round Trip'
                onChange={() => setNeedExtra()}
            />

            {/*{needExtra && (*/}
            {/*    <FormGenerator data={Optional} handleInput={s.handleInput}/>*/}
            {/*)}*/}

            <Flex p='1rem 0 0 0' justify='flex-end'>
                <Button
                    type='submit'
                    className={classes.button}
                >
                    Send
                </Button>
            </Flex>
        </Stack>
    )
}

ServiceForm.propTypes = {
    fields: PropTypes.array.isRequired,
}
