import { Router } from 'express';
import { validateLogin } from '../../../middlewares/passport-jwt';
import { getAfiliados, getListados, getMigrarArchivo, getMigrarArchivoPadron } from '../../controllers/afiliaciones/padronmpn.controllers';

const router = Router();


router.get('/afiliaciones/afiliadosMPN', getAfiliados);
router.get('/afiliaciones/migrar_archivo', getMigrarArchivo);
router.get('/afiliaciones/migrar_archivo2', getMigrarArchivoPadron);
router.get('/afiliaciones/migrar_archivo2', getMigrarArchivoPadron);
router.get('/afiliaciones/listados_afiliados', getListados);

export default router;