import { Response, Request } from 'express';
import { actasEscrutinio } from '../../../models/elecciones/votos-12/jsonApp';

export const getEscuela = async (req: Request, res: Response) => {
     req.params.establecimiento;

     await actasEscrutinio.findOne({ establecimiento: req.params.establecimiento }, (err, data) => {
          if (err) {
               res.status(400).json({
                    ok: false,
                    err,
               });
          } else {
               console.log(data);
               res.status(200).json({
                    ok: true,
                    data,
               });
          }
     });
};

export const saveResult = async (req: Request, res: Response) => {
     await actasEscrutinio.findOne({ 'mesa.mesa': req.query.mesa }, (err, data) => {
          if (err) {
               res.status(400).json({
                    ok: false,
                    err,
               });
          } else {
               console.log(data);
               res.status(200).json({
                    ok: true,
                    data,
               });
          }
     });
};
