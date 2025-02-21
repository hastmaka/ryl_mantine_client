import PropTypes from 'prop-types'
import {ActionIcon, Flex, MultiSelect, Paper, Textarea, Tooltip, Image} from '@mantine/core'
import Description from "@/view/crm/article/_modal/Description.jsx";
import EzText from "@/ezMantine/text/EzText.jsx";
import {ArticleModalController} from "./ArticleModalController.js";
import {useLayoutEffect} from "react";
import {IconPictureInPicture} from "@tabler/icons-react";

export default function CardEl({item, id}) {
    const {handleInput, formData, tagGetData, tagData, tagLoading} = ArticleModalController
    const {name, label} = item

    useLayoutEffect(() => {tagGetData().then()}, [])

    if (tagLoading) return null

    const render = (name) => {
        switch (name) {
            case 'article_url':
                return (
                    <Flex gap='1rem' flex={1} align='center'>
                        <Textarea
                            flex={1}
                            multiline
                            autosize
                            minRows={1}
                            value={formData[name]}
                            onChange={(e) => handleInput(name, e.target.value)}
                        />
                        <Tooltip label={'Picture in picture'} position='left'>
                            <ActionIcon
                                color='var(--color-2)'
                                onClick={() => {
                                    if (!formData[name]) return;
                                    openModal({
                                        modalId: 'picture-in-picture',
                                        title: 'Preview',
                                        size: 'xl',
                                        children: <Image src={formData[name]}/>,
                                        onClose: () => closeModal('picture-in-picture')
                                    });
                                }}
                            >
                                <IconPictureInPicture/>
                            </ActionIcon>
                        </Tooltip>
                    </Flex>
                );
            case 'article_tags':
                return (
                    <MultiSelect
                        flex={1}
                        data={tagData}
                        value={formData[name]}
                        onChange={(v) => handleInput(name, v)}
                    />
                );
            default:
                return (
                    <Textarea
                        flex={1}
                        multiline
                        autosize
                        minRows={1}
                        value={formData[name]}
                        onChange={(e) => handleInput(name, e.target.value)}
                    />
                );
        }
    };

    return (
        <Paper
            display='flex'
            p='sm'
            radius='md'
            withBorder
            style={{
                alignItems: 'center',
            }}
            {...(name !== 'article_description' && {
                bg: '#00000005'
            })}
        >
            {name === 'article_description'
                ? <Description item={item} id={id}/>
                : (
                    <>
                        <EzText miw={100}>{label}</EzText>
                        {render(name)}
                    </>
                )
            }

        </Paper>
    )
}

CardEl.propTypes = {
    item: PropTypes.object.isRequired,
    id: PropTypes.string
}