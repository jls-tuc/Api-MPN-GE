import { Router } from 'express';
import { getPersonaRenaper } from '../../controllers/personas/persona';

const route = Router();
route.get('/persona', getPersonaRenaper);

export default route;
