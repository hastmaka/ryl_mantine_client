import { AppShell, Burger } from '@mantine/core';
import {useDisclosure} from "@mantine/hooks";
import {Outlet} from "react-router-dom";
import CrmNavBar from "./CrmNavBar.jsx";
import {useLayoutEffect} from "react";
import {CrmController} from "@/view/crm/CrmController.js";
import EzLoader from "@/ezMantine/loader/EzLoader.jsx";
import ToolBar from "@/view/crm/ToolBar.jsx";

export default function CrmMain() {
    const [opened, { toggle }] = useDisclosure();
    const {setStores, loadingStores} = CrmController

    useLayoutEffect(() => {setStores().then()},[]);

    if (loadingStores) return <EzLoader h='100vh'/>

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 200,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />
                <ToolBar/>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <CrmNavBar/>
            </AppShell.Navbar>

            <AppShell.Main bg='#fffffff2' display="flex">
                <Outlet/>
            </AppShell.Main>
        </AppShell>
    );
}