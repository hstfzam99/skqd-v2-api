import express from 'express';

// Controller
import sangKienController from '../../controllers/sang-kien.controller';
import { upload } from '../../middlewares/multer.middleware';


const router = express.Router();

router.get(
  '/',
  sangKienController.list,
);
router.get('/:id', sangKienController.detail)

router.post('/', upload.fields([{ name: 'thumb' }, { name: 'sound' }]), sangKienController.create);

export default router;
