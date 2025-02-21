import {Flex, Pill, PillGroup, Skeleton, Stack} from '@mantine/core'
import EzText from "@/ezMantine/text/EzText.jsx";
import classes from "@/view/blog/Blog.module.scss";
import {BlogController} from "@/view/blog/BlogController.js";
import {useLayoutEffect} from "react";

export default function BlogTag() {
    const {
        tagGetData,
        tagData,
        tagLoading,
        searchByTag,
        tag,
        articleGetData
    } = BlogController;

    useLayoutEffect(() => {tagGetData()}, [])

    return (
        <Stack>
            <Flex align='center' gap={16}>
                <EzText size='md'>{`Tags${tag.searchingByTag ? ':' : ''}`}</EzText>
                {tag.searchingByTag &&
                    <Pill
                        size='md'
                        withRemoveButton
                        bg='var(--color-2)'
                        c='white'
                        onRemove={() => articleGetData(true)}
                    >{tag.searchingByTag}</Pill>
                }
            </Flex>
            {tagLoading
                ? <Skeleton h={150}/>
                : (
                    <PillGroup>
                        {tagData.map((item, index) =>
                            <Pill
                                key={index}
                                className={classes.pill}
                                size='md'
                                onClick={() => searchByTag(item)}
                            >{item}</Pill>
                        )}
                    </PillGroup>
                )
            }
        </Stack>
    );
}