import { Request, Response } from 'express';
import { votoProv, IvotoProv } from '../../models/elecciones/votoProvisorio';

export const guardarVoto = async (req: Request, res: Response) => {
   // console.log(`this.req.body`, req.body.resPlanilla.idResPlanilla);
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
      const nVoto: IvotoProv = new votoProv(req.body);
      await nVoto.save();
      return res.status(200).json({
         ok: true,
         nVoto,
      });
   }
};

export const getvotos = async (req: Request, res: Response) => {
   let votos: any;
   if (req.query.consulta === 'Referente') {
      votos = await votoProv.find({ 'resPlanilla.idReferente': req.query.valor }).lean();
   } else if (req.query.consulta === 'Resplanilla') {
      votos = await votoProv.find({ 'resPlanilla.idResPlanilla': req.query.valor }).lean();
   } else if (req.query.consulta === 'Coord') {
      votos = await votoProv.find({ 'resPlanilla.idCoordinador': req.query.valor }).lean();
   } else {
      return res.status(300).json({
         ok: false,
         msg: 'Faltan datos para la busqueda',
      });
   }
   if (votos === null) {
      res.status(300).json({
         ok: false,
         msg: 'Algo esta mal',
      });
   } else {
      const votosUnicos = await Array.from(new Set(votos));
      let totalV = votosUnicos.length;
      res.status(200).json({
         ok: true,
         votosUnicos,
         totalV,
      });
   }
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
////////////Consutlas de graficas//////////////////////////
export const getvotosGrafica = async (req: Request, res: Response) => {
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
////////actualizar

export const actualizarVoto = async (req: Request, res: Response) => {
   let votos: any = await votoProv.find({ 'resPlanilla.idReferente': req.body.idRef });
   // console.log(votos);
   for (let data of votos) {
      // console.log(data);
      let busqueda = data.resPlanilla.findIndex((idRef) => idRef.idReferente === req.body.idRef);
      if (data.resPlanilla[busqueda].idCoordinador != undefined) {
         data.resPlanilla[busqueda].idCoordinador = req.body.coord;
         await data.save();
      } else {
         //  console.log(data.resPlanilla[busqueda].idCoordinador);
      }
   }
   return res.status(200).json({
      ok: true,
   });
};
