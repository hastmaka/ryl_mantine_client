import {SignalController} from "@/signal/SignalController.js";
import {FetchApi} from "@/api/FetchApi.js";
import {getModel} from "@/api/models/index.js";
import {Server} from "@/api/firebase/Server.js";

export const BlogController = new SignalController({
    pagination: {
        limit: 3,
        totalCount: null,
        firstDoc: null,
        lastDoc: null,
        page: 1,
        canNext: true,
        canLast: false,
    },
    tag: {
        searchingByTag: '',
    },
    searchedValue: '',
    searchValue: '',
}, {
    //helper
    update: ({data, totalCount, firstDoc, lastDoc}) => {
        let me = BlogController
        const ArticleModel = getModel('article')
        me.articleData = data?.map(article => new ArticleModel(article))
        me.articleLoading = false
        me.pagination = {
            ...me.pagination,
            totalCount,
            firstDoc,
            lastDoc
        }
    },
    updatePagination: () => {
        let me = BlogController;
        me.pagination.canLast = me.pagination.page > 1;
        me.pagination.canNext = me.pagination.limit < me.pagination.totalCount && me.pagination.page < me.pagination.totalCount && me.pagination.limit * me.pagination.page < me.pagination.totalCount;
    },
    handleSearchInput: (value) => BlogController.searchValue = value,
    handlePaginationChange: async (direction) => {
        let me = BlogController,
            {firstDoc, lastDoc} = me.pagination;

        const startAfterDoc = direction === 'next' ? lastDoc : undefined;
        const endBeforeDoc = direction === 'prev' ? firstDoc : undefined;

        if (direction === 'next') me.pagination.page = me.pagination.page + 1
        if (direction === 'prev') me.pagination.page = me.pagination.page - 1
        me.updatePagination()

        const response = await Server.getPaginatedData({
            collection: 'articles',
            orderByProp: ['article_date', 'desc'],
            filters: [{
                field: 'article_status',
                operator: '==',
                value: true
            }],
            direction,
            startAfterDoc,
            endBeforeDoc,
            lim: me.pagination.limit
        })

        me.update(response)
    },
    lastArticlesGetData: async () => {
        let me = BlogController;
        const data = await Server.getLastArticles()
        const ArticleModel = getModel('article')
        me.lastArticlesData = data.map(article => new ArticleModel(article))
        me.lastArticlesLoading = false
    },
    articleGetData: async (fromTag) => {
        let me = BlogController;
        if (fromTag) {
            me.articleLoading = true
            me.pagination = {
                ...me.pagination,
                // page: 1,
                totalCount: null
            }
            me.tag.searchingByTag = ''
        }

        //await new Promise((resolve) => setTimeout(resolve, 1000))

        const response = await Server.getPaginatedData({
            collection: 'articles',
            orderByProp: ['article_date', 'desc'],
            filters: [{
                field: 'article_status',
                operator: '==',
                value: true
            }],
            lim: me.pagination.limit
        })

        me.update(response)
        me.updatePagination()
    },
    articleByIdGetData: async (articleId) => {
        const data = await Server.getById({
            collection: 'articles',
            id: articleId
        })
        const ArticleModel = getModel('article')
        BlogController.articleByIdData = new ArticleModel(data)
        BlogController.articleByIdLoading = false
    },
    tagGetData: async () => {
        let me = BlogController;
        //await new Promise((resolve) => setTimeout(resolve, 1000))
        const response = await Server.getAll({
            collection: 'tags'
        })

        me.tagLoading = false
        me.tagData = response[0].tags_active || []
    },
    searchByTag: async (tagName) => {
        let me = BlogController;
        me.articleLoading = true
        me.pagination = {
            ...me.pagination,
            totalCount: null
        }
        me.searchedValue = ''
        me.searchValue = ''
        //await new Promise((resolve) => setTimeout(resolve, 1000))
        const response = await Server.getPaginatedData({
            collection: 'articles',
            orderByProp: ['article_date', 'desc'],
            filters: [{
                field: 'article_tags',
                operator: 'array-contains',
                value: tagName
            }, {
                field: 'article_status',
                operator: '==',
                value: true
            }],
            lim: me.pagination.limit
        })

        me.update(response)
        me.updatePagination()
        me.tag.searchingByTag = tagName
    },
    handleSearch: async (value) => {
        let me = BlogController;
        if (value) {
            if (me.searchedValue !== value) {
                me.articleLoading = true
                me.pagination = {
                    page: 1,
                    limit: 3
                }
                me.tag.searchingByTag = ''
                const response = await FetchApi(
                    'articlesSearch',
                    'GET',
                    null,
                    {
                        searchParam: value,
                        ...me.pagination
                    }
                )
                me.searchedValue = value
                me.update(response.data)
            }
        } else {
            me.articleGetData()
        }

    },
    handleVote: async () => {
        let me = BlogController,
            id = me.articleByIdData.id,
            updatedArticle = {
                ...me.articleByIdData,
                article_like: me.articleByIdData.article_like + 1
            }

        await Server.update({
            id,
            collection: 'articles',
            data: updatedArticle
        })

        me.articleByIdGetData(id)
    }
}).signal