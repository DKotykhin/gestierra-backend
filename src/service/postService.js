import { GraphQLError } from 'graphql';

import PostModel from '../models/Post.js';

import { checkAuth } from '../utils/_index.js';

class PostService {

    async getPosts() {
        return await PostModel.find().sort({ createdAt: -1 });
    }

    async create(data, token) {
        const userId = checkAuth(token);
        if (userId) {
            const doc = new PostModel({
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
            const updatedPost = await PostModel.findOneAndUpdate(
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
            const postStatus = await PostModel.deleteOne({ _id });
            if (!postStatus.deletedCount) {
                throw new GraphQLError("Deleted forbidden")
            }

            return postStatus;
        }
    }
}

export default new PostService;