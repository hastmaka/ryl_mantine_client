import PropTypes from 'prop-types'
import {Card, Flex, Group, Pill, PillGroup, Stack} from '@mantine/core'
import classes from './Blog.module.scss'
import EzText from "@/ezMantine/text/EzText.jsx";
import BlogVote from "@/view/blog/BlogVote.jsx";
import AsyncImage from "@/component/AsyncImage.jsx";

export default function BlogCard({item}) {
    const {article_url, article_author, article_date, article_summary, article_tags, article_title, id} = item

    return (
        <Card
            p={0}
            className={classes['card-wrapper']}
            style={{cursor: 'pointer'}}
            onClick={() => navigate(`/blog/${article_title}/${id}`, {state: {id: item.id}})}
        >

            <AsyncImage
                url={article_url[0]}
                altImg={`'https://firebasestorage.googleapis.com/v0/b/rylllc.firebasestorage.app/o/no_pic.jpg?alt=media&token=64d8c894-0918-496f-b8e8-b65a06b8a35c'`}
                height={260}
                mah={260}
                radius='4px'
                loaderProps={{h: 260, w: '100%'}}
            />

            <Stack gap={0} p='1rem'>

                <Flex align='center' justify='space-between'>
                    <Group>
                        <EzText fw='xxl'>{article_author}</EzText>
                        <EzText>{`date: ${article_date}`}</EzText>
                    </Group>
                    <BlogVote item={item}/>
                </Flex>

                <PillGroup gap={4}>
                    {article_tags.map((tag, index) =>
                        <Pill
                            key={index}
                            size='sm'
                            bg='var(--color-2)'
                            c='white'
                            style={{
                                border: '1px solid #00000020',
                            }}
                            styles={{
                                label: {
                                    marginBottom: '2px',
                                }
                            }}
                        >{tag}</Pill>
                    )}
                </PillGroup>

                <EzText
                    pt='1rem'
                    className={classes.title}
                >{article_title}</EzText>

                <EzText size='xs' color='gray.6'>{article_summary}</EzText>


            </Stack>
        </Card>
    );
}

BlogCard.propTypes = {
    item: PropTypes.object.isRequired,
}