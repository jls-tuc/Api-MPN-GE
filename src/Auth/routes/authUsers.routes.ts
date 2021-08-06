import { Router } from 'express';
import passport from 'passport';
import cache from '../../middlewares/cache';
import { validateLogin } from '../../middlewares/passport-jwt';
import { registro, login, renewToken, getUsuarios, getUserByID } from '../controllers/authUsers.controller';

const route = Router();

route.post('/auth/registro', registro);
route.post('/auth/login', login);
route.get('/auth/renew', validateLogin, cache, renewToken);
route.get('/auth/usuarios', validateLogin, cache, getUsuarios);
route.get('/auth/usuario', validateLogin, cache, getUserByID);

export default route;
