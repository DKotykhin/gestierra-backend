import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    userName: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    resetPassword: {
        token: String,
        expire: Date,
        changed: Date,
    },
}, {
    timestamps: true,
    versionKey: false,
    collection: 'users',
}
);

export default model('User', userSchema);