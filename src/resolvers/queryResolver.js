import userService from '../service/userService.js';

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
    },
};

export { queryResolver };
