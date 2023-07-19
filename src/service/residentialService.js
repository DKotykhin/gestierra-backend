import { GraphQLError } from 'graphql';

import ResidentialModel from '../models/Residential.js';

import { checkAuth } from '../utils/_index.js';

class ResidentialService {

    async getPosts(params) {
        const { advertiseType, bathRoom, bedRoom, category, parkingLots, priceRange: { minPrice, maxPrice } } = params;
        return await ResidentialModel
            .find({ advertiseType, bathRoom, bedRoom, category, parkingLots, price: { $gt: minPrice, $lt: maxPrice } })
            .sort({ createdAt: -1 });
    }

    async getOnePost(id) {
        return ResidentialModel.findById(id);
    }

    async create(data, token) {
        const userId = checkAuth(token);
        if (userId) {
            const doc = new ResidentialModel({
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
            const updatedPost = await ResidentialModel.findOneAndUpdate(
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
            const postStatus = await ResidentialModel.deleteOne({ _id });
            if (!postStatus.deletedCount) {
                throw new GraphQLError("Deleted forbidden")
            }

            return postStatus;
        }
    }
}

export default new ResidentialService;