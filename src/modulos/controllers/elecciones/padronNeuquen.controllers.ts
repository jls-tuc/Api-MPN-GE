import { Request, Response } from 'express';
import { padron, Ipadron } from '../../models/elecciones/padronNeuquen';

export const getPerPadron = async (req: Request, res: Response) => {
  console.log('documento', req.body.documento);
  await padron.findOne({ documento: req.body.documento }, (err, data) => {
    if (err) {
      return res.status(300).json({
        ok: false,
        msg: 'Verificar los datos ingresados',
        err,
      });
    }
    return res.status(200).json({
      ok: true,
      data,
    });
  });
};
