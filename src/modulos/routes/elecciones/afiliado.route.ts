import { Router } from 'express';
import { getAfiliado } from '../../controllers/elecciones/afiliados.controllers';

const route = Router();

route.get('/afiliadoNpn', getAfiliado);

export default route;
