import { GraphQLError } from 'graphql';

import CamposModel from '../models/Campos.js';

import { checkAuth } from '../utils/_index.js';

class CamposService {

    async getPosts() {
        return await CamposModel.find().sort({ createdAt: -1 });
    }

    async getOnePost(id) {
        return CamposModel.findById(id)
    }

    async create(data, token) {
        const userId = checkAuth(token);
        if (userId) {
            const doc = new CamposModel({
                ...data
            });
            const post = await doc.save();
            if (!post) {
                throw new GraphQLError("Database access error")
            };

            return post;
        }
    }

    async update(data, token) {
        const userId = checkAuth(token);
        if (userId) {
            const { _id, ...rest } = data;
            const updatedPost = await CamposModel.findOneAndUpdate(
                { _id, },
                {
                    $set: {
                        ...rest,
                    }
                },
                { new: true },
            );
            if (!updatedPost) {
                throw new GraphQLError("Modified forbidden")
            };

            return updatedPost;
        }
    }

    async delete(_id, token) {
        const userId = checkAuth(token);
        if (userId) {
            const postStatus = await CamposModel.deleteOne({ _id });
            if (!postStatus.deletedCount) {
                throw new GraphQLError("Deleted forbidden")
            }

            return postStatus;
        }
    }
}

export default new CamposService;