import { Router } from 'express';
import { validateLogin } from '../../../../middlewares/passport-jwt';
import { postGeo } from '../../../controllers/elecciones/geo/votosXEsc.controllers';

const router = Router();

router.post('/geo/votoXEsc', validateLogin, postGeo);

export default router;
