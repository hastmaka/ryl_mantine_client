import Navbar from "./navbar/Navbar.jsx";
import {Outlet} from "react-router-dom";
import {Flex} from "@mantine/core";
import Footer from "./footer/Footer.jsx";
import FloatAction from "./floatAction/FloatAction.jsx";

export default function Layout() {
    return (
        <Flex direction="column" pos="relative" /*style={{overflowY: 'hidden'}}*/>
            <FloatAction/>
            <Navbar />
            <Flex direction="column" id='main' component='main'>
                <Outlet/>
            </Flex>
            <Footer/>
        </Flex>
    )
}