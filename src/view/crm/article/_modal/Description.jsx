import PropTypes from 'prop-types'
import {Button, Center, Flex, Group, Paper, Stack, Text, Textarea, TextInput} from '@mantine/core'
import EzText from "@/ezMantine/text/EzText.jsx";
import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd";
import {IconGripVertical, IconPlus, IconX} from "@tabler/icons-react";
import {ArticleModalController} from "./ArticleModalController.js";
import {useListState} from "@mantine/hooks";
import {useEffect, useLayoutEffect, useState} from "react";

export default function Description({item, id}) {
    const {
        handleInputLink,
        handleInput,
        formData,
        updatePosition,
        selectData,
        updateSelectData,
        setHandlers
    } = ArticleModalController
    const [state, handlers] = useListState([]);
    const [links, setLinks] = useState(formData?.article_description?.find(i => i.name === 'link')?.value || []);

    useEffect(() => {
        if (id) {
            const isHeader = formData?.article_description?.findIndex(i => i.name === 'header');
            if (isHeader !== -1) updateSelectData(selectData.filter((i) => i.name !== 'header'))
            handlers.setState(formData.article_description)
        }
    }, [id]);

    useEffect(() => {
        updatePosition(state)
    }, [state])

    useLayoutEffect(() => {
        setHandlers(handlers)
    }, [])

    const items = state.map((item, index) => {
        let positionIndex = index,
            {name, label, value} = item

        return (
            <Draggable key={index} index={index} draggableId={index.toString()}>
                {(provided, snapshot) => (
                    <Paper
                        display='flex'
                        p='sm'
                        justify='center'
                        radius='md'
                        withBorder
                        mb='sm'
                        bg='#00000005'
                        ref={provided.innerRef}
                        {...(snapshot.isDragging && {
                            shadow: 'sm'
                        })}
                        {...provided.draggableProps}
                    >
                        <Center {...provided.dragHandleProps} mr='1rem'>
                            <IconGripVertical size={18} stroke={1.5}/>
                        </Center>
                        <Group flex={1}>
                            <EzText miw={100}>{label || ''}</EzText>
                            {name === 'link' ? (
                                <Stack flex={1}>
                                    <Group>
                                        <Button
                                            leftSection={<IconPlus/>}
                                            bg='var(--color-2)'
                                            onClick={() => {
                                                setLinks(prev => {
                                                    return [...prev, {
                                                        name: 'link',
                                                        label: 'link',
                                                        value: {href: '', label: ''}
                                                    }];
                                                });
                                            }}
                                        >
                                            Add href and label
                                        </Button>
                                    </Group>
                                    {links.map((item, index) => {
                                        let {value} = item
                                        // debugger
                                        return (
                                            <Group key={index} flex={1}>
                                                {['href', 'label'].map((name) =>
                                                    <Group align='center' flex={1} key={name}>
                                                        <Text>{name}</Text>
                                                        <TextInput
                                                            name={name}
                                                            placeholder={name}
                                                            flex={1}
                                                            value={value[name] || ''}
                                                            onChange={(e) => {
                                                                let tempData = [...links];
                                                                tempData[index] = {
                                                                    ...tempData[index],
                                                                    value: {
                                                                        ...tempData[index].value,
                                                                        [name]: e.target.value
                                                                    }
                                                                }
                                                                //update local
                                                                setLinks(tempData)
                                                                handleInputLink(tempData, positionIndex)
                                                            }}
                                                        />
                                                    </Group>
                                                )}
                                                <IconX
                                                    onClick={() => {
                                                        let indexToRemove = index
                                                        const updatedLinks = links.filter((_, index) => indexToRemove !== index)
                                                        handleInputLink(updatedLinks, positionIndex)
                                                        setLinks(updatedLinks);
                                                    }}
                                                />
                                            </Group>
                                        )
                                    })}
                                </Stack>
                            ) : name === 'quote'
                                ? (
                                    <Flex flex={1} gap='1rem'>
                                        {['text', 'cite'].map((name) => {
                                            return (
                                                <Group align='center' flex={name === 'text' ? 2.5 : 1} key={name}>
                                                    <Text>{name}</Text>
                                                    <TextInput
                                                        name={name}
                                                        placeholder={name}
                                                        flex={1}
                                                        value={value?.[name === 'text' ? 0 : 1] || ''}
                                                        onChange={(e) => {
                                                            let tempData = [...state],
                                                                indexToUpdate = name === 'text' ? 0 : 1;
                                                            if (!tempData[index].value) tempData[index].value = []
                                                            tempData[index].value[indexToUpdate] = e.target.value
                                                            //update local
                                                            handlers.setState(tempData);
                                                            handleInput('article_description', tempData, 'article_description')
                                                        }}
                                                    />
                                                </Group>
                                            )
                                        })}
                                    </Flex>
                                ) : (
                                    <Textarea
                                        flex={1}
                                        multiline
                                        autosize
                                        minRows={1}
                                        value={value || ''}
                                        onChange={(e) => {
                                            let tempData = [...state];
                                            tempData[index] = {
                                                ...tempData[index],
                                                value: e.target.value,
                                            }
                                            //update local
                                            handlers.setState(tempData);
                                            //send updated array to controller
                                            handleInput('article_description', tempData, 'article_description')
                                        }}
                                    />
                                )}
                            <IconX
                                color='#00000080'
                                onClick={() => {
                                    if (item.name === 'header') {
                                        updateSelectData(selectData.unshift({name: 'header', label: 'Header'}))
                                    }
                                    const updatedData = state.filter((_, i) => index !== i)
                                    handleInput('article_description', updatedData, 'article_description')
                                    handlers.remove(index)
                                }}
                            />
                        </Group>
                    </Paper>
                )}
            </Draggable>
        )
    });

    return (
        <Stack gap={0} flex={1}>
            <Group align='center' mb='sm'>
                <EzText>{item.label}</EzText>
            </Group>

            <DragDropContext
                onDragEnd={({destination, source}) => {
                    handlers.reorder({from: source.index, to: destination?.index || 0})
                }}
            >
                <Droppable droppableId="dnd-list" direction="vertical">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {items}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </Stack>

    )
}

Description.propTypes = {
    item: PropTypes.object.isRequired,
    id: PropTypes.string
}