import { Router } from 'express';
import { validateLogin } from '../../../middlewares/passport-jwt';
import {
     addAfiliadoGrupo,
     exportarPlanillasEcxel,
     getAllGrupos,
     getDataLotes,
     getPlanillasLotes,
     migrarFichas,
     migrarLotes,
     presentarLteAndCne,
     saveGrupo,
     searchAfiliadoGrupo,
     updGrupo,
     updPlanilla,
} from '../../controllers/afiliaciones/afiliaciones.controllers';

const router = Router();

router.get('/afiliaciones/grupos', validateLogin, getAllGrupos);

router.post('/afiliaciones/grupo', validateLogin, saveGrupo);
router.post('/afiliaciones/afilia/:nroLote', validateLogin, addAfiliadoGrupo);
router.post('/afiliaciones/grupo/dni', validateLogin, searchAfiliadoGrupo);
router.patch('/afiliaciones/grupo/:_id', validateLogin, updGrupo);
router.patch('/afiliaciones/presentacion/:_id', validateLogin, presentarLteAndCne);
router.patch('/afiliaciones/updPlanilla/:_nroLte', validateLogin, updPlanilla);
// indicador
router.get('/afiliaciones/indica', validateLogin, getDataLotes);

//planillas

router.post('/afiliaciones/planillas', validateLogin, getPlanillasLotes);
router.post('/afiliaciones/exportar_excel', exportarPlanillasEcxel);
// migrar
router.get('/afiliaciones/migrar_lotes', migrarLotes);
router.get('/afiliaciones/migrar_fichas', migrarFichas);

export default router;
