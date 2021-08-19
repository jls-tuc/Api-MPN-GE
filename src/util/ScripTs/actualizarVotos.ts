import { Request, Response } from 'express';
import { userLocal } from '../../Auth/models/authLocal';
import { usuarios, Iusuario } from '../../Auth/models/authUsers.model';
import { votoProv, IvotoProv } from '../../modulos/models/elecciones/votoProvisorio';

///////actualiza los datos en el array de votos, le asigna a los votos del IdCoordinador
export const actualizarVoto = async (req: Request, res: Response) => {
   let usr: any = await usuarios.find({ role: 'user-resp' }, { _id: 1, idCoordinador: 1 }).lean();
   //console.log(usr);

   for (let votoUS of usr) {
      // console.log(votoUS);
      let id = votoUS._id.toString();
      let votos: any = await votoProv.find({ 'resPlanilla.idResPlanilla': id });
      for (let dato of votos) {
         let busqueda = dato.resPlanilla.findIndex((idRef) => idRef.idResPlanilla === id);

         if (dato.resPlanilla[busqueda].idCoordinador === undefined) {
            // console.log(dato.resPlanilla[busqueda].idCoordinador);
            dato.resPlanilla[busqueda].idCoordinador = votoUS.idCoordinador;

            await dato.save();
         } /* else {
            dato.resPlanilla[busqueda].idCoordinador = votoUS.idCoordinador;
            // console.log(data.resPlanilla[busqueda]);
            await dato.save(); */
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
   //  console.log(userSin);

   for (let data of userSin) {
      data.idCoordinador = req.body.coord;
      await data.save();
      console.log(data.usuario, data.idCoordinador);
   }
   return res.status(200).json({
      ok: true,
   });
};

/* export const actualizar = async (req: Request, res: Response) => {
   console.log('arranca', req.body.idRef);

   let usuaId: any = await userLocal.find({ role: 'user-resp' }).lean();

   let userSin: any = await usuarios.find({ role: 'user-resp' });
   let sinData: any = [];
   let sinID: any = [];

   for (let usr of userSin) {
      console.log(usr.usuario);
      if (usr.idReferente === '') {
         console.log('unnnnn', usr.idReferente);
      } else {
         console.log('sinnnnn', usr.idReferente);
      }
         if (usr.idReferente === undefined || usr.idReferente === '') {
         let data = await usuaId.find((element) => element.usuario === usr.usuario);

         if (data) {
            if (data.idReferente === '' || data.idReferente === undefined) {
               sinID.push(data.usuario);
            } else {
               usr.idRefernte = data.idRefernte;
               // await usr.save();
               console.log(usr._id);
            }
         }

       await usr.save();
      } 
       data.idCoordinador = req.body.coord;
      await data.save(); 
   }

   return res.status(200).json({
      ok: true,
      sinID,
   });
};
 */
