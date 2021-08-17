import { Request, Response } from 'express';
import { afiliado } from '../../models/elecciones/afiliadosMpn';
import { votosGraf } from '../../models/elecciones/totalVotos';
import { votoProv } from '../../models/elecciones/votoProvisorio';
import { usuarios } from '../../../Auth/models/authUsers.model';
import { buscarDatos } from '../../../util/funcionesGetRecalc';

export const getRecalculando = async (req: Request, res: Response) => {
   let votos = await votoProv.find().lean();
   console.log(`Ya traje el los Votos`);
   let afiliados = await afiliado.find().lean();
   console.log(`Ya traje el los Afiliados`);
   let votosG: any;
   console.log(`Empiezo Rutina`);
   let data = buscarDatos(votos, afiliados);

   return res.status(200).json({
      ok: true,
   });
};
////////////Consutlas de graficas//////////////////////////
export const getCalculoTotal = async (req: Request, res: Response) => {
   // console.log(`req`, req)
   let totales: any = await votosGraf.find().lean();
   let usuariosTot = await usuarios.find().lean();
   let total = await votoProv.find({}, { role: 1 }).lean();
   let totalDNI = total.length;

   let data: any = [];
   for (let usuario of usuariosTot) {
      if (usuario.role === 'user-sys' || usuario.role === 'user-calc') {
         //   console.log(`El Usuario es: `, usuario._id, " : ", usuario.datosPersonales.apellido, " ", usuario.datosPersonales.nombres)
      } else {
         let encontro = 0;
         for (let usuarioVoto of totales) {
            let id = usuario._id.toString();
            if (id === usuarioVoto.idUsuario) {
               encontro++;
               let totalnoafiliados = usuarioVoto.votos - usuarioVoto.afiliado;
               data.push({
                  organizacion: usuario.datosPersonales.areaResponsable,
                  nombrecompleto: usuario.datosPersonales.apellido + ' ' + usuario.datosPersonales.nombres,
                  coordinador: usuarioVoto.coordinador,
                  role: usuarioVoto.role,
                  totalafiliados: usuarioVoto.afiliado,
                  totalnoafiliados: totalnoafiliados,
                  totalvotos: usuarioVoto.votos,
                  id: usuarioVoto.idUsuario,
               });
            }
         }
         if (encontro === 0) {
            let id = usuario._id.toString();
            data.push({
               organizacion: usuario.datosPersonales.areaResponsable,
               nombrecompleto: usuario.datosPersonales.apellido + ' ' + usuario.datosPersonales.nombres,

               role: usuario.role,
               totalafiliados: 0,
               totalnoafiliados: 0,
               totalvotos: 0,
               id: id,
            });
         }
      }
   }
   //console.log(`Ya esta Terminamos!!!`)
   res.status(200).json({
      ok: true,
      data,
      totalDNI,
   });
};
export const getCalculoTotalCoord = async (req: Request, res: Response) => {
   let usuariosTot;
   let totalesRef = await votosGraf.find({ coordinador: req.body.usr.id }).lean();

   let data: any = [];
   usuariosTot = await usuarios
      .find(
         { role: 'user-ref', idCoordinador: req.body.usr.id },
         { _id: 1, 'datosPersonales.apellido': 1, 'datosPersonales.nombres': 1 }
      )
      .lean();
   if (usuariosTot.length !== 0) {
      for (let usuario of usuariosTot) {
         let encontro = 0;
         for (let usuarioVoto of totalesRef) {
            let id = usuario._id.toString();
            if (id === usuarioVoto.idUsuario) {
               encontro++;
               let totalnoafiliados = usuarioVoto.votos - usuarioVoto.afiliado;
               data.push({
                  nombrecompleto: usuario.datosPersonales.apellido + ' ' + usuario.datosPersonales.nombres,
                  organizacion: req.body.usr.areaResponsable,
                  totalafiliados: usuarioVoto.afiliado,
                  totalnoafiliados: totalnoafiliados,
                  totalvotos: usuarioVoto.votos,
                  id: usuarioVoto.idUsuario,
               });
            }
         }
         if (encontro === 0) {
            let id = usuario._id.toString();
            data.push({
               nombrecompleto: usuario.datosPersonales.apellido + ' ' + usuario.datosPersonales.nombres,
               organizacion: req.body.usr.areaResponsable,
               totalafiliados: 0,
               totalnoafiliados: 0,
               totalvotos: 0,
               id: id,
            });
         }
      }
   }
   //console.log(`data`, data)
   res.status(200).json({
      ok: true,
      data,
   });
};
export const getCalculoTotalRef = async (req: Request, res: Response) => {
   let usuariosTot;
   let totalesCoord = await votosGraf.find({ referente: req.body.usr.id }).lean();

   let data: any = [];
   usuariosTot = await usuarios
      .find(
         { role: 'user-resp', idReferente: req.body.usr.id },
         { _id: 1, 'datosPersonales.apellido': 1, 'datosPersonales.nombres': 1 }
      )
      .lean();
   if (usuariosTot.length !== 0) {
      for (let usuario of usuariosTot) {
         let encontro = 0;
         for (let usuarioVoto of totalesCoord) {
            let id = usuario._id.toString();
            if (id === usuarioVoto.idUsuario) {
               encontro++;
               let totalnoafiliados = usuarioVoto.votos - usuarioVoto.afiliado;
               data.push({
                  nombrecompleto: usuario.datosPersonales.apellido + ' ' + usuario.datosPersonales.nombres,
                  organizacion: req.body.usr.areaResponsable,
                  totalafiliados: usuarioVoto.afiliado,
                  totalnoafiliados: totalnoafiliados,
                  totalvotos: usuarioVoto.votos,
                  id: usuarioVoto.idUsuario,
               });
            }
         }
         if (encontro === 0) {
            let id = usuario._id.toString();
            data.push({
               nombrecompleto: usuario.datosPersonales.apellido + ' ' + usuario.datosPersonales.nombres,
               organizacion: req.body.usr.areaResponsable,
               totalafiliados: 0,
               totalnoafiliados: 0,
               totalvotos: 0,
               id: id,
            });
         }
      }
   }
   //console.log(`data`, data)
   res.status(200).json({
      ok: true,
      data,
   });
};

export const getvotosGrafica = async (req: Request, res: Response) => {
   //console.log(`req.body`, req.body.data)
   let votosTotal = 0;
   let afiliados = 0;
   let femenino = 0;
   let masculino = 0;
   let noafiliados = 0;
   let referentes = 0;
   let coordinadores = 0;
   let responsables = 0;
   let id;
   if (req.body.role === 'user-sys' || req.body.role === 'user-calc') {
      await votosGraf.find({ role: 'user-ref' }, (err, data: any) => {
         referentes = data.length;
      });

      await votosGraf.find({ role: 'user-resp' }, (err, data: any) => {
         responsables = data.length;
      });

      await votosGraf.find({ role: 'user-coord' }, (err, coord: any) => {
         for (let voto of coord) {
            votosTotal = votosTotal + voto.votos;
            afiliados = afiliados + voto.afiliado;
            femenino = femenino + voto.femenino;
            coordinadores++;
         }
         masculino = votosTotal - femenino;
         noafiliados = votosTotal - afiliados;
         res.status(200).json({
            ok: true,
            votosTotal,
            afiliados,
            femenino,
            masculino,
            noafiliados,
            coordinadores,
            referentes,
            responsables,
         });
      });
   } else {
      await votosGraf.find({ idUsuario: req.body.id }, (err, data: any) => {
         if (err) {
            res.status(400).json({
               ok: false,
               err,
            });
         } else {
            //    console.log(`dataaaaaaaaaaa`, data)
            if (data.length === 0) {
               votosTotal = 0;
               afiliados = 0;
               femenino = 0;
               masculino = 0;
               noafiliados = 0;
               id = req.body.id;
            } else {
               votosTotal = data[0].votos;
               afiliados = data[0].afiliado;
               femenino = data[0].femenino;
               masculino = votosTotal - femenino;
               noafiliados = votosTotal - afiliados;
               id = data[0]._id;
            }

            res.status(200).json({
               ok: true,
               votosTotal,
               afiliados,
               femenino,
               masculino,
               noafiliados,
               id,
            });
         }
      });
   }
};
