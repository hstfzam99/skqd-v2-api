import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File filter for images
const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'audio/mpeg') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type! Only images and MP3s are allowed.'));
    }
};

// Initialize multer
export const upload = multer({ storage, fileFilter });
