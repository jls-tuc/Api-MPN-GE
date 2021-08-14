import { IvotosCalc, votosGraf } from '../modulos/models/elecciones/totalVotos';
export const cargarVotoGraf = async (data: any) => {
   // console.log(data);

   if (data.role === 'user-ref') {
      let idRef = await votosGraf.findOne({ idUsuario: data.resPlanilla.idReferente });
      if (idRef === null) {
         if (data.afiliado === 'Es afiliado al MPN') {
            let votosG = {
               idUsuario: data.resPlanilla.idReferente,
               role: data.role,
               coordinador: data.resPlanilla.idCoordinador,
               referente: '',
               afiliado: 1,
               votos: 1,
            };
            let guardar = new votosGraf(votosG);
            await guardar.save();
            return true;
         } else {
            let votosG = {
               idUsuario: data.resPlanilla.idReferente,
               role: data.role,
               coordinador: data.resPlanilla.idCoordinador,
               referente: '',
               afiliado: 0,
               votos: 1,
            };
            let guardar = new votosGraf(votosG);
            await guardar.save();
            return true;
         }
      }
      if (data.afiliado === 'Es afiliado al MPN') {
         idRef.afiliado++;
         idRef.votos++;
         await idRef.save();
         return true;
      } else {
         idRef.votos++;
         await idRef.save();
         return true;
      }
   } else if (data.role === 'user-coord') {
      let idCoord = await votosGraf.findOne({ idUsuario: data.resPlanilla.idCoordinador });
      if (idCoord === null) {
         if (data.afiliado === 'Es afiliado al MPN') {
            let votosG = {
               idUsuario: data.resPlanilla.idCoordinador,
               role: data.role,
               coordinador: '',
               referente: '',
               afiliado: 1,
               votos: 1,
            };
            let guardar = new votosGraf(votosG);
            await guardar.save();
            return true;
         } else {
            let votosG = {
               idUsuario: data.resPlanilla.idCoordinador,
               role: data.role,
               coordinador: '',
               referente: '',
               afiliado: 0,
               votos: 1,
            };
            let guardar = new votosGraf(votosG);
            await guardar.save();
            return true;
         }
      }
      if (data.afiliado === 'Es afiliado al MPN') {
         idCoord.afiliado++;
         idCoord.votos++;
         await idCoord.save();
         return true;
      } else {
         idCoord.votos++;
         await idCoord.save();
         return true;
      }
   } else {
      // console.log(data);
      let idRes = await votosGraf.findOne({ idUsuario: data.resPlanilla.idResPlanilla });
      //  console.log(idRes);
      if (idRes === null) {
         if (data.afiliado === 'Es afiliado al MPN') {
            let votosG = {
               idUsuario: data.resPlanilla.idResPlanilla,
               role: data.role,
               coordinador: data.resPlanilla.idCoordinador,
               referente: data.resPlanilla.idReferente,
               afiliado: 1,
               votos: 1,
            };
            let guardar = new votosGraf(votosG);
            await guardar.save();
            return true;
         } else {
            let votosG = {
               idUsuario: data.resPlanilla.idResPlanilla,
               role: data.role,
               coordinador: data.resPlanilla.idCoordinador,
               referente: data.resPlanilla.idReferente,
               afiliado: 0,
               votos: 1,
            };
            let guardar = new votosGraf(votosG);
            await guardar.save();
            return true;
         }
      }
      if (data.afiliado === 'Es afiliado al MPN') {
         idRes.afiliado++;
         idRes.votos++;
         await idRes.save();
         return true;
      } else {
         idRes.votos++;
         idRes.save();
         return true;
      }
   }
};
