import sharp from "sharp";
import path from 'path';
import fs from 'fs';

import { GraphQLError } from 'graphql';

const resizeImages = async (req, res, next) => {
    
    try {
        if (!req.file) throw new GraphQLError("No file to upload");
        
        const filename = `${Date.now()}.webp`;
    
        await sharp(req.file.path)
            .resize(200)
            .webp()
            .toFile(
                path.resolve(req.file.destination, filename)
            )
    
        fs.unlinkSync(req.file.path);
        req.fileName = filename;
    
        next();
    } catch (error) {
        next(error)
    }
};

export default resizeImages;