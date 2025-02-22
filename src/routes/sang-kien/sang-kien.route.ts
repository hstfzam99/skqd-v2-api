import express from 'express';

// Controller
import sangKienController from '../../controllers/sang-kien.controller';


const router = express.Router();

router.get(
    '/',
    sangKienController.list,
);
router.get('/:id',sangKienController.detail)
router.post('/', sangKienController.create)

export default router;
