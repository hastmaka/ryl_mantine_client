import './MessageForm.module.scss'
import EzTitle from "../EzTitle.jsx";
import {Center, Loader, Stack, TextInput} from "@mantine/core";
import BookNowBtn from "../BookNowBtn.jsx";
import useLanguage from "@/util/hook/useLanguage.jsx";
import {useState} from "react";
import {getSendEmail} from "@/util/index.js";
import MotionCenter from "./MotionCenter.jsx";

export default function MessageForm({action}) {
    const lang = useLanguage()
    const [state, setState] = useState({
        loading: false,
        messageSentSuccessfully: false
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setState(prevState => ({...prevState, loading: true}))
        let formData = new FormData(e.target),
            data = Object.fromEntries(formData.entries()),
            sendEmail = await getSendEmail();
        await sendEmail(data, data.email, 'RYL Contact',() => {
            setState({
                loading: false,
                messageSentSuccessfully: true
            })

            setTimeout(() => {
                setState(prevState => ({...prevState, messageSentSuccessfully: false}))
            }, 5000)
        })
    }

    if (state.loading) {
        return (
            <Center flex={1} py='4rem'>
                <Loader color="teal" size="xl" type="dots" />
            </Center>
        )
    }

    if (state.messageSentSuccessfully) {
        return <MotionCenter/>
    }

    return (
        <Stack flex={1} pt={action ? 0 : '1.5rem'} component='form' onSubmit={handleSubmit}>
            <EzTitle h4={lang('home.why-us.form-title')}/>
            <TextInput
                className='input'
                type="email"
                required
                placeholder={lang('form.messageForm.emailPlaceholder')}
                pt={action ? 0 : '1.5rem'}
                name='email'
            />
            <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                placeholder={lang('form.messageForm.messagePlaceholder')}
                required
                className='textarea'
            />
            <BookNowBtn text='home.why-us.btn' big type='submit'/>

        </Stack>
    )
}

MessageForm.propTypes = {}
