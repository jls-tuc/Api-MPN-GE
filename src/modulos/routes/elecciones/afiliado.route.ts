import { Router } from 'express';
import { getAfiliado } from '../../controllers/elecciones/afiliados.controllers';
import { validateLogin } from '../../../middlewares/passport-jwt';
const route = Router();

route.get('/afiliadoNpn', validateLogin, getAfiliado);

export default route;
