import { Router } from 'express';
import { validateLogin } from '../../middlewares/passport-jwt';
import { /* actualizar, */ actualizarVoto, geoVoto, nuevoVoto, usrConVotos, votosNQN } from './actualizarVotos';
import { crearCapa } from './padronNuevo';

const router = Router();

router.post('/script/actualizarVoto', actualizarVoto); //Busca la informacion en el array de votos y verifica el idCoordinador, si falta lo agrega
//router.post('/script/actualizar', actualizar); //Verifica si el el usuario ref tiene el id del Coordinador, si falta lo agrega
router.post('/script/votoadh', crearCapa);
router.post('/script/listado', usrConVotos);
router.post('/script/geoEsc', geoVoto);
router.post('/script/votoAd', nuevoVoto);
router.post('/script/votoNqn', votosNQN);

export default router;
