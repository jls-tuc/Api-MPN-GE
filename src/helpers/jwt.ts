import jwt from 'jsonwebtoken';
import { Iusuario } from '../Auth/models/authUsers.model';

const JWTKEY = process.env.JWTKEY;

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
    const payload = {
      id: user.id,
      datosPersonales: user.datosPersonales,
      datosElectorales: user.datosElectoral,
      role: user.role,
    };

    return jwt.sign(payload, `${JWTKEY}`, {
      expiresIn: this.expiresIn,
    });
  }
}
