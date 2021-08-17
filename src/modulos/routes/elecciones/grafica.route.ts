import { Router } from 'express';
import cache from '../../../middlewares/cache';
import { validateLogin } from '../../../middlewares/passport-jwt';

import {
   getvotosGrafica,
   getRecalculando,
   getCalculoTotal,
   getCalculoTotalCoord,
} from '../../controllers/elecciones/graficas.controllers';

const router = Router();

router.post('/estadistica/graficatotal', validateLogin, getvotosGrafica);
router.get('/estadistica', getRecalculando);
router.get('/estadistica/calculototal', validateLogin, getCalculoTotal);
router.post('/estadistica/calculototalref', validateLogin, getCalculoTotalCoord);
export default router;
