import { Router } from 'express';
import cache from '../../../middlewares/cache';
import { validateLogin } from '../../../middlewares/passport-jwt';

import {
  getvotosGrafica,
  getRecalculando,
  getCalculoTotal,
  getCalculoTotalCoord,
  getCalculoTotalRef,
} from '../../controllers/elecciones/graficas.controllers';

const router = Router();

router.post('/estadistica/graficatotal', validateLogin, getvotosGrafica);
//router.get('/estadistica', getRecalculando);
router.get('/estadistica/calculototal', validateLogin, getCalculoTotal);
router.post('/estadistica/calculototalref', validateLogin, getCalculoTotalCoord);
router.post('/estadistica/calculototalresp', getCalculoTotalRef);
export default router;
