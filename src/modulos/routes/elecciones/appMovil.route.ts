import { Router } from 'express';
import { validateLogin, validateAppMovilLogin } from '../../../middlewares/passport-jwt';
import { postDatos } from '../../controllers/elecciones/appMovil.controllers';

const router = Router();

router.post('/datosEsc', validateAppMovilLogin, postDatos);

export default router;
