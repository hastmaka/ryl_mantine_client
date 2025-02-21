import PropTypes from 'prop-types'
import {ActionIcon, Flex} from '@mantine/core'
import {IconThumbUpFilled} from "@tabler/icons-react";
import {BlogController} from "@/view/blog/BlogController.js";

export default function BlogVote({item, b}) {
    const {handleVote} = BlogController

    if (item.article_like === 0) return null

    return (
        <Flex
            justify='flex-end'
            align='center'
            p='.5rem'
            gap={4}
        >
            <ActionIcon
                variant='transparent'
                disabled={!b}
                onClick={handleVote}
            >
                <IconThumbUpFilled color='var(--color-2)'/>
            </ActionIcon>
                <span>{item.article_like}</span>
        </Flex>
    );
}

BlogVote.propTypes = {
    item: PropTypes.object.isRequired,
    b: PropTypes.bool
}