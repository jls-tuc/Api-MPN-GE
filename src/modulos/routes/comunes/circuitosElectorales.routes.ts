import { Router } from 'express';
import { getAllCircuitos } from '../../controllers/comunes/circuitoElectoralPoligono.controlles';

const router = Router();

router.get('/geo/circuitosElectorales', getAllCircuitos);

export default router;
