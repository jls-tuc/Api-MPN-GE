import { Request, Response } from 'express';
import { votoProv, IvotoProv } from '../../models/elecciones/votoProvisorio';

export const guardarVoto = async (req: Request, res: Response) => {
   const voto: IvotoProv = await votoProv.findOne({ dni: req.body.dni });

   if (voto) {
      voto.resPlanilla.push(req.body.resPlanilla);
      await voto.save();
      return res.status(200).json({
         ok: true,
         msg: 'El dni ya se econtraba cargado, se agrego un responsable de planilla',
      });
   } else {
      const nVoto: IvotoProv = new votoProv(req.body);
      await nVoto.save();
      return res.status(200).json({
         ok: true,
         nVoto,
      });
   }
};

export const getvotos = async (req: Request, res: Response) => {
   await votoProv.find((err, data: IvotoProv) => {
      if (err) {
         res.status(300).json({
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

export const getOneVoto = async (req: Request, res: Response) => {
   await votoProv.findOne({ dni: req.body.dni }, (err, data: IvotoProv) => {
      if (err) {
         res.status(300).json({
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
            msg: 'El Numero de documento no fue cargado.',
         });
      }
   });
};
