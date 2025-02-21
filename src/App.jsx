import Routes from "./routes/index.jsx";
import {useCheckScreen, useScrollToTop} from "./util/hook/index.js";
import {useEffect} from "react";
import {generalSignal} from "./signal/generalSignal.js";
import {useNavigate} from "react-router-dom";

export default function App() {
    const screenSize = useCheckScreen();
    const navigate = useNavigate();
    useEffect(() => {
        generalSignal.setScreen(screenSize)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenSize]);

    useEffect(() => {
        window.navigate = navigate
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useScrollToTop()

    return (
        <>
            <Routes/>
        </>
    )
}

App.proptypes = {}
