import {Router} from 'express';
import offerRoute from './offerRoutes.js';
import userRotes from './userRoutes.js';

const router = new Router();

router.use('/', offerRoute);
router.use('/', userRotes);

export default router;