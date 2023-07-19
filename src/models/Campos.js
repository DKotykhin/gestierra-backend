import mongoose from "mongoose";
const { Schema, model } = mongoose;

const camposSchema = new Schema({
    title: String,
    advertiseType: {
        type: String,
        enum: ['Sell', 'Rent'],
        default: 'Sell',
    },
    address: String,
    description: String,
    tags: Array,
    price: Number,
    propertyType: {
        type: String,
        enum: ['Livestock', 'Dairy', 'Forestry', 'Fruit', 'Vegetables', 'Conservation', 'Real estate', 'Energy'],
        default: 'Livestock',
    },
    size: Number,
    waterRights: Number,
    bodyOfWater: Boolean,
    riverShore: Number,
    lakeShore: Number,
    plantedHectares: Number,
    buildInfrastructure: Number,
    bathRoom: Number,
    bedRoom: Number,
    imagesURL: [String],
}, {
    timestamps: true,
    versionKey: false,
    collection: 'campos',
}
);

export default model('Campos', camposSchema);