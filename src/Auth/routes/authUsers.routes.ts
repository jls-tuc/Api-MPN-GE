import { Router } from 'express';
import { validateLogin } from '../../middlewares/validar-jwt';
import { registro, login, renewToken } from '../controllers/authUsers.controller';

const route = Router();

route.post('/auth/registro', registro);
route.post('/auth/login', login);
route.get('/auth/renew', validateLogin, renewToken);

export default route;
