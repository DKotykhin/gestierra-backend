import userService from '../service/userService.js';
import residentialService from '../service/residentialService.js';
import camposService from '../service/camposService.js';

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

        getResidentialPosts: async (parent, { residentialParamsInput }, contextValue) => {
            const posts = await residentialService.getPosts(residentialParamsInput);

            return posts;
        },

        getOneResidentialPost: async (parent, { _id }, contextValue) => {
            const post = await residentialService.getOnePost(_id);

            return post;
        },

        getCamposPosts: async (parent, { camposParamsInput }, contextValue) => {
            const posts = await camposService.getPosts(camposParamsInput);

            return posts;
        },

        getOneCamposPost: async (parent, { _id }, contextValue) => {
            const post = await camposService.getOnePost(_id);

            return post;
        },
    },
};

export { queryResolver };
