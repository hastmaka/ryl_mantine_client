import {Card, Flex, Skeleton, Stack} from '@mantine/core'
import {useLayoutEffect} from "react";
import {BlogController} from "@/view/blog/BlogController.js";
import EzText from "@/ezMantine/text/EzText.jsx";
import classes from "./Blog.module.scss";
import {createArray} from "@/util/createArray.js";
import AsyncImage from "@/component/AsyncImage.jsx";

export default function BlogLastArticles() {
    const {
        lastArticlesGetData,
        lastArticlesData,
        lastArticlesLoading,
    } = BlogController

    useLayoutEffect(() => {lastArticlesGetData()}, [])

    return (
        <Stack>
            <EzText size='xl'>Last Articles</EzText>

            {lastArticlesLoading
                ? (
                    createArray(2).map((index) => <Skeleton key={index} h={100}/>)
                ) : (
                    lastArticlesData.map(({article_url, article_date, article_title, id}, index) => {
                        const date = new Date(article_date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: '2-digit',
                            year: 'numeric'
                        })
                        return (
                            <Card
                                key={index}
                                p={0}
                                className={classes['card-wrapper']}
                                style={{cursor: 'pointer'}}
                                onClick={() => navigate(`/blog/${article_title}/${id}`, {state: {id}})}
                            >
                                <Flex  align='center' gap={16} bg='#ffffffe2'>
                                    <div style={{width: '100px', height: '100px', minWidth: '100px'}}>
                                        <AsyncImage
                                            url={article_url[0]}
                                            altImg={article_date}
                                            height={100}
                                            loaderProps={{h: 100, w: '100%'}}
                                        />
                                    </div>
                                    <div>
                                        <span>{date}</span>
                                        <EzText className={classes.title}>{article_title}</EzText>
                                    </div>
                                </Flex>
                            </Card>
                        )
                    })
                )
            }
        </Stack>
    );
}

BlogLastArticles.propTypes = {}