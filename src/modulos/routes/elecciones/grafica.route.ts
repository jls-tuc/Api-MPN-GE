import { Router } from 'express';
import cache from '../../../middlewares/cache';
import { validateLogin } from '../../../middlewares/passport-jwt';

import { getCalculoEleccion, getCalculoTotalCoord, getCalculoTotalRef, getLocEleccion, getRecalculando, getvotosGrafica, getvotosGraficaEleccion } from '../../controllers/elecciones/graficas.controllers';
import { getCalculoTotal } from '../../controllers/elecciones/votoAdhesion.controllers';

const router = Router();

router.post('/estadistica/graficatotal', validateLogin, getvotosGrafica);
router.post('/estadistica/graficatotalEleccion', validateLogin, getvotosGraficaEleccion);
router.get('/estadistica', getRecalculando);
router.get('/estadistica/calculototal', validateLogin, getCalculoTotal);
router.get('/estadistica/votosLocalidades', getLocEleccion);
router.post('/estadistica/calculoEleccion', validateLogin, getCalculoEleccion);
router.post('/estadistica/calculototalref', validateLogin, getCalculoTotalCoord);
router.post('/estadistica/calculototalresp', getCalculoTotalRef);
export default router;
