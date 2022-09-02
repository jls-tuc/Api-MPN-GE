import { Router } from 'express';
import cache from '../../../middlewares/cache';
import { validateLogin } from '../../../middlewares/passport-jwt';
import { getAfiliados, getListados, getMigrarArchivo } from '../../controllers/afiliaciones/padronmpn.controllers';

const router = Router();

router.get('/afiliaciones/afiliadosMPN', validateLogin, cache, getAfiliados);
router.get('/afiliaciones/migrar_archivo', validateLogin, cache, getMigrarArchivo);

router.get('/afiliaciones/listados_afiliados', validateLogin, cache, getListados);

export default router;
