import EzModel from "../model/EzModel.jsx";

export default class ArticleModel extends EzModel {
    constructor(data) {
        super({
            fields: [{
                name: 'id', type: 'string',
            }, {
                name: 'article_status', type: 'boolean',//active | draft
            },{
                name: 'article_title', type: 'string',
            }, {
                name: 'article_author', type: 'string',
            }, {
                name: 'article_date', type: 'date-from-time-stamp',
            }, {
                name: 'article_summary', type: 'string',
            }, {
                name: 'article_tags', type: 'array',
            }, {
                name: 'article_url', type: 'array',
            }, {
                name: 'article_description', type: 'array',
            }, {
                name: 'article_like', type: 'int'
            }],
            data,
        });
    }
}
