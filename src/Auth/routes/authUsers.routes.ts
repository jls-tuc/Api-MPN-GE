import { Router } from 'express';
import passport from 'passport';
import { validateLogin } from '../../middlewares/passport-jwt';
import { registro, login, renewToken, getUsuarios } from '../controllers/authUsers.controller';

const route = Router();

route.post('/auth/registro', registro);
route.post('/auth/login', login);
route.get('/auth/renew', validateLogin, renewToken);
route.get('/auth/usuarios', validateLogin, getUsuarios);

export default route;
