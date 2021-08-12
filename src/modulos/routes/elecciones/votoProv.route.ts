import { Router } from 'express';
import cache from '../../../middlewares/cache';
import { validateLogin } from '../../../middlewares/passport-jwt';

import {
   guardarVoto,
   getvotos,
   getOneVoto,
   getvotosGrafica,
   actualizarVoto,
   getRecalculando,
   getCalculoTotal,
} from '../../controllers/elecciones/votoProv.controllers';

const router = Router();

router.post('/votoProv', validateLogin, guardarVoto);
router.post('/actualizarVoto', actualizarVoto);
router.get('/votoProv/id', validateLogin, getvotos);
router.get('/votoProv/dni', validateLogin, getOneVoto);
router.get('/estadistica/graficatotal', validateLogin, getvotosGrafica);
router.get('/estadistica', getRecalculando);
router.get('/estadistica/calculototal', cache, getCalculoTotal);
export default router;
