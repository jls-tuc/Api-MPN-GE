import { Request, Response } from 'express';
import { loteAfiliacion, ILoteAfiliacion } from '../../models/afiliaciones/grupoAfiliacion';
import { afiliado } from '../../models/elecciones/afiliadosMpn';

export const getAllGrupos = async (req: Request, res: Response) => {
     await loteAfiliacion.find({}, (err, data) => {
          if (err) {
               res.status(200).json({ ok: false, err });
          } else {
               res.status(200).json({ ok: true, data });
          }
     });
};

export const saveGrupo = async (req: Request, res: Response) => {
     const data = new loteAfiliacion(req.body.data);
     await data.save((err, data) => {
          if (err) {
               res.status(200).json({ ok: false, err });
          } else {
               loteAfiliacion.find((err, data) => {
                    res.status(200).json({ ok: true, data });
               });
          }
     });
};

export const addAfiliadoGrupo = async (req: Request, res: Response) => {
     await loteAfiliacion.find({ nro: req.params.nroLote }, async (err, data: ILoteAfiliacion) => {
          if (err) {
               res.status(200).json({ ok: false, err });
          } else {
               data[0].planillas.push(req.body.data);
               await data[0].save();
               loteAfiliacion.find((err, data) => {
                    res.status(200).json({ ok: true, data });
               });
          }
     });
};

export const searchAfiliadoGrupo = async (req: Request, res: Response) => {
     await loteAfiliacion.findOne({ 'planillas.documento': req.body.dni }, (err, data) => {
          if (err) {
               res.status(200).json({ ok: false, err });
          } else {
               !data && res.status(200).json({ ok: true, msg: 'sin registros' });
               data && res.status(200).json({ ok: true, data });
          }
     });
};

//////update Grupo

export const updGrupo = (req: Request, res: Response) => {
     let upd: any = {};
     upd.usuarioResponsable = req.body.upd.usuarioResponsable;
     upd.lugarAfiliacion = req.body.upd.lugarAfiliacion;
     upd.fechaInicioAfiliacion = req.body.upd.fechaInicioAfiliacion;
     upd.fechaFinAfiliacion = req.body.upd.fechaFinAfiliacion;
     upd.estadoAfiliacion = req.body.upd.estadoAfiliacion;

     let options = { new: true, omitUndefined: true };

     try {
          loteAfiliacion.findByIdAndUpdate(req.params._id, upd, options, (err, data: ILoteAfiliacion) => {
               if (data) {
                    loteAfiliacion.find((err, data) => {
                         res.status(200).json({ ok: true, data });
                    });
               }
          });
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};

///presentacion de lte

export const presentarLteAndCne = (req: Request, res: Response) => {
     console.log(req.body);
     let updPre: any = {
          estadoAfiliacion: req.body.upd.estadoAfiliacion,
          datosJusElc: {
               fechaIngresoJunta: req.body.upd.fechaIngresoJunta,
          },
     };
     let updInfoJunta: any = {
          estadoAfiliacion: req.body.upd.estadoAfiliacion,
          datosJusElc: {
               fechaIngresoJunta: req.body.upd.fechaIngresoJunta,
               fechaRespuestaJunta: req.body.upd.fechaRespuestaJunta,
               estadoJunta: req.body.upd.estadoJunta,
               obserJunta: req.body.upd.obserJunta,
          },
     };
     let options = { new: true, omitUndefined: true };

     switch (req.body.op) {
          case 'presentar':
               try {
                    loteAfiliacion.findByIdAndUpdate(req.params._id, updPre, options, (err, data) => {
                         if (data) {
                              loteAfiliacion.find((err, data) => {
                                   res.status(200).json({ ok: true, data });
                              });
                         }
                    });
               } catch (error) {
                    res.status(200).json({ ok: false, error });
               }
               break;
          case 'infoCNE':
               try {
                    loteAfiliacion.findByIdAndUpdate(req.params._id, updInfoJunta, options, (err, data) => {
                         if (data) {
                              loteAfiliacion.find((err, data) => {
                                   res.status(200).json({ ok: true, data });
                              });
                         }
                    });
               } catch (error) {
                    res.status(200).json({ ok: false, error });
               }
               break;

          default:
               break;
     }
};

//// estadistica Lote

export const getDataLotes = async (req: Request, res: Response) => {
     let proxAfiliados = await loteAfiliacion.aggregate([
          { $unwind: '$planillas' },
          { $group: { _id: '$_id', sum: { $sum: 1 } } },
          { $group: { _id: null, proxAfilia: { $sum: '$sum' } } },
     ]);
     let lotesPresentados = await loteAfiliacion.aggregate([
          { $match: { estadoAfiliacion: 'presentado' } },
          { $group: { _id: '$_id', count: { $sum: 1 } } },
          { $group: { _id: null, totalPresnt: { $sum: '$count' } } },
     ]);
     let lotesCerrados = await loteAfiliacion.aggregate([
          { $match: { estadoAfiliacion: 'cerrado' } },
          { $group: { _id: '$_id', count: { $sum: 1 } } },
          { $group: { _id: null, totalCerrados: { $sum: '$count' } } },
     ]);

     let totalAfiliados = await afiliado.countDocuments();
     let totalLotes = await loteAfiliacion.countDocuments();

     res.status(200).json({
          // proxAfiliados: proxAfiliados[0].proxAfilia,
          ltePresentados: lotesPresentados.length ? lotesPresentados[0].totalPresnt : 0,
          lteCerrados: lotesCerrados.length ? lotesCerrados[0].totalCerrados : 0,
          totalAfiliados,
          totalLotes,
     });
};

//updatePlanilla
export const updPlanilla = async (req: Request, res: Response) => {
     let upd: any = {};
     upd.estadoAf = req.body.upd.estadoAf;
     upd.fechaAfilia = req.body.upd.fechaAfilia;
     upd.fechaBaja = req.body.upd.fechaBaja;
     upd.obserBaja = req.body.upd.obserBaja;

     try {
          loteAfiliacion.findOne({ nro: req.params._nroLte }, (err, data: ILoteAfiliacion) => {
               if (data) {
                    let indx = data.planillas.findIndex((elemento) => elemento.documento === req.body.upd.documento);
                    (data.planillas[indx].estadoAf = upd.estadoAf),
                         (data.planillas[indx].fechaAfilia = upd.fechaAfilia),
                         (data.planillas[indx].fechaBaja = upd.fechaBaja),
                         (data.planillas[indx].obserBaja = upd.obserBaja),
                         data.save();
                    res.status(200).json({ ok: true, data });
               }
          });
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};

///grilla Afiliados segun Lotes

export const getPlanillasLotes = async (req: Request, res: Response) => {
     let sexo: string;
     /* switch (req.body.data.genero) {
          case 'masculino':
               sexo = 'f';
               break;
          case 'femenino':
               sexo = 'f';
               break;
          case 'otros':
               sexo = 'o';
               break;
          default:
               break;
     } */

     let query: any = {
          genero: req.body.data.genero.toLowerCase() || 'm',
          estadoAf: req.body.data?.estado.toLowerCase() || 'pendiente',
          localidad: req.body.data?.localidad.toLowerCase() || 'neunquen',
     };

     let planillas: any = [];

     /* let data: any = await loteAfiliacion.find(query, { _id: 0, nro: 1, planillas: 1 }); */

     if (query.genero === 't' && query.estadoAf === 'todos') {
          let data: any = await loteAfiliacion.aggregate([
               {
                    $match: {
                         planillas: {
                              $elemMatch: {
                                   $and: [{ 'ultDomicilio.localidad': query.localidad }],
                              },
                         },
                    },
               },
               {
                    $project: {
                         nro: 1,
                         _id: 0,
                         planillas: {
                              $filter: {
                                   input: '$planillas',
                                   as: 'item',
                                   cond: {
                                        $and: [{ $eq: ['$$item.ultDomicilio.localidad', query.localidad] }],
                                   },
                              },
                         },
                    },
               },
          ]);
          for (let item of data) {
               item.planillas.forEach((element: any) => {
                    let aflia: any = {
                         nroLte: item.nro,
                         nombre: element.nombre,
                         apellido: element.apellido,
                         documento: element.documento,
                         genero: element.genero,
                         fechaNacimiento: element.fechaNacimiento,
                         estadoAf: element.estadoAf ? element.estadoAf : '',
                         fechaAfilia: element.fechaAfilia ? element.fechaAfilia : '',
                         fechaBaja: element.fechaBaja ? element.fechaBaja : '',
                         obserBaja: element.obserBaja ? element.obserBaja : '',
                         localidad: element.ultDomicilio.localidad,
                         ultDomicilio: {
                              distritoElec: element.ultDomicilio.distritoElec,
                              partidoDepto: element.ultDomicilio.partidoDepto,
                              localidad: element.ultDomicilio.localidad,
                              calle: element.ultDomicilio.calle,
                              nro: element.ultDomicilio.nro,
                              piso: element.ultDomicilio.piso,
                              dep: element.ultDomicilio.dep,
                         },
                         /*  domicilioPostal: {
                              barrio: { type: String },
                              circuito: { type: String },
                              localidad: { type: String },
                              calle: { type: String },
                              nro: { type: String },
                              piso: { type: String },
                              dep: { type: String },
                              telPar: { type: String },
                              telTrab: { type: String },
                              contacto: { type: String },
                              observaciones: { type: String },
                         }, */
                    };

                    planillas.push(aflia);
               });
          }
     }
     if (query.estadoAf === 'todos') {
          let data: any = await loteAfiliacion.aggregate([
               {
                    $match: {
                         planillas: {
                              $elemMatch: {
                                   $and: [{ 'ultDomicilio.localidad': query.localidad }],
                              },
                         },
                    },
               },
               {
                    $project: {
                         nro: 1,
                         _id: 0,
                         planillas: {
                              $filter: {
                                   input: '$planillas',
                                   as: 'item',
                                   cond: {
                                        $and: [
                                             { $eq: ['$$item.genero', query.genero] },
                                             { $eq: ['$$item.ultDomicilio.localidad', query.localidad] },
                                        ],
                                   },
                              },
                         },
                    },
               },
          ]);
          for (let item of data) {
               item.planillas.forEach((element: any) => {
                    let aflia: any = {
                         nroLte: item.nro,
                         nombre: element.nombre,
                         apellido: element.apellido,
                         documento: element.documento,
                         genero: element.genero,
                         fechaNacimiento: element.fechaNacimiento,
                         estadoAf: element.estadoAf ? element.estadoAf : '',
                         fechaAfilia: element.fechaAfilia ? element.fechaAfilia : '',
                         fechaBaja: element.fechaBaja ? element.fechaBaja : '',
                         obserBaja: element.obserBaja ? element.obserBaja : '',
                         localidad: element.ultDomicilio.localidad,
                         ultDomicilio: {
                              distritoElec: element.ultDomicilio.distritoElec,
                              partidoDepto: element.ultDomicilio.partidoDepto,
                              localidad: element.ultDomicilio.localidad,
                              calle: element.ultDomicilio.calle,
                              nro: element.ultDomicilio.nro,
                              piso: element.ultDomicilio.piso,
                              dep: element.ultDomicilio.dep,
                         },
                         /*  domicilioPostal: {
                              barrio: { type: String },
                              circuito: { type: String },
                              localidad: { type: String },
                              calle: { type: String },
                              nro: { type: String },
                              piso: { type: String },
                              dep: { type: String },
                              telPar: { type: String },
                              telTrab: { type: String },
                              contacto: { type: String },
                              observaciones: { type: String },
                         }, */
                    };

                    planillas.push(aflia);
               });
          }
     }
     if (query.genero === 't') {
          let data: any = await loteAfiliacion.aggregate([
               {
                    $match: {
                         planillas: {
                              $elemMatch: {
                                   $and: [{ 'ultDomicilio.localidad': query.localidad }],
                              },
                         },
                    },
               },
               {
                    $project: {
                         nro: 1,
                         _id: 0,
                         planillas: {
                              $filter: {
                                   input: '$planillas',
                                   as: 'item',
                                   cond: {
                                        $and: [
                                             { $eq: ['$$item.estadoAf', query.estadoAf] },
                                             { $eq: ['$$item.ultDomicilio.localidad', query.localidad] },
                                        ],
                                   },
                              },
                         },
                    },
               },
          ]);
          for (let item of data) {
               item.planillas.forEach((element: any) => {
                    let aflia: any = {
                         nroLte: item.nro,
                         nombre: element.nombre,
                         apellido: element.apellido,
                         documento: element.documento,
                         genero: element.genero,
                         fechaNacimiento: element.fechaNacimiento,
                         estadoAf: element.estadoAf ? element.estadoAf : '',
                         fechaAfilia: element.fechaAfilia ? element.fechaAfilia : '',
                         fechaBaja: element.fechaBaja ? element.fechaBaja : '',
                         obserBaja: element.obserBaja ? element.obserBaja : '',
                         localidad: element.ultDomicilio.localidad,
                         ultDomicilio: {
                              distritoElec: element.ultDomicilio.distritoElec,
                              partidoDepto: element.ultDomicilio.partidoDepto,
                              localidad: element.ultDomicilio.localidad,
                              calle: element.ultDomicilio.calle,
                              nro: element.ultDomicilio.nro,
                              piso: element.ultDomicilio.piso,
                              dep: element.ultDomicilio.dep,
                         },
                         /*  domicilioPostal: {
                              barrio: { type: String },
                              circuito: { type: String },
                              localidad: { type: String },
                              calle: { type: String },
                              nro: { type: String },
                              piso: { type: String },
                              dep: { type: String },
                              telPar: { type: String },
                              telTrab: { type: String },
                              contacto: { type: String },
                              observaciones: { type: String },
                         }, */
                    };

                    planillas.push(aflia);
               });
          }
     } else {
          let data: any = await loteAfiliacion.aggregate([
               {
                    $match: {
                         planillas: {
                              $elemMatch: {
                                   $and: [{ 'ultDomicilio.localidad': query.localidad }],
                              },
                         },
                    },
               },
               {
                    $project: {
                         nro: 1,
                         _id: 0,
                         planillas: {
                              $filter: {
                                   input: '$planillas',
                                   as: 'item',
                                   cond: {
                                        $and: [
                                             { $eq: ['$$item.genero', query.genero] },
                                             { $eq: ['$$item.estadoAf', query.estadoAf] },
                                             { $eq: ['$$item.ultDomicilio.localidad', query.localidad] },
                                        ],
                                   },
                              },
                         },
                    },
               },
          ]);
          for (let item of data) {
               item.planillas.forEach((element: any) => {
                    let aflia: any = {
                         nroLte: item.nro,
                         nombre: element.nombre,
                         apellido: element.apellido,
                         documento: element.documento,
                         genero: element.genero,
                         fechaNacimiento: element.fechaNacimiento,
                         estadoAf: element.estadoAf ? element.estadoAf : '',
                         fechaAfilia: element.fechaAfilia ? element.fechaAfilia : '',
                         fechaBaja: element.fechaBaja ? element.fechaBaja : '',
                         obserBaja: element.obserBaja ? element.obserBaja : '',
                         localidad: element.ultDomicilio.localidad,
                         ultDomicilio: {
                              distritoElec: element.ultDomicilio.distritoElec,
                              partidoDepto: element.ultDomicilio.partidoDepto,
                              localidad: element.ultDomicilio.localidad,
                              calle: element.ultDomicilio.calle,
                              nro: element.ultDomicilio.nro,
                              piso: element.ultDomicilio.piso,
                              dep: element.ultDomicilio.dep,
                         },
                         /*  domicilioPostal: {
                         barrio: { type: String },
                         circuito: { type: String },
                         localidad: { type: String },
                         calle: { type: String },
                         nro: { type: String },
                         piso: { type: String },
                         dep: { type: String },
                         telPar: { type: String },
                         telTrab: { type: String },
                         contacto: { type: String },
                         observaciones: { type: String },
                    }, */
                    };

                    planillas.push(aflia);
               });
          }
     }

     res.json({ planillas });
};
