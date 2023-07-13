import userService from '../service/userService.js';
import postService from '../service/postService.js';

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

        userUpdatePassword: async (parent, { password }, contextValue) => {
            const updatedUser = await userService.updatePassword(password, contextValue.token);

            if (updatedUser) {
                return {
                    status: true,
                    message: "Password successfully updated",
                };
            }
        },

        createPost: async (parent, { createPostInput }, contextValue) => {
            const newPost = await postService.create(createPostInput, contextValue.token);

            return {
                ...newPost._doc,
                message: 'Post successfully created'
            };
        },

        updatePost: async (parent, { updatePostInput }, contextValue) => {
            const updatedPost = await postService.update(updatePostInput, contextValue.token);

            return {
                ...updatedPost._doc,
                message: 'Post successfully updated'
            };
        },

        deletePost: async (parent, { _id }, contextValue) => {
            const postStatus = await postService.delete(_id, contextValue.token)

            return {
                postStatus,
                message: 'Post successfully deleted'
            }
        },
    }
};

export { mutationResolver };
