import sharp from "sharp";
import path from 'path';
import fs from 'fs';

import { GraphQLError } from 'graphql';

const resizeImages = async (req, res, next) => {

    try {
        if (!req.files.images.length) throw new GraphQLError("No file to upload");

        req.files.images.forEach(async image => {
            const filename = `${Date.now()}.webp`;
            await sharp(image.path)
                .resize(200)
                .webp()
                .toFile(
                    path.resolve(image.destination, filename)
                )
            fs.unlinkSync(image.path);
            req.fileName = filename;
        });

        next();
    } catch (error) {
        next(error)
    }
};

export default resizeImages;