import '@mantine/core/styles.css';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import './index.scss'
import {BrowserRouter} from "react-router-dom";
import Theme from "@/theme/Theme.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Theme>
            <App/>
        </Theme>
    </BrowserRouter>
)
