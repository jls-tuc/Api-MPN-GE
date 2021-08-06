import { Router } from 'express';
import { getPerPadron } from '../../controllers/elecciones/padronProv';

import { validateLogin } from '../../../middlewares/passport-jwt';

const route = Router();

route.get('/padronProv', validateLogin, getPerPadron);

export default route;
