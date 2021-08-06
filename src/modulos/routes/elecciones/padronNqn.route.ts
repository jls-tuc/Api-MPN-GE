import { Router } from 'express';
import { getPerPadron } from '../../controllers/elecciones/padronNeuquen.controllers';

import { validateLogin } from '../../../middlewares/passport-jwt';

const route = Router();

route.get('/padronNqn', validateLogin, getPerPadron);

export default route;
