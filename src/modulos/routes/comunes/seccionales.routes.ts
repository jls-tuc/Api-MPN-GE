import { Router } from 'express';
import {
     chCircuito,
     getAll,
     mgSeccionales,
     nrlte,
     scriptSeccionales,
} from '../../controllers/comunes/seccionales.controllers';
import { validateLogin } from '../../../middlewares/passport-jwt';

const router = Router();
//router.get('/scriptSecc', scriptSeccionales);
//router.get('/mgSecc', mgSeccionales);
//router.get('/chCircuito', chCircuito);
//router.get('/afLote', nrlte);
router.get('/getseccionales', validateLogin, getAll);

export default router;
