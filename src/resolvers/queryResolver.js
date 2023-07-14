import userService from '../service/userService.js';
import postService from '../service/postService.js';

const queryResolver = {
    Query: {

        getUserByToken: async (parent, args, contextValue) => {
            const user = await userService.loginByToken(contextValue.token);

            return user;
        },

        userLogin: async (parent, { email, password }) => {
            const { user, token } = await userService.login({ email, password })

            return {
                user,
                token,
                message: `User ${user.userName} successfully created`,
            };
        },

        getPosts: async (parent, args, contextValue) => {
            const posts = await postService.getPosts();

            return posts;
        },

        getOnePost: async (parent, { _id }, contextValue) => {
            const post = await postService.getOnePost({ _id });

            return post;
        },
    },
};

export { queryResolver };
