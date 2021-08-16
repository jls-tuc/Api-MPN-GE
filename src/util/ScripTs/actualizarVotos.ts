import { Request, Response } from 'express';
import { usuarios, Iusuario } from '../../Auth/models/authUsers.model';
import { votoProv } from '../../modulos/models/elecciones/votoProvisorio';

///////actualiza los datos en el array de votos, le asigna a los votos del IdCoordinador
export const actualizarVoto = async (req: Request, res: Response) => {
   let votos: any = await votoProv.find({ 'resPlanilla.idReferente': req.body.idRef });
   //console.log(votos);
   for (let data of votos) {
      // console.log(data);
      let busqueda = data.resPlanilla.findIndex((idRef) => idRef.idReferente === req.body.idRef);
      if (data.resPlanilla[busqueda].idCoordinador != undefined) {
         data.resPlanilla[busqueda].idCoordinador = req.body.coord;
         //console.log(data.resPlanilla[busqueda]);
         await data.save();
      } else {
         data.resPlanilla[busqueda].idCoordinador = req.body.coord;
         console.log(data.resPlanilla[busqueda]);
         await data.save();
      }
   }
   return res.status(200).json({
      ok: true,
   });
};

//// actualiza el usuario que no tengan idCoordinador,
export const actualizar = async (req: Request, res: Response) => {
   console.log('arranca', req.body.idRef);
   let userSin: any = await usuarios.find({ idReferente: req.body.idRef });
   console.log(userSin.length);

   for (let data of userSin) {
      data.idCoordinador = req.body.coord;
      await data.save();
   }
   return res.status(200).json({
      ok: true,
   });
};
