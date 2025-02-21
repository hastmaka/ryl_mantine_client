import {getCapitalize} from "../util/index.js";
import emailjs from "@emailjs/browser";
import PropTypes from "prop-types";

let YOUR_SERVICE_ID = import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID,
    YOUR_PUBLIC_KEY = import.meta.env.VITE_REACT_APP_EMAILJS_PUBLIC_KEY,
    HTML_TEMPLATE = import.meta.env.VITE_REACT_APP_EMAILJS_HTML_TEMPLATE;

export const sendEmail = async (data, email, from, cb) => {
    const capitalize = await getCapitalize()

    const renderBody = () => {
        const renderFromObj = (obj, isFirstOfGroup=false) => {
            return Object.entries(obj)
                .filter(([, value]) => value !== '')
                .map(([key, value], index) => {
                    const isFirstItem = index === 0 && isFirstOfGroup;
                    return `
                        <tr style="text-align: left;padding-top: 1rem; ${isFirstItem ? 'border-top: 1px solid #00000060;' : ''}">
                            <td style="padding: .5rem 1rem">
                                <span style="font-weight: bold;color: #00000090">${capitalize(key)}:</span>
                            </td>
                            <td style="padding: .5rem 1rem">
                                <span style="font-weight: bold;color: #00000090">${value}</span>
                            </td>
                        </tr>
                `}).join('')
        }

        if (Array.isArray(data)) {
            return data.map((item, index) => {
                const isFirstOfGroup = index > 0;
                return renderFromObj(item, isFirstOfGroup)
            }).join('')
        } else {
            return renderFromObj(data)
        }
    }

    const htmlEmail = {
        header: email,
        from,
        myHtml: `
            <table style="background-color: white;padding: 1rem;text-align: left">
                <tbody>
                    ${renderBody()}                    
                </tbody>
            </table>
            `
    }

    emailjs.send(YOUR_SERVICE_ID, HTML_TEMPLATE, htmlEmail, YOUR_PUBLIC_KEY)
        .then((result) => {
            cb()
            console.log(result.text);
        }, (error) => {
            window.navigate('/error')
            console.log(error.text);
        });
}

sendEmail.propTypes = {
    data: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    cb: PropTypes.func.isRequired
}