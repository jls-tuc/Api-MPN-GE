import { Request, Response } from 'express';
import { usuarios, Iusuario } from '../models/authUsers.model';
import { Auth } from '../../helpers/jwt';

const moment = require('moment');

export const registro = async (req: Request, res: Response, next) => {
   req.body.fechaAltaUsuario = moment().format('YYYY/MM/DD');

   const userExist: any = await usuarios.findOne({ usuario: req.body.usuario });
   if (userExist) {
      //pregunto si ya existe un idreferente en el array
      if (userExist.role === 'user-ref') {
         res.status(200).json({
            ok: false,
            msg: 'El referente ya se encuentra cargado',
         });
      } else {
         let idRef = userExist.referentes.filter((data) => data.idReferente === req.body.referentes.idReferente);
         if (idRef.length) {
            res.status(200).json({
               ok: false,
               msg: 'El responsable de la planilla ya se encuentra asignado al referente seleccionado',
            });
         } else {
            userExist.referentes.push(req.body.referentes);
            await userExist.save();
            return res.status(200).json({
               ok: true,
               userExist,
            });
         }
      }
   }

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

export const getUsuarios = async (req: Request, res: Response) => {
   await usuarios.find({}, (err, data) => {
      if (err) {
         res.status(300).json({
            ok: false,
            err,
         });
      }
      const resp = [];

      for (let res of data) {
         resp.push({
            _id: res._id,
            role: res.role,
            activo: res.activo,
            datosPersonales: {
               nombres: res.datosPersonales.nombres,
               apellido: res.datosPersonales.apellido,
               dni: res.datosPersonales.dni,
               telefono: res.datosPersonales.telefono,
               email: res.datosPersonales.email,
               localidad: res.datosPersonales.localidad,
               foto: res.datosPersonales.foto,
            },
            referentes: ([] = res.referentes),
         });
      }
      res.status(200).json({
         ok: true,
         resp,
      });
   });
   /*  setTimeout(() => {
         res.status(200).json({
            ok: true,
            resp,
         });
      }, 3000);
   }); */
};

export const getUserByID = async (req: Request, res: Response) => {
   //console.log('REQQ', req.query.id);
   const resplanilla: any = await usuarios.find({ 'referentes.idReferente': req.query.id });

   const resp = [];

   for (let data of resplanilla) {
      resp.push({
         _id: data._id,
         role: data.role,
         datosPersonales: {
            nombres: data.datosPersonales.nombres,
            apellido: data.datosPersonales.apellido,
            dni: data.datosPersonales.dni,
            telefono: data.datosPersonales.telefono,
            email: data.datosPersonales.email,
            localidad: data.datosPersonales.localidad,
         },
         referentes: ([] = data.referentes),
      });
   }
   // console.log('data', resp);

   res.status(200).json({
      ok: true,
      resp,
   });
};
