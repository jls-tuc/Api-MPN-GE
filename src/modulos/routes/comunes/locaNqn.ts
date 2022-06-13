import { Router } from 'express';
import cache from '../../../middlewares/cache';
import { validateLogin } from '../../../middlewares/passport-jwt';
import { getLocaNqn } from '../../controllers/comunes/locaNqn';

const router = Router();

router.get('/locaNqn', validateLogin, cache, getLocaNqn);
export default router;
