import { Router } from 'express';
import passport from 'passport';
import cache from '../../middlewares/cache';
import { validateLogin } from '../../middlewares/passport-jwt';
import {
     registro,
     login,
     renewToken,
     getUsuarios,
     getUserByID,
     getUsuariosGraf,
     getUserRef,
     getUserResP,
     getUserPlanillero,
     getAllUsr,
     getOneUsrByDni,
} from '../controllers/authUsers.controller';

const route = Router();

route.post('/auth/registro', registro);
route.post('/auth/login', login);
route.post('/auth/renewToken', validateLogin, renewToken);
route.get('/auth/usuarios', validateLogin, cache, getUsuarios);
route.get('/auth/usr', validateLogin, cache, getAllUsr);
route.get('/estadistica/graficagral', validateLogin, getUsuariosGraf);
route.get('/auth/usuario', validateLogin, getUserByID);
route.get('/auth/getUsr', validateLogin, getOneUsrByDni);
/////////router CardddReff
route.get('/cards/ref', validateLogin, getUserRef);
route.get('/cards/resp', validateLogin, getUserResP);
route.get('/cards/planilla', validateLogin, getUserPlanillero);

export default route;
