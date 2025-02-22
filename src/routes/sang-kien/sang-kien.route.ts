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

router.post('/', upload.array('images', 10), sangKienController.create);

export default router;
