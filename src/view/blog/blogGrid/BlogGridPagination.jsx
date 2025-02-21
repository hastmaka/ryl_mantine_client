import {ActionIcon, Flex, Pagination, Skeleton, Tooltip} from '@mantine/core'
import {BlogController} from "@/view/blog/BlogController.js";
import {IconArrowLeft, IconArrowRight} from "@tabler/icons-react";
import ActionIconsToolTip from "@/component/ActionIconsToolTip.jsx";
import {useMemo} from "react";

export default function BlogGridPagination() {
    const {
        pagination,
        handlePaginationChange,
        searchedValue,
        articleData
    } = BlogController

    const ITEMS = useMemo(() => [
        {
            tooltip: 'Previous',
            icon: <IconArrowLeft/>,
            disabled: !pagination.canLast,
            onClick: () => handlePaginationChange('prev')
        },
        {
            tooltip: 'Next',
            icon: <IconArrowRight/>,
            disabled: !pagination.canNext,
            onClick: () => handlePaginationChange('next')
        }
    ], [pagination.canNext, pagination.canLast])

    if (searchedValue && articleData.length <= 0 || !articleData) return null

    return (
        <Flex justify='center'>
            {!pagination.totalCount
                ? <Skeleton w={400} h={40}/>
                : (
                    <Flex gap='1rem' align='center'>
                        <Tooltip label='Prev'>
                            <ActionIcon
                                variant='light'
                                // c='var(--color-2)'
                                disabled={!pagination.canLast}
                                onClick={() => handlePaginationChange('prev')}
                            >
                                <IconArrowLeft/>
                            </ActionIcon>
                        </Tooltip>
                        <span>
                            {pagination.page} of {Math.ceil(pagination.totalCount / pagination.limit)}
                        </span>
                        <Tooltip label='Next'>
                            <ActionIcon
                                variant='light'
                                // c='var(--color-2)'
                                disabled={!pagination.canNext}
                                onClick={() => handlePaginationChange('next')}
                            >
                                <IconArrowRight/>
                            </ActionIcon>
                        </Tooltip>
                    </Flex>
                )
            }
        </Flex>
    )
}

// <Pagination
//     color='var(--color-2)'
//     total={pagination.totalCount}
//     value={pagination.page}
//     onChange={handlePaginationChange}
//     mt="sm"
// />