import { Router } from "express";

import { multerConfig, checkAuth } from '../utils/_index.js';
import resizeImages from "../middlewares/resizeImages.js";

const router = new Router();

router.post('/upload',
    function (req, res, next) {
        const id = checkAuth(req.headers.authorization);
        req.userId = id;
        next()
    },
    multerConfig.fields([
        { name: 'images', maxCount: 10 },
    ]),
    resizeImages,
    function (req, res, next) {
        try {
            const imagesURL = req.files.images.map(item => `/upload/${item.filename}`);

            res.json({
                imagesURL,
                message: "Images successfully upload.",
            });
        } catch (error) {
            next(error)
        }
    },
);

export default router;