import userService from '../service/userService.js';
import residentialService from '../service/residentialService.js';
import camposService from '../service/camposService.js';

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

        userConfirmPassword: async (parent, { password }, contextValue) => {
            const status = await userService.confirmPassword(password, contextValue.token);

            return { ...status };
        },

        userUpdatePassword: async (parent, { password }, contextValue) => {
            const updatedUser = await userService.updatePassword(password, contextValue.token);

            if (updatedUser) {
                return {
                    status: true,
                    message: "Password successfully updated",
                };
            }
        },

        createResidentialPost: async (parent, { createResidentialPostInput }, contextValue) => {
            const newPost = await residentialService.create(createResidentialPostInput, contextValue.token);

            return {
                ...newPost._doc,
                message: 'Residential Post successfully created'
            };
        },

        updateResidentialPost: async (parent, { updateResidentialPostInput }, contextValue) => {
            const updatedPost = await residentialService.update(updateResidentialPostInput, contextValue.token);

            return {
                ...updatedPost._doc,
                message: 'Residential Post successfully updated'
            };
        },

        deleteResidentialPost: async (parent, { _id }, contextValue) => {
            const postStatus = await residentialService.delete(_id, contextValue.token)

            return {
                postStatus,
                message: 'Residential Post successfully deleted'
            }
        },

        createCamposPost: async (parent, { createCamposPostInput }, contextValue) => {
            const newPost = await camposService.create(createCamposPostInput, contextValue.token);

            return {
                ...newPost._doc,
                message: 'Campos Post successfully created'
            };
        },

        updateCamposPost: async (parent, { updateCamposPostInput }, contextValue) => {
            const updatedPost = await camposService.update(updateCamposPostInput, contextValue.token);

            return {
                ...updatedPost._doc,
                message: 'Campos Post successfully updated'
            };
        },

        deleteCamposPost: async (parent, { _id }, contextValue) => {
            const postStatus = await camposService.delete(_id, contextValue.token)

            return {
                postStatus,
                message: 'Campos Post successfully deleted'
            }
        },
    }
};

export { mutationResolver };
