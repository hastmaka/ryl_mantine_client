import {Center, Skeleton} from '@mantine/core'
import {createArray} from "@/util/createArray.js";
import BlogCard from "@/view/blog/BlogCard.jsx";
import EzGrid from "@/ezMantine/gridLayout/EzGrid.jsx";
import {BlogController} from "@/view/blog/BlogController.js";
import {useLayoutEffect} from "react";
import EzText from "@/ezMantine/text/EzText.jsx";

export default function BlogGrid() {
    const {
        articleLoading,
        articleGetData,
        pagination,
        articleData,
        searchedValue
    } = BlogController

    useLayoutEffect(() => {articleGetData()}, [])

    if (searchedValue && articleData.length <= 0) {
        return (
            <Center mih='40vh'>
                <EzText size='2rem' c='#00000050'>No Results was found</EzText>
            </Center>
        )
    }

    if (!articleData) return <Center>Server is under Maintenance</Center>

    return (
        <EzGrid gridTemplateColumns='repeat(auto-fit, minmax(300px, 1fr))'>
            {articleLoading
                ? createArray(pagination.limit).map((index) => <Skeleton key={index} h={420}/>)
                : articleData.map((item, index) => <BlogCard item={{...item}} key={index}/>)
            }
        </EzGrid>
    );
}