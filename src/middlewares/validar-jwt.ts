import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import passport from 'passport';
import { usuarios } from '../Auth/models/authUsers.model';
const JWTKEY = process.env.JWTKEY;
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), ///en postman agregar en el header AuthHeader y en el Setting agregar el Bearer
  secretOrKey: `${JWTKEY}`,
};

export const validateLogin = passport.authenticate('jwt', { session: false });

export default new Strategy(opts, async (payload, done) => {
  console.log(payload);
  try {
    const user = await usuarios.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    console.log(error);
  }
});

/* export const validarJwt = (req, res, next) => {
  const token = req.header('Bearer');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'El token es necesario',
    });
  }
  try {
    console.log('token OK');
    jwt.verify(token, process.env.JWTKEY);
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token Incorrecto',
    });
  }
}; */
