import { Request, Response } from 'express';
import { usuarios, Iusuario } from '../models/authUsers.model';
import { Auth, AuthMovil } from '../../helpers/jwt';
import { getMenu } from '../../helpers/menu-role';
import { votoPersona } from '../../util/votosPersonas';

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
          } else if (userExist.role === 'user-resp') {
               res.status(200).json({
                    ok: false,
                    msg: 'El responsable de la planilla ya se encuentra asignado al referente seleccionado',
               });
          } else if (userExist.role === 'user-coord') {
               res.status(200).json({
                    ok: false,
                    msg: 'El usuario seleccionado es coordinador',
               });
          } else {
               res.status(200).json({
                    ok: false,
                    msg: 'El usuario para la app Movil ya existe',
               });
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
     // console.log(user);

     if (!user) {
          return res.status(400).json({ msg: 'El usuario ingresado, no esta asociado a un usuario activo' });
     }

     const isMatch = await user.comparePassword(req.body.password);

     if (isMatch) {
          //console.log(isMatch);
          if (user.role === 'app-movil') {
               user.lastLogin = moment().format('YYYY/MM/DD;HH:MM');
               await user.save();
               const menu = await getMenu(user.role);
               return res.status(200).json({
                    ok: true,
                    token: AuthMovil.tokenAPP(user, menu),
               });
          } else {
               user.lastLogin = moment().format('YYYY/MM/DD;HH:MM');
               await user.save();
               const menu = await getMenu(user.role);
               return res.status(200).json({
                    ok: true,
                    foto: user.datosPersonales.foto,
                    token: Auth.generarToken(user, menu),
               });
          }
     }
     return res.status(400).json({
          msg: 'El password ingresado es incorrecto',
     });
};

export const renewToken = async (req: Request, res: Response) => {
     //  console.log('req', req.user);
     let user: any = await usuarios.findById(req.body.id.id);
     //console.log(`req.body`, req.body)
     if (user !== null) {
          user.lastLogin = moment().format('YYYY/MM/DD;HH:MM');
          await user.save();
          const menu = await getMenu(user.role);
          return res.status(200).json({
               ok: true,
               token: AuthMovil.tokenAPP(user, menu),
          });
     } else {
          return res.status(200).json({
               ok: false,
          });
     }
};

export const getUsuarios = async (req: Request, res: Response) => {
     await usuarios.find({}, (err, data) => {
          if (err) {
               res.status(204).json({
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
                    idCoordinador: res.idCoordinador,
                    idReferente: res.idReferente,
                    datosPersonales: {
                         nombres: res.datosPersonales.nombres,
                         apellido: res.datosPersonales.apellido,
                         dni: res.datosPersonales.dni,
                         telefono: res.datosPersonales.telefono,
                         email: res.datosPersonales.email,
                         localidad: res.datosPersonales.localidad,
                         foto: res.datosPersonales.foto,
                         areaResponsable: res.datosPersonales.areaResponsable,
                    },
               });
          }
          res.status(200).json({
               ok: true,
               resp,
          });

          /* setTimeout(() => {
         res.status(200).json({
            ok: true,
            resp,
         });
      }, 3000); */
     });
};

export const getUserByID = async (req: Request, res: Response) => {
     const resplanilla: any = await usuarios.find({ idReferente: req.query.id });

     const resp = [];

     for (let data of resplanilla) {
          resp.push({
               _id: data._id,
               role: data.role,
               idCoordinador: data.idCoordinador,
               idReferente: data.idReferente,
               nombres: data.datosPersonales.nombres,
               apellido: data.datosPersonales.apellido,
               dni: data.datosPersonales.dni,
               telefono: data.datosPersonales.telefono,
               email: data.datosPersonales.email,
               localidad: data.datosPersonales.localidad,
               areaResponsable: data.datosPersonales.areaResponsable,
          });
     }
     // console.log('data', resp);
     res.status(200).json({
          ok: true,
          resp,
     });
};
//Estadistica
export const getUsuariosGraf = async (req: Request, res: Response) => {
     await usuarios.find({}, (err, data) => {
          if (err) {
               res.status(300).json({
                    ok: false,
                    err,
               });
          }
          const resp = [];
          let coordinadores = 0;
          let responsables = 0;
          let referentes = 0;
          for (let res of data) {
               if (res.role === 'user-coord') {
                    coordinadores++;
               } else {
                    if (res.role === 'user-ref') {
                         referentes++;
                    } else {
                         responsables++;
                    }
               }
          }
          res.status(200).json({
               ok: true,
               coordinadores,
               referentes,
               responsables,
          });

          /* setTimeout(() => {
         res.status(200).json({
            ok: true,
            resp,
         });
      }, 3000); */
     });
};

///referentesCardsss

export const getUserRef = async (req: Request, res: Response) => {
     //console.log(req.query);

     let total: any = [];

     let resp = await usuarios.find(
          { idCoordinador: req.query.id, role: 'user-ref' },
          {
               __v: 0,
               activo: 0,
               createdAt: 0,
               updatedAt: 0,
               password: 0,
               usuario: 0,
               fechaAltaUsuario: 0,
               fechaBajaUsuario: 0,
               lastLogin: 0,
               'datosPersonales.dni': 0,
               'datosPersonales.email': 0,
               'datosPersonales.calle': 0,
               'datosPersonales.numero': 0,
               'datosPersonales.provincia': 0,
          }
     );
     total = await calcTotales(resp);
     res.status(200).json({
          ok: true,
          resp,
          total,
     });
};
export const getUserResP = async (req: Request, res: Response) => {
     //console.log(req.query);
     let total: any = [];
     let resp: any = await usuarios.find(
          { idReferente: req.query.id, role: 'user-resp' },
          {
               __v: 0,
               activo: 0,
               createdAt: 0,
               updatedAt: 0,
               password: 0,
               usuario: 0,
               fechaAltaUsuario: 0,
               fechaBajaUsuario: 0,
               lastLogin: 0,
               'datosPersonales.email': 0,
               'datosPersonales.calle': 0,
               'datosPersonales.numero': 0,
               'datosPersonales.provincia': 0,
          }
     );

     total = await calcTotales(resp);

     // console.log(resp);
     res.status(200).json({
          ok: true,
          resp,
          total,
     });
};
export const getUserPlanillero = async (req: Request, res: Response) => {
     //console.log(req.query);
     let total: any = [];
     let resp = await usuarios.find(
          { _id: req.query.id },
          {
               __v: 0,
               activo: 0,
               createdAt: 0,
               updatedAt: 0,
               password: 0,
               usuario: 0,
               fechaAltaUsuario: 0,
               fechaBajaUsuario: 0,
               lastLogin: 0,
               'datosPersonales.dni': 0,
               'datosPersonales.email': 0,
               'datosPersonales.calle': 0,
               'datosPersonales.numero': 0,
               'datosPersonales.provincia': 0,
          }
     );
     total = await calcTotales(resp);

     // console.log(resp);
     res.status(200).json({
          ok: true,
          resp,
          total,
     });
};

const calcTotales = async (data) => {
     let totales = [];
     for (let usr of data) {
          let data = await votoPersona.findOne({ dni: usr.datosPersonales.dni }, { votos: 1, votaron: 1 });
          // console.log(data);
          if (data !== null) {
               let votosUs = {
                    idUs: usr._id,
                    votosAdhesion: data.votos,
                    votosEfectuados: data.votaron,
                    votosFaltantes: data.votos - data.votaron,
               };
               totales.push(votosUs);
          }
     }

     return totales;
};
