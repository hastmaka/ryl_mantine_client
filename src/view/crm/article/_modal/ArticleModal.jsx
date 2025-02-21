import PropTypes from 'prop-types'
import {Stack, ScrollArea, Group, Switch, Flex, Button} from '@mantine/core'
import {ArticleModalController} from "@/view/crm/article/_modal/ArticleModalController.js";
import {useLayoutEffect} from "react";
import EzLoader from "@/ezMantine/loader/EzLoader.jsx";
import CardEl from "@/view/crm/article/_modal/CardEl.jsx";
import SectionBtn from "@/view/crm/article/_modal/SectionBtn.jsx";

const staticFields = [
    {name: 'article_title', label: 'Title'},
    {name: 'article_author', label: 'Author'},
    {name: 'article_tags', label: 'Tags'},
    {name: 'article_summary', label: 'Summary'},
    {name: 'article_url', label: 'Picture Url'},
    {name: 'article_description', label: 'Description'},
]


export default function ArticleModal({id}) {
    const {
        modal,
        modalData,
        record,
        handleArticleStatus,
        handleInput,
        formData,
        handleCreateArticle,
        selectData,
        updateSelectData,
        handlers
    } = ArticleModalController

    useLayoutEffect(() => {
        modalData('article', id).then()
        return () => ArticleModalController.resetState()
    }, [id])

    const handleSave = async () => {
        await toast.U({
            modalId: 'manage-article',
            id: {
                title: `${id ? 'Editing' : 'Creating'} article`,
                message: `${id ? 'Editing' : 'Creating'} article ...`,
            },
            update: {
                success: `Article was ${id ? 'edited' : 'created'} successfully`,
                error: `Article could not be ${id ? 'edited' : 'created'}`,
            },
            cb: () => handleCreateArticle(id)
        })
        closeModal('manage-article')
    }

    if (modal.loading) return <EzLoader h='calc(100vh - 5.75rem)' centerProps={{flex: 1}}/>

    return (
        <Stack flex={1} gap={0}>
            <Flex
                justify='space-between'
                align='center'
                mb='1rem'
                style={{
                    position: 'sticky',
                    top: '0',
                }}
            >
                <Group>
                    <Switch
                        size="xl"
                        miw={82}
                        onLabel="Active"
                        offLabel="Inactive"
                        color='var(--color-2)'
                        checked={id ? record.article_status : formData['article_status']}
                        onClick={async () => {
                            if (id) {
                                await toast.U({
                                    modalId: 'manage-article',
                                    id: {
                                        title: 'Changing status',
                                        message: 'Changing article status',
                                    },
                                    update: {
                                        success: 'Article status updated',
                                        failure: 'Article status could not be Updated'
                                    },
                                    cb: () => handleArticleStatus(id)
                                })
                            } else {
                                handleInput('article_status', !formData?.['article_status'])
                            }
                        }}
                    />
                    <SectionBtn
                        data={selectData}
                        setFields={(item) => {
                            if (item.name === 'header') {
                                updateSelectData(selectData.filter((i) => i.name !== item.name))
                            }
                            handlers.append(item)
                        }}
                    />
                </Group>
                <Button
                    size='sm'
                    bg='var(--color-2)'
                    onClick={handleSave}
                >
                    {id ? 'Edit' : 'Save'}
                </Button>
            </Flex>
            <ScrollArea h='calc(100vh - 5.75rem)' flex={1} offsetScrollbars>

                {!modal.loading && <Stack flex={1}>
                    {staticFields.map((item, index) => (
                        <CardEl
                            item={item}
                            key={index}
                            id={id}
                        />
                    ))}
                </Stack>}
            </ScrollArea>
        </Stack>
    );
}


ArticleModal.propTypes = {
    id: PropTypes.string
}