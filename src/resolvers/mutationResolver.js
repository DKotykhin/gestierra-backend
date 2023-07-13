import userService from '../service/userService.js';

const mutationResolver = {
    Mutation: {
        userRegister: async (parent, { registerInput }) => {
            const { user, token } = await userService.register(registerInput);

            return {
                user,
                token,
                message: `User ${user.userName} successfully created`,
            };
        },

        userDelete: async (parent, { _id }, contextValue) => {
            const userStatus = await userService.delete(_id, contextValue.token);

            return {
                userStatus,
                message: 'User successfully deleted'
            };
        },

        userResetPassword: async (parent, { email }) => {
            const status = await userService.resetPassword(email);

            return {
                status: status.response,
                message: `Email successfully sent to ${status.accepted}`,
            };
        },

        userSetNewPassword: async (parent, { setPasswordInput }) => {
            const updatedUser = await userService.setNewPassword(setPasswordInput);

            if (updatedUser) {
                return {
                    status: true,
                    message: `${updatedUser.userName} password successfully updated`,
                };
            }
        },
    }
};

export { mutationResolver };
