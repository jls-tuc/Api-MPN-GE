import { Request, Response } from 'express';
import { usuarios, Iusuario } from '../models/authUsers.model';
import { Auth } from '../../helpers/jwt';
import { validateLogin } from '../../middlewares/passport-jwt';
const bcrypt = require('bcrypt');

const moment = require('moment');

export const registro = async (req: Request, res: Response, next) => {
   console.log('ENTRRROOO');
   moment.locale('es');
   req.body.fechaAltaUsuario = moment().format('YYYY/MM/DD');

   if (!req.body.usuario || !req.body.password) {
      return res.status(400).json({ msg: 'Es necesario el usuario y el password para realizar iniciar secion' });
   }

   const userExist = await usuarios.findOne({ usuario: req.body.usuiaro });
   if (userExist) return res.status(400).json('El usuario ya existe');

   const user: Iusuario = new usuarios(req.body);
   await user.save();
   return res.status(200).json({
      ok: true,
      user,
   });

   //token
};

export const login = async (req: Request, res: Response): Promise<Response> => {
   moment.locale('es');

   if (!req.body.usuario || !req.body.password) {
      return res.status(400).json({ msg: 'Es necesario el usuario y el password para iniciar secion' });
   }

   const user: Iusuario = await usuarios.findOne({ usuario: req.body.usuario });

   if (!user) {
      return res.status(400).json({ msg: 'El usuario ingresado, no esta asociado a un usuario activo' });
   }
   const isMatch = await user.comparePassword(req.body.password);

   if (isMatch) {
      user.lastLogin = moment().format('YYYY/MM/DD;HH:MM');

      await user.save();
      return res.status(200).json({
         ok: true,
         token: Auth.generarToken(user),
      });
   }
   return res.status(400).json({
      msg: 'El password ingresado es incorrecto',
   });
};

export const renewToken = async (req, res: Response) => {
   console.log('req', req.user);
};
