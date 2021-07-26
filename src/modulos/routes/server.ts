import { Router } from 'express';
import { getServerSPS } from '../controllers/server';

const router = Router();

router.get('', getServerSPS);

export default router;
