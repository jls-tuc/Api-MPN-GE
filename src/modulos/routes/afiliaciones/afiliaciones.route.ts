import { Router } from 'express';
import { validateLogin } from '../../../middlewares/passport-jwt';
import {
     addAfiliadoGrupo,
     getAllGrupos,
     getDataLotes,
     presentarLteAndCne,
     saveGrupo,
     searchAfiliadoGrupo,
     updGrupo,
} from '../../controllers/afiliaciones/afiliaciones.controllers';

const router = Router();

router.get('/afiliaciones/grupos', validateLogin, getAllGrupos);
router.post('/afiliaciones/grupo', validateLogin, saveGrupo);
router.post('/afiliaciones/afilia/:nroLote', validateLogin, addAfiliadoGrupo);
router.post('/afiliaciones/grupo/dni', validateLogin, searchAfiliadoGrupo);
router.patch('/afiliaciones/grupo/:_id', validateLogin, updGrupo);
router.patch('/afiliaciones/presentacion/:_id', validateLogin, presentarLteAndCne);
// indicador

router.get('/afiliaciones/indica', validateLogin, getDataLotes);

export default router;
