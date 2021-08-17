import { Router } from 'express';
import cache from '../../../middlewares/cache';
import { validateLogin } from '../../../middlewares/passport-jwt';

import { guardarVoto, getvotos, getOneVoto, cargarVoto, getvotosuser } from '../../controllers/elecciones/votoProv.controllers';

const router = Router();

router.post('/votoProv', validateLogin, guardarVoto);
router.post('/votoGraf', validateLogin, cargarVoto);
router.get('/votoProv/id', validateLogin, getvotos);
router.get('/votoProv/idu', validateLogin, getvotosuser);
router.get('/votoProv/dni', validateLogin, getOneVoto);
export default router;
