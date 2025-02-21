import {Center, Paper, PasswordInput, TextInput} from '@mantine/core'
import {CrmController} from "@/view/crm/CrmController.js";
import {useForm} from "@mantine/form";
import EzButton from "@/ezMantine/button/EzButton.jsx";

export default function CrmLogin() {
    const {loadingBtn, handleSubmitLogin} = CrmController
    const form = useForm({
        initialValues: {
            email: '', password: ''
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
        },
    });

    return (
        <Center mih='100vh' bg='#fffffff2'>
            <Paper
                shadow="md"
                rounded='md'
                p='1rem'
                component='form'
                onSubmit={form.onSubmit(handleSubmitLogin)}
            >
                <TextInput
                    placeholder="Email"
                    size="md"
                    required
                    value={form.values.email}
                    onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                    error={form.errors.email}
                />
                <PasswordInput
                    placeholder="Password"
                    mt="md"
                    size="md"
                    required
                    value={form.values.password}
                    onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                />
                <EzButton
                    fullWidth
                    mt="md" size="md" type='submit' color='var(--mantine-color-primary-0)'
                    loading={loadingBtn}
                >
                    Login
                </EzButton>
            </Paper>
        </Center>
    );
}