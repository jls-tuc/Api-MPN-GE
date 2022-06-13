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
          { $group: { _id: null, totalPresnt: { $sum: '$count' } } },
     ]);
     let totalAfiliados = await afiliado.countDocuments();
     let totalLotes = await loteAfiliacion.countDocuments();

     res.status(200).json({
          proxAfiliados: proxAfiliados[0].proxAfilia,
          ltePresentados: lotesPresentados[0].totalPresnt,
          lteCerrados: lotesCerrados[0].totalPresnt,
          totalAfiliados,
          totalLotes,
     });
};
