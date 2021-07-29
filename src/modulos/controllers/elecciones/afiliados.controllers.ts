import { Request, Response } from 'express';
import { afiliado } from '../../models/elecciones/afiliadosMpn';

export const getAfiliado = async (req: Request, res: Response) => {
   await afiliado.findOne({ dni: req.query.documento }, (err, data) => {
      if (err) {
         return res.status(300).json({
            ok: false,
            msg: 'Verificar Datos',
            err,
         });
      }
      return res.status(200).json({
         ok: true,
         data,
      });
   });
};
