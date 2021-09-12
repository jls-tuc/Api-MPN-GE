import { Router } from 'express';
import cache from '../../../middlewares/cache';
import { validateLogin } from '../../../middlewares/passport-jwt';

import {
   guardarVoto,
   getvotos,
   getOneVoto,
   cargarVoto,
   getvotosuser,
   getvotosFaltan,
} from '../../controllers/elecciones/votoAdhesion.controllers';

const router = Router();

router.post('/votoAdh', validateLogin, guardarVoto);
router.post('/votoGraf', validateLogin, cargarVoto);
router.get('/votoAdh/id', validateLogin, getvotos);
router.get('/votoAdh/idf', validateLogin, getvotosFaltan);
router.get('/votoAdh/idu', validateLogin, getvotosuser);
router.get('/votoAdh/dni', validateLogin, getOneVoto);
export default router;
