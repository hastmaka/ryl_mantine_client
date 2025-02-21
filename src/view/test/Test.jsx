import {Outlet} from "react-router-dom";
import {Center} from "@mantine/core";

export default function Test() {
    return (
        <Center h='100dvh'>
            <Outlet/>
        </Center>
    )
}
