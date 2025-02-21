import {ActionIcon, Flex, Group, Pill, rem} from '@mantine/core'
import {ArticleGridController} from "./ArticleGridController.jsx";
import {useLayoutEffect} from "react";
// import {stringFilterFn, dateFilterFn} from "mantine-data-grid";
import MantineGrid from "@/ezMantine/mantineDataGrid/MantineGrid.jsx";
import GenericModal from "@/component/modal/GenericModal.jsx";
import {IconTrash} from "@tabler/icons-react";
import icons from '../../../theme/Icons.module.scss'
import ArticleGridToolBar from "./ArticleGridToolBar.jsx";
import {ArticleModalController} from "@/view/crm/article/_modal/ArticleModalController.js";

const signal = ArticleGridController

const columns = [
    {
        accessorKey: 'article_title',
        header: 'Article Title',
    }, {
        accessorKey: 'article_author',
        header: 'Article Author',
        size: 100
    }, {
        accessorKey: 'article_tags',
        header: 'Tags',
        size: 300,
        cell: ({cell}) => {
            const tags = cell.getValue()
            return (
                <Group gap={4}>
                    {tags.map((tag, index) =>
                        <Pill
                            size='md'
                            key={index}
                        >{tag}</Pill>
                    )}
                </Group>
            )
        },
    }, {
        accessorKey: 'article_status',
        header: 'Status',
        size: 60,
        cell: ({cell}) => {
            const value = cell.getValue();
            return value
                ? <Pill bg='var(--color-2)' c='white'>active</Pill>
                : <Pill bg='yellow.5'>inactive</Pill>
        }
    }, {
        header: 'Action',
        size: 60,
        cell: ({cell, table}) => {
            let state = table.getState(),
                id = cell.row.original.id
            return (
                <Flex direction='row' gap={8}>
                    <ActionIcon
                        variant="default"
                        aria-label="delete"
                        onClick={() => {
                            // state.handleConfirm(cell.row.original[state.rowId])
                            openModal({
                                modalId: 'delete-article',
                                title: 'Delete Article',
                                size: 'sm',
                                children: (
                                    <GenericModal
                                        text='Want to delete this article?'
                                        cancel={() => closeModal('delete-article')}
                                        accept={async () => {
                                            await toast.U({
                                                modalId: 'delete-article',
                                                id: {
                                                    title: 'Deleting',
                                                    message: `Deleting ...`,
                                                },
                                                update: {
                                                    success: `Article id:${id} was deleted successfully`,
                                                    error: `Article id:${id} could not be deleted`
                                                },
                                                cb: async () => {
                                                    ArticleModalController.handleDeleteArticle(id, cell.row.original.article_tags)
                                                }
                                            })
                                            closeModal('delete-article')
                                        }}
                                    />
                                ),
                                onClose: () => {}
                            });
                        }}
                    >
                        <IconTrash className={icons.delete} style={{width: rem(20)}}/>
                    </ActionIcon>
                </Flex>
            )
        }
    }
]

export default function ArticleGrid() {
    useLayoutEffect(() => {
        signal?.fetchData().then()
    }, [
        signal?.pagination.pageSize,
        signal?.pagination.pageIndex,
        signal?.searchValue,
        signal?.search
    ])
    return (
        <MantineGrid
            state={{...signal, columns}}
            rowId='id'
            toolbar={<ArticleGridToolBar state={{...signal}}/>}
        />
    );
}