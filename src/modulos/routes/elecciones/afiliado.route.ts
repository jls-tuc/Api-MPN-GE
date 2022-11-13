import { Router } from 'express';
import {
     afiliadoFilto,
     estAfiliados,
     getAfiliado,
     getOneAfiliado,
     getSecCir,
     grafAfiliados,
     updateEstadoAf,
} from '../../controllers/elecciones/afiliados.controllers';
import { validateLogin } from '../../../middlewares/passport-jwt';
import cache from '../../../middlewares/cache';

const route = Router();

route.get('/afiliadoNpn', validateLogin, getAfiliado);
route.get('/secCir', validateLogin, getSecCir);
route.get('/afiliadoJunta', validateLogin, getOneAfiliado);
route.patch('/updEstadoAfiliado', validateLogin, updateEstadoAf);
//estadisticas
route.get('/estadisticasAfi', validateLogin, cache, estAfiliados);
route.get('/gafricoBar', validateLogin, cache, grafAfiliados);

//filtros
route.post('/afiliado/filtros', validateLogin, afiliadoFilto);

export default route;
