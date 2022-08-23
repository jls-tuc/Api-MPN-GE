import { Router } from 'express';
import cache from '../../../middlewares/cache';
import { validateLogin } from '../../../middlewares/passport-jwt';
import {
     addAfiliadoGrupo,
     getAllGrupos,
     getDataLotes,
     getOneLte,
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
//getOneLote
router.get('/afiliaciones/grupo', validateLogin, getOneLte);
//
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
//router.post('/afiliaciones/exportar_excel', exportarPlanillasEcxel);
// migrar
router.get('/afiliaciones/migrar_lotes', validateLogin, migrarLotes);
router.get('/afiliaciones/migrar_fichas', validateLogin, migrarFichas);

export default router;
