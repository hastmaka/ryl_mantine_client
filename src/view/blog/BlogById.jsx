import {useLocation} from "react-router-dom";
import SContainer from "@/component/SContainer.jsx";
import BlogTitle from "@/view/blog/BlogTitle.jsx";
import TextGenerator from "@/component/TextGenerator.jsx";
import {BlogController} from "@/view/blog/BlogController.js";
import {useLayoutEffect} from "react";
import EzLoader from "@/ezMantine/loader/EzLoader.jsx";
import {ActionIcon, Flex, Paper, Stack} from "@mantine/core";
import {IconThumbUpFilled} from "@tabler/icons-react";
import BlogVote from "@/view/blog/BlogVote.jsx";
import {generalSignal} from "@/signal/generalSignal.js";
import BlogLastArticles from "@/view/blog/BlogLastArticles.jsx";
import EzText from "@/ezMantine/text/EzText.jsx";

// import {createArray} from "@/util/createArray.js";
// function getRandomInt(min, max) {
//     const minCeiled = Math.ceil(min);
//     const maxFloored = Math.floor(max);
//     return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
// }

export default function BlogById() {
    const {screen} = generalSignal
    const {
        articleByIdGetData,
        articleByIdData,
        articleByIdLoading,
    } = BlogController,
        {pathname} = useLocation(),
        id = pathname.split('/').pop()

    useLayoutEffect(() => {
        articleByIdGetData(id)
        return () => BlogController.articleByIdLoading = true
    }, [id]);

    if (articleByIdLoading) return <EzLoader h='calc(100vh - 80px)'/>

    return (
        <SContainer mih='100vh' bg='#ffffff'>
            <BlogTitle/>

            <Flex gap='1rem' pos='relative'>
                {/*adornment*/}
                {/*{createArray(5).map((item, index) =>*/}
                {/*    <div*/}
                {/*        key={index}*/}
                {/*        style={{*/}
                {/*            position: 'absolute',*/}
                {/*            width: '100px',*/}
                {/*            height: '100px',*/}
                {/*            backgroundColor: 'aqua',*/}
                {/*            top: `${Math.floor(Math.random() * index * 200)}px`,*/}
                {/*            left: `${Math.random() * index * 200}px`,*/}
                {/*            zIndex: 1,*/}
                {/*        }}*/}
                {/*    />*/}
                {/*)}*/}

                <Stack flex={2} style={{zIndex: 2}}>
                    <Flex justify='space-between' style={{borderBottom: '0.0625rem solid #00000010'}}>
                        <EzText size='clamp(1.2rem, 2.2vw, 2.5rem)'>{articleByIdData.article_title}</EzText>
                        <BlogVote item={articleByIdData} b/>
                    </Flex>
                    {articleByIdData.article_description.map((item, index) =>
                        <TextGenerator
                            item={item}
                            key={index}
                            isLast={index === articleByIdData.article_description.length - 1}
                        />
                    )}
                </Stack>

                {screen > 768 && <Stack
                    flex={1}
                >
                    <BlogLastArticles/>
                </Stack>}

            </Flex>

            {/*find 4 related articles*/}
            {/*<span>related articles</span>*/}
        </SContainer>
    );
}

BlogById.proptype = {}