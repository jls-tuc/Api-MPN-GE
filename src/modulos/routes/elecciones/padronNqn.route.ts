import { Router } from 'express';
import { getPerPadron } from '../../controllers/elecciones/padronNeuquen.controllers';
import passport from 'passport';

const route = Router();

route.get('/padronNqn', passport.authenticate('jwt', { session: false }), getPerPadron);

export default route;
