import mongoose from "mongoose";
const { Schema, model } = mongoose;

const postSchema = new Schema({
    title: String,
    address: String,
    coordinates: {
        latitude: Number,
        longitude: Number
    },
    description: String,
    tags: Array,
    allSquare: String,
    usefulSquare: String,
    yearBuilt: Date,
    price: Number,
    floor: Number,
    imagesURL: [String],
}, {
    timestamps: true,
    versionKey: false
}
);

export default model('Post', postSchema);