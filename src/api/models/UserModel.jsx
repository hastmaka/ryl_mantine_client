import EzModel from "../model/EzModel.jsx";


export default class UserModel extends EzModel {
	constructor(data) {
		super({
			fields: [{
				name: 'user_id', type: 'int'
			}, {
                name: 'user_email', type: 'string'
            }, {
                name: 'user_uid', type: 'string'
            }, {
                name: 'user_last_login', type: 'string'
            }],
            data, suffix: 'user', requiresPrimary: false
		});
	}
}