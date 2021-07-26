import { Router } from 'express';
import { getProLoc } from '../../controllers/comunes/provLoca';

const route = Router();

route.get('/provLoc', getProLoc);

export default route;
