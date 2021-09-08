import { Router } from 'express';
import { validateAppMovilLogin } from '../../../../middlewares/passport-jwt';

import { getEscuela } from '../../../controllers/elecciones/votos-12/json-app.controllers';

const router = Router();

router.get('votos-12/votos/', validateAppMovilLogin, getEscuela);

export default router;
