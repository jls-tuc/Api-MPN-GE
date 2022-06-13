import { Request, Response } from 'express';
import { padronProv, IpadronProv } from '../../models/elecciones/padronProv';

export const getPerPadron = async (req: Request, res: Response) => {
     //console.log('documento', req.query);
     await padronProv.findOne({ documento: req.query.documento }, (err, data) => {
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
               return res.status(204).json({
                    ok: false,
                    msg: 'El Numero de documento no existe en el padron.',
               });
          }
     });
};
