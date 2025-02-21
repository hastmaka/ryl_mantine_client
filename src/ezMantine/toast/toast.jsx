import {notifications} from "@mantine/notifications";
import {IconCheck, IconX} from "@tabler/icons-react";
import {rem} from "@mantine/core";

const checkPropsObj = (props) => {
    if (!props || typeof props !== 'object') throw new Error('No props was provided or it was not an object');
}

const checkPropsString = (props) => {
    if (!props || typeof props !== 'string') throw new Error('No props was provided or it was not a string');
}

export default function toast(props) {
    checkPropsObj(props);
    notifications.show({
        title: 'No title was provided',
        autoClose: 4000,
        ...props
    })
}

toast.W = function(props) {
    checkPropsString(props);
    toast({color: 'yellow',title: 'Warning',message: props})
}

toast.S = function(props) {
    checkPropsString(props);
    toast({color: 'teal',title: 'Success',message: props})
}

toast.E = function(props) {
    checkPropsString(props);
    toast({color: 'red',title: 'Error',message: props})
}

/**
 * @param {id} object
 * @param {update} object
 * @param {cb} function
 * to close the modal after operation use closeModal(modalId)
 * @returns {Promise<void>}
 * @example
 *
 * toast.U({
 *     id: {
 *         id: 'test',
 *         title: 'Test',
 *         message: 'This is a test',
 *         autoClose: 5000
 *     },
 *     update: {
 *         success: {
 *             title: 'Success',
 *             message: 'Data was loaded successfully',
 *             color: 'teal',
 *         },
 *         error: {
 *             title: 'Error',
 *             message: 'Data was not loaded successfully',
 *             color: 'red',
 *         },
 *     },
 *     cb: async () => {
 *         return new Promise((resolve, reject) => {
 *             setTimeout(() => {
 *                 resolve(true);
 *                 // reject(new Error('Error'))
 *             }, 2000);
 *         });
 *     }
 * })
 */

toast.U = async function ({id, update, cb, modalId}) {
    if (!modalId || typeof modalId !== 'string') console.warn('No modalId was provided or it was not a string');
    if (!id || typeof id !== 'object') throw new Error('No id was provided or it was not an object');
    if (!cb || typeof cb !== 'function') throw new Error('No callback function was provided or it was not a function');
    // Show the initial loading notification
    const _id = notifications.show({
        loading: true,
        color: 'var(--mantine-color-text)',
        title: 'id.title no provided',
        message: 'id.message not provided',
        autoClose: false,
        withCloseButton: false,
        ...id
    });

    try {
        if (modalId) modalIsLoading(modalId)
        // Wait for the callback function to complete
        await cb()
        if (modalId) modalIsDone(modalId)
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        // Update the notification to show success
        notifications.update({
            id: _id,
            color: 'teal',
            title: 'Success',
            message: update?.success || 'No success message was provided in toast',
            icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
            loading: false,
            autoClose: 3000
        });
    } catch (error) {
        if (modalId) modalIsDone(modalId)
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        // Update the notification to show failure
        notifications.update({
            id: _id,
            color: 'red',
            title: 'Error',
            message: update?.error || 'No error message was provided in toast',
            icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
            loading: false,
            autoClose: 3000,
        });
    }
}