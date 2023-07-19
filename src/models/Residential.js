import mongoose from "mongoose";
const { Schema, model } = mongoose;

const residentialSchema = new Schema({
    title: String,
    category: {
        type: String,
        enum: ['House', 'Apartments', 'Offices', 'Land', 'Locals', 'Wineries'],
        default: 'House',
    },
    advertiseType: {
        type: String,
        enum: ['Sell', 'Rent'],
        default: 'Sell',
    },
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
    parkingLots: Number,
    bathService: Number,
    bathRoom: Number,
    bedRoom: Number,
    imagesURL: [String],
}, {
    timestamps: true,
    versionKey: false,
    collection: 'residential',
}
);

export default model('Residential', residentialSchema);