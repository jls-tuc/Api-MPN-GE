import jwt from 'jsonwebtoken';
import { Iusuario } from '../Auth/models/authUsers.model';
import dotenv from 'dotenv';
dotenv.config();

const JWTKEY = process.env.TOKEN;

export class Auth {
   /**
    *  TTL JWT Token
    *  @var expiresIn {number}
    *
    * @memberOf Auth
    */

   static expiresIn = 60 * 60 * 24 * 2; /* 2 días */

   // Crea el token con los datos de sesión

   static generarToken(user: Iusuario) {
      let { nombres, apellido, localidad, email, telefono, areaResponsable } = user.datosPersonales;

      const payload = {
         id: user.id,
         nombres,
         apellido,
         localidad,
         email,
         telefono,
         areaResponsable,
         role: user.role,
      };

      return jwt.sign(payload, `${JWTKEY}`, {
         expiresIn: this.expiresIn,
      });
   }
}
