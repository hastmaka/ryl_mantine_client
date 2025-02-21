import {SignalGridClass} from "@/signal/SignalGridClass.js";
import {getModel} from "@/api/models/index.js";
import {lazy, Suspense} from "react";
import EzLoader from "@/ezMantine/loader/EzLoader.jsx";
import {Server} from "@/api/firebase/Server.js";
//dynamic
const ArticleModal = lazy(() => import('./_modal/ArticleModal.jsx'))

export const ArticleGridController = new SignalGridClass({
    store: {
        model: {
            main: getModel('article'),
        },
        filterFields: ['article_title'],
        //temp pagination because we are working with semi-static data
        limit: 10,
    },
    loading: true
}, {
    async fetchData() {
        let me = ArticleGridController
        const articles = await Server.getAll({
            collection: 'articles',
            filter: [{
                field: 'article_status',
                operator: '==',
                values: true
            }],
            limit: me.store.limit
        })
        const dataCount = await Server.getById({
            collection: 'article_stats',
            id: 'qytXChkrXeAkiM0l92xn'
        })
        me.updateGrid({data: articles, dataCount: dataCount.quantity})
    },
    onDoubleClick(row){
        openModal({
            modalId: 'manage-article',
            title: 'Edit Article',
            fullScreen: true,
            children: (
                <Suspense fallback={<EzLoader h={500}/>}>
                    <ArticleModal id={row['id']}/>
                </Suspense>
            ),
            onClose: () => {}
        })
    }
}).signal