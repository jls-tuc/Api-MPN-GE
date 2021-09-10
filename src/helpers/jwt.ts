import jwt from 'jsonwebtoken';
import { Iusuario } from '../Auth/models/authUsers.model';
import dotenv from 'dotenv';
dotenv.config();

const JWTKEY = process.env.TOKEN;
const APPTOKEN = process.env.APPTOKEN;

export class Auth {
     /**
      *  TTL JWT Token
      *  @var expiresIn {number}
      *
      * @memberOf Auth
      */

     static expiresIn = 60 * 60 * 5;
     appExpiresIn = 60 * 60 * 1;

     // Crea el token con los datos de sesión

     static generarToken(user: Iusuario, menu: any) {
          let { nombres, apellido, localidad, email, telefono, areaResponsable } = user.datosPersonales;

          const payload = {
               id: user.id,
               idCoordinador: user.idCoordinador,
               idReferente: user.idReferente,
               nombres,
               apellido,
               localidad,
               email,
               telefono,
               areaResponsable,
               role: user.role,
               menu,
          };

          return jwt.sign(payload, `${JWTKEY}`, {
               expiresIn: this.expiresIn,
          });
     }
}
// tslint:disable-next-line: max-classes-per-file
export class AuthMovil {
     /**
      *  TTL JWT Token
      *  @var expiresIn {number}
      *
      * @memberOf Auth
      */

     static appExpiresIn = 60 * 60 * 1;

     // Crea el token con los datos de sesión

     static tokenAPP(user: Iusuario, menu: any) {
          let { nombres, localidad } = user.datosPersonales;

          const payload = {
               id: user.id,
               nombres,
               localidad,
               menu,
               role: user.role,
               usuario: user.usuario,
          };

          return jwt.sign(payload, `${APPTOKEN}`, {
               expiresIn: this.appExpiresIn,
          });
     }
}
