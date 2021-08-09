import { Router } from 'express';
import { validateLogin } from '../../../middlewares/passport-jwt';

import { guardarVoto, getvotos, getOneVoto, getvotosGrafica } from '../../controllers/elecciones/votoProv.controllers';

const router = Router();

router.post('/votoProv', validateLogin, guardarVoto);
router.get('/votoProv/id', validateLogin, getvotos);
router.get('/votoProv/dni', validateLogin, getOneVoto);
router.get('/votoProv', validateLogin, getvotosGrafica);
export default router;
