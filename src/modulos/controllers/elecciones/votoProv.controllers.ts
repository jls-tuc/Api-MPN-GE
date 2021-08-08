import { Request, Response } from 'express';
import { votoProv, IvotoProv } from '../../models/elecciones/votoProvisorio';

export const guardarVoto = async (req: Request, res: Response) => {
   console.log(`this.req.body`, req.body.resPlanilla.idResPlanilla);
   const voto: IvotoProv = await votoProv.findOne({ dni: req.body.dni });

   if (voto) {
      if (
         voto.resPlanilla.some(
            (data) =>
               data.idResPlanilla === req.body.resPlanilla.idResPlanilla &&
               data.idResPlanilla === req.body.resPlanilla.idResPlanilla &&
               data.idCoordinador === req.body.resPlanilla.idCoordinador
         )
      ) {
         return res.status(200).json({
            ok: false,
            msg: 'El Voto ya se encuentra cargado',
         });
      }
      console.log('no esta el ID');
      voto.resPlanilla.push(req.body.resPlanilla);
      await voto.save();
      return res.status(200).json({
         ok: true,
         msg: 'El dni ya se econtraba cargado, se agrego un responsable de planilla',
      });
   } else {
      console.log('no existe el voto');
      /* const nVoto: IvotoProv = new votoProv(req.body);
      await nVoto.save();
      return res.status(200).json({
         ok: true,
         nVoto,
      }); */
   }
};

export const getvotos = async (req: Request, res: Response) => {
   await votoProv.find({ 'resPlanilla.idResPlanilla': req.query.id }, (err, data) => {
      if (err) {
         res.status(300).json({
            ok: false,
            err,
         });
      } else {
         const votosUnicos = Array.from(new Set(data));
         let totalV = votosUnicos.length;
         res.status(200).json({
            ok: true,
            votosUnicos,
            totalV,
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
