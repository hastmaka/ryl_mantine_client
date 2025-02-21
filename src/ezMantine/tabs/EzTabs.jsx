import PropTypes from "prop-types";
import classes from './EzTabs.module.scss'
import {ActionIcon, Center, Drawer, Tabs, Tooltip} from "@mantine/core";
import {IconX} from "@tabler/icons-react";
import EzGroupBtn from "@/ezMantine/buttonGroup/EzGroupBtn.jsx";
import EzButton from "@/ezMantine/button/EzButton.jsx";
import {Suspense, useLayoutEffect} from "react";
import EzLoader from "@/ezMantine/loader/EzLoader.jsx";

/**
 *
 * @param signal - the signal object
 * @param Grid - the grid component
 * @param View - the view component
 * @param actionBtns - the action buttons
 * @ wasReloaded - check if the page was reloaded, to restore the active tab
 * @ activeParentTab - the active tab
 * @ parentTabsList - the list of parent tabs
 * @ tempParentTabsList - the list of temporary parent tabs, like client for example
 * @ closeTab - close the tab
 * @ setParentTabsList - set the parent tabs list
 * @ drawer - the drawer state
 * @ openDrawer - open the drawer
 * @ closeDrawer - close the drawer
 * @returns {JSX.Element}
 * @constructor
 */

export default function EzTabs({signal, Grid, View, actionBtns}) {
    const {
        wasReloaded,
        activeParentTab,
        parentTabsList,
        tempParentTabsList,
        closeTab,
        setParentTabsList,
        drawer,
        closeDrawer,
    } = signal

    useLayoutEffect(() => {
        if (wasReloaded) setParentTabsList(activeParentTab).then()
    }, [wasReloaded]);

    if (wasReloaded && activeParentTab !== 'grid') return <Center h='100%'><EzLoader/></Center>

    return (
        <>
            <div
                style={{
                    padding: '1rem 0 1rem 1rem',
                    display: 'flex',
                    overflow: 'hidden'
                }}
            >
                <Tabs
                    variant="outline"
                    value={activeParentTab}
                    classNames={{
                        root: classes['tabs-root'],
                        tabs: classes['tabs-tabs'],
                        list: classes['tabs-list'],
                    }}
                >
                    <Tabs.List>
                        {[...parentTabsList, ...tempParentTabsList].map(({label, value}, index) =>
                            <Tabs.Tab
                                value={value}
                                key={index}
                                onClick={() => setParentTabsList(value)}
                                className={classes['tabs-tab']}
                            >
                                {value !== 'grid' &&
                                    <Tooltip label='Close'>
                                        <ActionIcon
                                            variant="default"
                                            size="xs"
                                            radius="xl"
                                            aria-label="Settings"
                                            component='span'
                                            autoContrast
                                            className={classes.close}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                closeTab(value)
                                            }}
                                        >
                                            <IconX style={{width: '70%', height: '70%'}} stroke={1.5}/>
                                        </ActionIcon>
                                    </Tooltip>
                                }
                                {label}
                            </Tabs.Tab>
                        )}
                    </Tabs.List>

                    {actionBtns && actionBtns.length > 0 &&
                        <EzGroupBtn
                            className={classes['action-btns']}
                            style={{'--actions-btns-right': activeParentTab === 'grid' ? '1rem' : '1rem'}}
                        >
                            {actionBtns.map(({tootTip, icon}, index) =>
                                <EzButton size='xs' key={index}>
                                    <Tooltip color='dark.6' label={tootTip}>
                                        {icon}
                                    </Tooltip>
                                </EzButton>
                            )}
                        </EzGroupBtn>
                    }

                    <Tabs.Panel
                        value={activeParentTab}
                        className={classes['tabs-panel']}
                    >
                        <div
                            className={classes['container']}
                            style={{
                                '--grid-container-padding': activeParentTab === 'grid' ? '1rem' : '0',
                            }}
                        >
                            <Suspense fallback={<Center flex={1} h='100%'><EzLoader/></Center>}>
                                {activeParentTab === 'grid'
                                    ? <Grid/>
                                    : <View/>
                                }
                            </Suspense>
                        </div>
                    </Tabs.Panel>
                </Tabs>
            </div>

            <Drawer
                opened={drawer.open}
                onClose={closeDrawer}
                title="Notes"
                offset={8}
                radius="md"
                position='right'
                size='lg'
            >
                <span>notes</span>
            </Drawer>
        </>
    )
}

EzTabs.propTypes = {
    signal: PropTypes.object.isRequired,
    Grid: PropTypes.elementType.isRequired,
    View: PropTypes.elementType.isRequired,
    actionBtns: PropTypes.array
}
