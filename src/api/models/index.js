import UserModel from "./UserModel.jsx";
import ArticleModel from "@/api/models/ArticleModel.jsx";


export const getModel = (name) => {
	const models = {
		article: ArticleModel,
		user: UserModel,
	}

	return models[name] || new Error(`Model ${name} not found`);
}