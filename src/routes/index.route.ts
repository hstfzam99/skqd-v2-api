import * as express from 'express';

import defaultRouter from './default/default.route';
import sangKienRouter from './sang-kien/sang-kien.route';

const router = express.Router();

router.use('/', defaultRouter);
router.use('/sang-kien', sangKienRouter);

export default router;
