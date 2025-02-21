import {SignalController} from "@/signal/SignalController.js";
import {FetchApi} from "@/api/FetchApi.js";
import {updateSessionStore} from "@/util/updateSessionStorage.js";
import {loginUser} from "@/api/firebase/FirebaseAuth.js";

export const CrmController = new SignalController({
    mode: 'create',
    loadingStores: true,
    stores: {},
    loadingBtn: false
}, {
    setStores: async () => {
        let stores = await FetchApi('stores', 'GET');
        CrmController.stores = stores.data
        CrmController.loadingStores = false
    },
    getStore: (store) => {
        return CrmController.stores[store];
    },

    handleSubmitLogin: async (form) => {
        const response = await loginUser(form.email, form.password)

        if (response.error) {
            const errorMap = {
                400: 'Invalid Credential. Please check email and password',
                401: 'Too many request, try again later',
                412: 'Firebase Unknown Error'
            }
            toast.E(errorMap[response.error]);
        } else {
            updateSessionStore('l', 'true')
            navigate('/crm/dashboard')
        }
    },
    handleLogout: () => {
        window.sessionStorage.clear()
        window.location.reload()
    }
}).signal