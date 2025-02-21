import PropTypes from "prop-types";
import {lazy, Suspense} from "react";
import {Button, Group, Pill} from "@mantine/core";
import {IconCirclePlus} from "@tabler/icons-react";
import EzSearchInput from "@/ezMantine/searchInput/EzSearchInput.jsx";
import EzLoader from "@/ezMantine/loader/EzLoader.jsx";
import ToolBar from "@/ezMantine/mantineDataGrid/toolbar/ToolBar.jsx";
import {ArticleModalController} from "./_modal/ArticleModalController.js";
//dynamic import
const ArticleModal = lazy(() => import("./_modal/ArticleModal.jsx"));

export default function ArticleGridToolBar({state}) {
    const {resetState, addRawData} = ArticleModalController

    const handleAddClientM = () => openModal({
        modalId: 'manage-article',
        title: 'Add Article',
        fullScreen: true,
        children: (
            <Suspense fallback={<EzLoader h={500}/>}>
                <ArticleModal/>
            </Suspense>
        ),
        onClose: resetState
    })

    return (
        <ToolBar>
            <Group>
                <EzSearchInput state={state}/>

                <Pill size="lg" style={{border: '0.0625rem solid #00000010'}}>Total: {state.data.total}</Pill>
                <Pill size="lg" style={{border: '0.0625rem solid #00000010'}}>Showing: {state.data.list.length}</Pill>
            </Group>

            <Group>
                <Button
                    onClick={addRawData}
                    size='md'
                    radius='md'
                    leftSection={<IconCirclePlus/>}
                    color='var(--color-2)'
                >
                    Add Raw Data
                </Button>

                <Button
                    onClick={handleAddClientM}
                    size='md'
                    radius='md'
                    leftSection={<IconCirclePlus/>}
                    color='var(--color-2)'
                >
                    Add New Article
                </Button>
            </Group>
        </ToolBar>
    )
}

ArticleGridToolBar.propTypes = {
    state: PropTypes.object.isRequired
}
