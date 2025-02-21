import {deepSignal} from "deepsignal/react";
import {getFormatMoney, getSendEmail} from "../util/index.js";

export const serviceModalSignal = deepSignal({
    total: 0,
    checkedService: {},
    isSending: false,
    messageSent: false,

    resetServices() {
        serviceModalSignal.checkedService = {}
        serviceModalSignal.total = 0
        serviceModalSignal.isSending = false
        serviceModalSignal.messageSent = false
    },

    removeService(name) {
        let checkedService = serviceModalSignal.checkedService

        if (checkedService[name]) {
            delete checkedService[name]
            serviceModalSignal.updateTotal()
        }

        serviceModalSignal.checkedService = checkedService
    },

    handleServicePackage(servicePackage) {
        let checkedService = serviceModalSignal.checkedService;

        //update service
        checkedService[servicePackage.serviceName] = servicePackage
        serviceModalSignal.checkedService = checkedService

        //update total
        serviceModalSignal.updateTotal()
    },

    handleServiceByPagesModulesHours(service) {
        let checkedService = serviceModalSignal.checkedService;

        //update service
        checkedService[service.serviceName] = {
            ...service,
            price: service.price * +service.label
        }
        serviceModalSignal.checkedService = checkedService

        //update total
        serviceModalSignal.updateTotal()
    },

    updateTotal() {
        //filter out empty object
        let objMap = Object.values(serviceModalSignal.checkedService)
            .filter(obj => Object.keys(obj).length > 0);
        serviceModalSignal.total = objMap.reduce((total, current) => total + current.price, 0) || 0
    },

    async sendServiceRequest(email) {
        serviceModalSignal.isSending = true
        //filter out empty object
        let objMap = Object.values(serviceModalSignal.checkedService)
                .filter(obj => Object.keys(obj).length > 0),
                sendEmail = await getSendEmail(),
                formatMoney = await getFormatMoney();
        objMap.push({total: formatMoney(serviceModalSignal.total)})
        await sendEmail(objMap, email, 'RYL Service Request', () => {
            serviceModalSignal.isSending = false
            serviceModalSignal.messageSent = true
        })

        // setTimeout(() => {
        //     serviceModalSignal.isSending = false
        //     serviceModalSignal.messageSent = true
        // }, 1000)
    }
})