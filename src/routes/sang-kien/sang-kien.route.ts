import express from 'express';

// Controller
import sangKienController from '../../controllers/sang-kien.controller';
import { upload } from '../../middlewares/multer.middleware';


const router = express.Router();

router.get(
    '/',
    sangKienController.list,
);
router.get('/:id',sangKienController.detail)

router.post('/', upload.fields([
    { name: 'images', maxCount: 5 }, // Up to 5 images
    { name: 'sounds', maxCount: 3 },  // Up to 3 MP3 files
  ]), sangKienController.create);

export default router;
