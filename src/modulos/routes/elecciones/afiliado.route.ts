import { Router } from 'express';
import { afiliadoFilto, getAfiliado, getSecCir } from '../../controllers/elecciones/afiliados.controllers';
import { validateLogin } from '../../../middlewares/passport-jwt';
import cache from '../../../middlewares/cache';
const route = Router();

route.get('/afiliadoNpn', validateLogin, getAfiliado);
route.get('/secCir', validateLogin, getSecCir);

//filtros
route.post('/afiliado/filtros', validateLogin, afiliadoFilto);

export default route;
