import {Button, Flex, Pill, Stack, TextInput} from '@mantine/core'
import {useLayoutEffect} from "react";
import EzLoader from "@/ezMantine/loader/EzLoader.jsx";
import {TagsController} from "@/view/crm/tags/TagsController.js";
import GenericModal from "@/component/modal/GenericModal.jsx";
import EzText from "@/ezMantine/text/EzText.jsx";

export default function Tags() {
    const {
        tagData,
        activeTagData,
        tagLoading,
        tagGetData,
        handleInput,
        formData,
        handleAddTag,
        handleDeleteTag
    } = TagsController
    useLayoutEffect(() => {
        tagGetData().then()
    }, [])

    if (tagLoading) return <EzLoader h='calc(100vh-120px)' centerProps={{flex: 1}}/>

    async function handleRemoveTag(tagToRemove) {
        openModal({
            modalId: 'delete-tag',
            title: `Deleting tag`,
            size: 'sm',
            children: (
                <GenericModal
                    text='Are you sure you want to delete this tag?'
                    cancel={() => closeModal('delete-tag')}
                    accept={async () => {
                        await toast.U({
                            modalId: 'delete-tag',
                            id: {
                                title: `Deleting tag`,
                                message: `Deleting tag ...`,
                            },
                            update: {
                                success: `Tag was deleted successfully`,
                            },
                            cb: () => {
                                handleDeleteTag(tagToRemove)
                                closeModal('delete-tag')
                            }
                        })
                    }}
                />
            ),
            onClose: () => {
            }
        })
    }

    return (
        <Stack>
            <Stack>
                <Flex gap='1rem'>
                    <TextInput
                        w={500}
                        placeholder="Add tag"
                        value={formData.tag || ''}
                        onChange={(event) => handleInput('tag', null, event.target.value)}
                    />
                    <Button
                        radius='sm'
                        color='var(--color-2)'
                        onClick={async () => {
                            await toast.U({
                                modalId: 'create-tag',
                                id: {
                                    title: `Creating tag`,
                                    message: `Creating tag ...`,
                                },
                                update: {
                                    success: `Tag was created successfully`,
                                    error: `Tag could not be created`,
                                },
                                cb: handleAddTag
                            })
                        }}
                    >
                        Add
                    </Button>
                </Flex>

                <Pill.Group>
                    {tagData.map((tag, index) =>
                        <Pill
                            key={index}
                            withRemoveButton
                            bg='white'
                            size='md'
                            onRemove={() => handleRemoveTag(tag)}
                        >
                            {tag}
                        </Pill>
                    )}
                </Pill.Group>
            </Stack>

            <Stack>
                <EzText>Active Tags</EzText>
                <Pill.Group>
                    {activeTagData.map((tag, index) =>
                        <Pill
                            key={index}
                            bg='white'
                            size='md'
                            disabled
                        >
                            {tag}
                        </Pill>
                    )}
                </Pill.Group>
            </Stack>

        </Stack>

    );
}

Tags.propTypes = {}

