import { Request, Response } from 'express';
import { afiliado } from '../../models/elecciones/afiliadosMpn';

export const getAfiliado = async (req: Request, res: Response) => {
     let doc: any = req.query.documento;

     await afiliado.findOne({ dni: doc }, (err, data) => {
          if (err) {
               return res.status(204).json({
                    ok: false,
                    msg: 'Verificar los datos ingresados',
                    err,
               });
          }
          if (data !== null) {
               return res.status(200).json({
                    ok: true,
                    data,
               });
          } else {
               return res.status(200).json({
                    ok: false,
                    msg: 'El Numero de documento no existe en el padron.',
               });
          }
     });
};
export const getSecCir = async (req: Request, res: Response) => {
     try {
          let secCir = await afiliado.find({}, { seccion: 1, circuito: 1, _id: 0 });
          res.status(200).json({ ok: true, secCir });
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};

export const afiliadoFilto = async (req: Request, res: Response) => {
     let queryOr: any = [];
     let queryAnd: any = {};

     console.log(req.body.data);

     if (req.body.data.seccional) {
          queryAnd.seccional = req.body.data.seccional;
     }
     if (req.body.data.localidad.length) {
          req.body.data.localidad.forEach((element) => {
               let circuito: any = {};
               circuito.circuito = element;
               queryOr.push(circuito);
          });
     }
     if (req.body.data.seccion) {
          queryAnd.seccion = req.body.data.seccion;
     }
     if (req.body.data.circuito) {
          queryAnd.circuito = req.body.data.circuito;
     }
     if (
          req.body.data.genero !== '' ||
          req.body.data.genero === 'M' ||
          req.body.data.genero === 'F' ||
          req.body.data.genero === 'X'
     ) {
          queryAnd.genero = req.body.data.genero;
     }
     if (req.body.data.estado !== '') {
          queryAnd.estado_afiliacion = req.body.data.estado;
     }
     if (req.body.data.profesion !== '') {
          queryAnd.profesion = req.body.data.profesion;
     }

     try {
          afiliado.find(
               {
                    $and: [
                         {
                              $or: queryOr,
                         },
                         queryAnd,
                    ],
               },
               (err, data) => res.status(200).json({ ok: true, data })
          );
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};
