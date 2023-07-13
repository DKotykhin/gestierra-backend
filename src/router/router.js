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
    multerConfig.single('image'),
    resizeImages,
    function (req, res) {
                
        res.json({
            imageURL: `/upload/${req.fileName}`,
            message: "Image successfully upload.",
        });
    },
);

export default router;