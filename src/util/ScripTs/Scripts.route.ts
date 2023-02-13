import { Router } from 'express';
import { validateLogin } from '../../middlewares/passport-jwt';
//import /* actualizar, */ // actualizarVoto,//  geoVoto,// nuevoVoto,//usrConVotos,//usuariosAppM,//  votosNQN,'./actualizarVotos';
import { migrarNqn, sinLoc, geoVoto, usrConVotos, totales } from './actualizarVotos';
import { dataAfiliado } from './afiliadosMpn';
import { crearActasEscrutinioProv } from './app';
import { actSeccDisc, afCircuitos, circEsc2022, crearCapa, nuevoGeoEsc, votosEsc2022 } from './padronNuevo';

const router = Router();

// router.post('/script/actualizarVoto', actualizarVoto); //Busca la informacion en el array de votos y verifica el idCoordinador, si falta lo agrega
//router.post('/script/actualizar', actualizar); //Verifica si el el usuario ref tiene el id del Coordinador, si falta lo agrega
// router.post('/script/votoadh', crearCapa);
//router.post('/script/listado', usrConVotos);
//router.post('/script/geoEsc', geoVoto);
// router.post('/script/votoAd', nuevoVoto);
// router.post('/script/votoNqn', votosNQN);
// router.post('/script/usr', usuariosAppM);
//router.post('/script/nvoto', migrarNqn);
//router.post('/script/sinLoc', sinLoc);
//router.post('/script/afiliado', dataAfiliado);
//router.get('/script/nEsc', nuevoGeoEsc);
//router.get('/script/cir', afCircuitos);
//router.get('/script/cirEsc', circEsc2022);
//router.get('/script/contVotos', votosEsc2022);
//router.get('/script/totales', totales);
//router.get('/script/appJson', crearActasEscrutinioProv);
router.get('/script/secciones', actSeccDisc);
export default router;
