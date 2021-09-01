import { Router } from 'express';
import { validateLogin } from '../../middlewares/passport-jwt';
import { getServerSPS } from '../controllers/server';

const router = Router();

router.get('', validateLogin, getServerSPS);

export default router;
