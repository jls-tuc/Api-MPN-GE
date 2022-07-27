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
     let query: any = {};

     if (req.body.data.seccion) {
          query.seccion = req.body.data.seccion;
     }
     if (req.body.data.circuito) {
          query.circuito = req.body.data.circuito;
     }
     if (req.body.data.genero) {
          query.genero = req.body.data.genero;
     }
     if (req.body.data.estado) {
          query.estado_afiliacion = req.body.data.estado;
     }
     if (req.body.data.profesion) {
          query.profesion = req.body.data.profesion;
     }

     try {
          afiliado.find(query, (err, data) => res.status(200).json({ ok: true, data }));
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};
