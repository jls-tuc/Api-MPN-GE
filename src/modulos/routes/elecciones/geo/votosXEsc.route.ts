import { Router } from 'express';
import { validateLogin } from '../../../../middlewares/passport-jwt';
import { postGeo, getDonas } from '../../../controllers/elecciones/geo/votosXEsc.controllers';

const router = Router();

router.post('/geo/votoXEsc', validateLogin, postGeo);
router.get('/geo/votoXEsc', validateLogin, getDonas);

export default router;
