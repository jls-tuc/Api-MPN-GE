import { Router } from 'express';
import { validateLogin } from '../../../middlewares/passport-jwt';

import { guardarVoto, getvotos, getOneVoto } from '../../controllers/elecciones/votoProv.controllers';

const router = Router();

router.post('/votoProv', validateLogin, guardarVoto);
router.get('/votoProv', validateLogin, getvotos);
router.get('/votoProv/dni', validateLogin, getOneVoto);

export default router;
