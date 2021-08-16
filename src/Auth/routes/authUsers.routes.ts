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
} from '../controllers/authUsers.controller';

const route = Router();

route.post('/auth/registro', validateLogin, registro);
route.post('/auth/login', login);
route.get('/auth/renew', validateLogin, renewToken);
route.get('/auth/usuarios', validateLogin, getUsuarios);
route.get('/estadistica/graficagral', validateLogin, getUsuariosGraf);
route.get('/auth/usuario', validateLogin, getUserByID);

export default route;
