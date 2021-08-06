import { Router } from 'express';
import cache from '../../../middlewares/cache';
import { getProLoc } from '../../controllers/comunes/provLoca';
import { validateLogin } from '../../../middlewares/passport-jwt';
const route = Router();

route.get('/provLoc', validateLogin, cache, getProLoc);

export default route;
