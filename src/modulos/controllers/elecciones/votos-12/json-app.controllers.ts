import { Response, Request } from 'express';
import { jsonAPP } from '../../../models/elecciones/votos-12/jsonApp';

export const getEscuela = async (req: Request, res: Response) => {
     console.log(req.query.usuario);
     await jsonAPP.findOne({ usuario: req.query.usuario }, (err, data) => {
          if (err) {
               res.status(400).json({
                    ok: false,
                    err,
               });
          } else {
               res.status(200).json({
                    ok: true,
                    data,
               });
          }
     });
};
