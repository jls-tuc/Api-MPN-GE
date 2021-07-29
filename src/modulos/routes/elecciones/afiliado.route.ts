import { Router } from 'express';
import { getAfiliado } from '../../controllers/elecciones/afiliados.controllers';
import passport from 'passport';
const route = Router();

route.get('/afiliadoNpn', passport.authenticate('jwt', { session: false }), getAfiliado);

export default route;
