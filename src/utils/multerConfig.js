import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb(new Error('Wrong file format. Please upload only images'), false)
    }
}

export const multerConfig = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10240000, files: 10, fields: 20 }, // 10 Mb
});
