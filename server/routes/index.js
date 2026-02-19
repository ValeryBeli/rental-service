import {Router} from 'express';
import offerRoute from './offerRoutes.js';
import userRotes from './userRoutes.js';
import reviewRouter from './reviewRoutes.js';

const router = new Router();

router.use('/', offerRoute);
router.use('/', userRotes);
router.use('/comments', reviewRouter);

export default router;