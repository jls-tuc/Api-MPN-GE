import { Router } from 'express';
import { getPerPadron } from '../../controllers/elecciones/padronNeuquen.controllers';

const route = Router();

route.get('/padronNqn', getPerPadron);

export default route;
