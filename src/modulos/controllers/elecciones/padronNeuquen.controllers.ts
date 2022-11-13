import { Request, Response } from 'express';
import { padron, Ipadron } from '../../models/elecciones/padronNeuquen';

export const getPerPadron = async (req: Request, res: Response) => {
     console.log('documento', req.query);
     await padron.findOne({ documento: req.query.documento }, (err, data) => {
          if (err) {
               return res.status(300).json({
                    ok: false,
                    msg: 'Verificar los datos ingresados',
                    err,
               });
          }
          if (data) {
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
