import { Router } from 'express';
import { validateLogin } from '../../../../middlewares/passport-jwt';
import { getAllActas, postActa } from '../../../controllers/elecciones/votos-12/actasEscrutino.controlles';
import { grafChasquis, postChasqui } from '../../../controllers/elecciones/votos-12/cargarVotos2022.controllers';

const router = Router();

router.get('/votos-12/getActas', validateLogin, getAllActas);
router.post('/votos-12/postActas', validateLogin, postActa);
router.post('/votos-12/postChasqui', validateLogin, postChasqui);
router.get('/votos-12/indicadorChasqui', validateLogin, grafChasquis);
export default router;
