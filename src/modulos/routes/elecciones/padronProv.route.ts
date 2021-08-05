import { Router } from 'express';
import { getPerPadron } from '../../controllers/elecciones/padronProv';
import passport from 'passport';

const route = Router();

route.get('/padronProv', passport.authenticate('jwt', { session: false }), getPerPadron);

export default route;
