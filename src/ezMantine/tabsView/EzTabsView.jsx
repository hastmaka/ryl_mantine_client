import PropTypes from "prop-types";
import classes from './EzTabsView.module.scss'
import {Flex, rem, ScrollArea, Tabs} from "@mantine/core";
import {IconSettings} from "@tabler/icons-react";
import {createElement, Suspense} from "react";
import EzLoader from "@/ezMantine/loader/EzLoader.jsx";

const iconStyle = {width: rem(12), height: rem(12)};

/**
 *
 * @param clientId
 * @param activeTab
 * @param setActiveTab
 * @param TABS
 * @param TABSPANEL
 * @returns {JSX.Element} - view to use in the tabs, ClientView, StaffView, etc...
 * @constructor
 */

export default function EzTabsView({
    clientId,
    activeTab,
    setActiveTab,
    TABS,
    TABSPANEL
}) {
    return (
        <Flex flex={1}>
            <Tabs
                flex={1}
                orientation="vertical"
                value={clientId ? activeTab[clientId] : activeTab}
                variant="pills"
                color="var(--mantine-color-gray-8)"
                onChange={(value) => {
                    if (clientId) {
                        setActiveTab(clientId, value)
                    } else {
                        setActiveTab(value)
                    }
                }}
                classNames={{
                    root: classes['tab-root'],
                    tab: classes['tab'],
                }}
            >
                <Tabs.List miw={190}>
                    {TABS.map((tab, index) => {
                        return (
                            <Tabs.Tab
                                value={tab.view}
                                key={index}
                                leftSection={<IconSettings style={iconStyle}/>}
                            >
                                {tab.text}
                            </Tabs.Tab>
                        )
                    })}
                </Tabs.List>

                <Tabs.Panel value={clientId ? activeTab[clientId] : activeTab} style={{display: 'flex'}}>
                    <div className={classes['container']}>
                        <Suspense fallback={<EzLoader h='100%' centerProps={{flex: 1}}/>}>
                            <ScrollArea
                                p='0 4px 0 1rem'
                                offsetScrollbars
                                scrollbars='y'
                                h='100%'
                                classNames={{
                                    root: classes['scroll-area'],
                                    viewport: classes.viewport,
                                }}
                            >
                                {createElement(TABSPANEL[clientId ? activeTab[clientId] : activeTab])}
                            </ScrollArea>
                        </Suspense>
                    </div>
                </Tabs.Panel>
            </Tabs>
        </Flex>

    )
}

EzTabsView.propTypes = {
    clientId: PropTypes.string,
    activeTab: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    setActiveTab: PropTypes.func.isRequired,
    TABS: PropTypes.array.isRequired,
    TABSPANEL: PropTypes.object.isRequired
}
