import { Router } from 'express';
import { validateAppMovilLogin } from '../../../../middlewares/passport-jwt';
import { getMesa } from '../../../controllers/elecciones/votos-12/infoAppMovil.controllers';

const router = Router();

router.post('/mesa/orden', validateAppMovilLogin, getMesa);

export default router;
