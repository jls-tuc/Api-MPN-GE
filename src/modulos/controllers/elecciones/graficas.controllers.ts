import { Request, Response } from 'express';
import { afiliado } from '../../models/elecciones/afiliadosMpn';
import { votosGraf } from '../../models/elecciones/totalVotos';

import { usuarios } from '../../../Auth/models/authUsers.model';
import { buscarDatos } from '../../../util/funcionesGetRecalc';
import { votoAdh } from '../../models/elecciones/votoAdhesion';

export const getRecalculando = async (req: Request, res: Response) => {
     let votos = await votoAdh.find().lean();
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
/* export const getCalculoTotal = async (req: Request, res: Response) => {
     console.log(`req`, req);
     let totales: any = await votosGraf.find().lean();
     let usuariosTot = await usuarios.find().lean();
     let total = await votoAdh.find({}, { role: 1 }).lean();
     let totalDNI = total.length;

     let data: any = [];
     for (let usuario of usuariosTot) {
          if (usuario.role === 'user-sys' || usuario.role === 'user-calc' || usuario.role === 'app-movil') {
               //   console.log(`El Usuario es: `, usuario._id, " : ", usuario.datosPersonales.apellido, " ", usuario.datosPersonales.nombres)
          } else {
               let encontro = 0;
               for (let usuarioVoto of totales) {
                    let id = usuario._id.toString();
                    if (id === usuarioVoto.idUsuario) {
                         encontro++;
                         let totalnoafiliados = usuarioVoto.votos - usuarioVoto.afiliado;
                         let promedio;
                         if (usuarioVoto.votos === 0) {
                              promedio = 0;
                         } else {
                              promedio = Math.trunc((usuarioVoto.afiliado * 100) / usuarioVoto.votos);
                         }

                         data.push({
                              organizacion: usuario.datosPersonales.areaResponsable,
                              nombrecompleto: usuario.datosPersonales.apellido + ' ' + usuario.datosPersonales.nombres,
                              coordinador: usuarioVoto.coordinador,
                              role: usuarioVoto.role,
                              totalafiliados: usuarioVoto.afiliado,
                              totalnoafiliados: totalnoafiliados,
                              totalvotos: usuarioVoto.votos,
                              votaron: promedio,
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
}; */
export const getCalculoEleccion = async (req: Request, res: Response) => {
     //console.log(`req.body`, req.body)
     let usuariosTot: any;
     let totalCoord: any;
     let votosCoord = 0;
     let data: any = [];
     let totalafiliados = 0;
     let totalnoafiliados = 0;
     let votaron = 0;
     let votaronA = 0;
     let votaronNA = 0;
     let votaronF = 0;
     let votaronM = 0;
     let porcentaje = 0;
     /* let id: any = { id: '6113d7f18b3c1e0fec1154dd' }; */
     if (req.body.usuario === 'user-sys' || req.body.usuario === 'user-calc') {
          usuariosTot = await usuarios.find({ role: 'user-coord' }, { 'datosPersonales.foto': 0 }).lean();
          //console.log(`usuariosTot`, usuariosTot)
     } else {
          totalCoord = await votoAdh
               .find({
                    'resPlanilla.idCoordinador': req.body.id,
               })
               .lean();
          for (let dato of totalCoord) {
               for (let res of dato.resPlanilla) {
                    if (res.idCoordinador === req.body.id && res.idReferente === '' && res.idResPlanilla === '') {
                         votosCoord++;
                         if (dato.afiliado === 'Es afiliado al MPN') {
                              totalafiliados++;
                         } else {
                              totalnoafiliados++;
                         }
                         if (dato.realizoVoto === 'si') {
                              votaron++;
                              votaronA++;
                              if (dato.genero === 'F') {
                                   votaronF++;
                              } else {
                                   votaronM++;
                              }
                              if (dato.afiliado === 'Es afiliado al MPN') {
                                   votaronA++;
                              } else {
                                   votaronNA++;
                              }
                         }
                    }
               }
          }
          let usuario: any = await usuarios.findOne({ _id: req.body.id }, { 'datosPersonales.foto': 0 }).lean();
          //console.log(`Usuario `, usuario)
          let porcentaje;
          if (totalCoord.votos === 0) {
               porcentaje = 0;
          } else {
               porcentaje = Number(((totalCoord.votaron * 100) / totalCoord.votos).toFixed(2));
          }
          let dataTemp = {
               organizacion: usuario.datosPersonales.areaResponsable,
               nombrecompleto: usuario.datosPersonales.apellido + ' ' + usuario.datosPersonales.nombres,
               coordinador: '',
               role: usuario.role,
               totalafiliados: totalafiliados,
               totalnoafiliados: totalnoafiliados,
               totalvotos: votosCoord,
               votaron: votaron,
               votaronA: votaronA,
               votaronNA: votaronNA,
               votaronF: votaronF,
               votaronM: votaronM,
               porcentaje: porcentaje,
               id: totalCoord.idUsuario,
          };
          await data.push(dataTemp);
          //console.log(`data`, data)
          usuariosTot = await usuarios.find({ idCoordinador: req.body.id }, { 'datosPersonales.foto': 0 }).lean();
     }
     let totales: any = await votosGraf.find({}).lean();
     let total: any = await votoAdh.find({}, { role: 1 }).lean();
     let totalDNI = total.length;

     for (let usuario of usuariosTot) {
          if (usuario.role === 'user-sys' || usuario.role === 'user-calc') {
               let encontro = 0;
               for (let usuarioVoto of totales) {
                    let id = usuario._id.toString();
                    if (id === usuarioVoto.idUsuario) {
                         encontro++;
                         let totalnoafiliados = usuarioVoto.votos - usuarioVoto.afiliado;
                         let porcentaje;
                         if (usuarioVoto.votos === 0) {
                              porcentaje = 0;
                         } else {
                              porcentaje = Number(((usuarioVoto.votaron * 100) / usuarioVoto.votos).toFixed(2));
                         }
                         await data.push({
                              organizacion: usuario.datosPersonales.areaResponsable,
                              nombrecompleto: usuario.datosPersonales.apellido + ' ' + usuario.datosPersonales.nombres,
                              coordinador: usuarioVoto.coordinador,
                              role: usuarioVoto.role,
                              totalafiliados: usuarioVoto.afiliado,
                              totalnoafiliados: totalnoafiliados,
                              totalvotos: usuarioVoto.votos,
                              votaron: usuarioVoto.votaron,
                              votaronA: usuarioVoto.votaronA,
                              votaronNA: usuarioVoto.votaron - usuarioVoto.votaronA,
                              votaronF: usuarioVoto.votaronF,
                              votaronM: usuarioVoto.votaron - usuarioVoto.votaronF,
                              porcentaje: porcentaje,
                              id: usuarioVoto.idUsuario,
                         });
                    }
               }
               if (encontro === 0) {
                    let id = usuario._id.toString();
                    await data.push({
                         organizacion: usuario.datosPersonales.areaResponsable,
                         nombrecompleto: usuario.datosPersonales.apellido + ' ' + usuario.datosPersonales.nombres,
                         role: usuario.role,
                         totalafiliados: 0,
                         totalnoafiliados: 0,
                         totalvotos: 0,
                         id: id,
                    });
               }
          } else {
               let encontro = 0;
               for (let usuarioVoto of totales) {
                    let id = usuario._id.toString();
                    if (id === usuarioVoto.idUsuario) {
                         encontro++;
                         let totalnoafiliados = usuarioVoto.votos - usuarioVoto.afiliado;
                         let porcentaje;
                         if (usuarioVoto.votos === 0) {
                              porcentaje = 0;
                         } else {
                              porcentaje = Number(((usuarioVoto.votaron * 100) / usuarioVoto.votos).toFixed(2));
                         }

                         await data.push({
                              organizacion: usuario.datosPersonales.areaResponsable,
                              nombrecompleto: usuario.datosPersonales.apellido + ' ' + usuario.datosPersonales.nombres,
                              coordinador: usuarioVoto.coordinador,
                              role: usuarioVoto.role,
                              totalafiliados: usuarioVoto.afiliado,
                              totalnoafiliados: totalnoafiliados,
                              totalvotos: usuarioVoto.votos,
                              votaron: usuarioVoto.votaron,
                              votaronA: usuarioVoto.votaronA,
                              votaronNA: usuarioVoto.votaron - usuarioVoto.votaronA,
                              votaronF: usuarioVoto.votaronF,
                              votaronM: usuarioVoto.votaron - usuarioVoto.votaronF,
                              porcentaje: porcentaje,
                              id: usuarioVoto.idUsuario,
                         });
                    }
               }
               if (encontro === 0) {
                    let id = usuario._id.toString();
                    await data.push({
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
     //  console.log(req.body.usr);
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
     let usuariosTot = await usuarios.find({}, { role: 1, 'datosPersonales.foto': 0 }).lean();
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
          referentes = (await usuarios.find({ role: 'user-ref' }, { role: 1 }).lean()).length;
          responsables = (await usuarios.find({ role: 'user-resp' }, { role: 1 }).lean()).length;
          coordinadores = (await usuarios.find({ role: 'user-coord' }, { role: 1 }).lean()).length;
          //  console.log(`coordinadores`, coordinadores);
          await votosGraf.find({ role: 'user-coord' }, (err, coord: any) => {
               for (let voto of coord) {
                    votosTotal = votosTotal + voto.votos;
                    afiliados = afiliados + voto.afiliado;
                    femenino = femenino + voto.femenino;
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
export const getvotosGraficaEleccion = async (req: Request, res: Response) => {
     //console.log(`req.body`, req.body.data)
     let usuariosTot = await usuarios.find({}, { role: 1 }).lean();
     let votosTotal = 0;
     let afiliados = 0;
     let femenino = 0;
     let masculino = 0;
     let noafiliados = 0;
     let referentes = 0;
     let coordinadores = 0;
     let responsables = 0;
     let votaron = 0;
     let votaronA = 0;
     let votaronNA = 0;
     let votaronM = 0;
     let votaronF = 0;
     let porcentaje = 0;
     let porTemp = 0;
     let id;
     if (req.body.role === 'user-sys' || req.body.role === 'user-calc') {
          /* referentes = await (await usuarios.find({ role: 'user-ref' }, { role: 1 }).lean()).length;
          responsables = await (await usuarios.find({ role: 'user-resp' }, { role: 1 }).lean()).length;
          coordinadores = await (await usuarios.find({ role: 'user-coord' }, { role: 1 }).lean()).length; */
          //  console.log(`coordinadores`, coordinadores);
          votosTotal = await (await votoAdh.find({}, { role: 1 }).lean()).length;
          votaron = await (await votoAdh.find({ realizoVoto: 'si' }, { role: 1 }).lean()).length;

          if (votaron === null) {
               votaron = 0;
               porcentaje = 0;
          } else {
               porcentaje = Number(((votaron * 100) / votosTotal).toFixed(2));
          }
          res.status(200).json({
               ok: true,
               votosTotal,
               votaron,
               porcentaje,
          });
     } else {
          await votosGraf.find({ coordinador: req.body.id }, async (err, ref: any) => {
               let votos: any;

               let datosRef = await votoAdh.find({ 'resPlanilla.idCoordinador': req.body.id }).lean();

               if (datosRef.length) {
                    votaron = await devolverVotoRef(datosRef, req.body.id, 'Coord');
               }

               //console.log(votos);
               votosTotal = datosRef.length;

               if (votaron === null) {
                    votaron = 0;
                    porcentaje = 0;
               } else {
                    porcentaje = Number(((votaron * 100) / votosTotal).toFixed(2));
               }

               res.status(200).json({
                    ok: true,
                    votosTotal,
                    votaron,
                    porcentaje,
               });
          });
     }
};
const devolverVotoRef = async (data: any, id: any, role: any) => {
     let voto = 0;

     for (let dato of data) {
          if (dato.realizoVoto === 'si') {
               voto++;
          }
     }
     return voto;
};
