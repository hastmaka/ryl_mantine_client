import PropTypes from "prop-types";
import {getFromSessionStore} from "@/util/updateSessionStorage.js";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import EzLoader from "@/ezMantine/loader/EzLoader.jsx";

export default function CheckSession({children}) {
    const navigate = useNavigate();
    const [validSession, setValidSession] = useState(false);
    useEffect(() => {
        const isValid = getFromSessionStore('l')
        if (isValid) {
            setValidSession(true);
        } else {
            navigate('/crm-login');
        }
    }, [navigate]);

    if (!validSession) return <EzLoader h='100vh'/>;

    return children
}

CheckSession.propTypes = {
    children: PropTypes.node.isRequired,
}