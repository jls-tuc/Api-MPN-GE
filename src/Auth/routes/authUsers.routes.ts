import { Router } from 'express';
import { registro, login } from '../controllers/authUsers.controller';

const route = Router();

route.post('/auth/registro', registro);
route.post('/auth/login', login);

export default route;
