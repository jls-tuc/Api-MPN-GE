import { Router } from 'express';
import cache from '../../../middlewares/cache';
import { validateLogin } from '../../../middlewares/passport-jwt';

import { getvotosGrafica, getRecalculando, getCalculoTotal } from '../../controllers/elecciones/votoProv.controllers';

const router = Router();

router.post('/estadistica/graficatotal', validateLogin, getvotosGrafica);
router.get('/estadistica', getRecalculando);
router.get('/estadistica/calculototal', cache, getCalculoTotal);
export default router;
