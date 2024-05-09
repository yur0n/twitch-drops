import { Router } from 'express';
import { watcherHook } from '../middlewares/watcherHook';

const router = Router();

router.get('/watcher', watcherHook);

export default router;
