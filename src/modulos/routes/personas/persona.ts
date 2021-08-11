import { Router } from 'express';
import cache from '../../../middlewares/cache';
import { getPersonaRenaper } from '../../controllers/personas/persona';
import { validateLogin } from '../../../middlewares/passport-jwt';
const route = Router();
route.get('/persona', validateLogin, getPersonaRenaper);

export default route;
