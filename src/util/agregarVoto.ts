import { IvotosCalc, votosGraf } from '../modulos/models/elecciones/totalVotos';
export const cargarVotoGraf = async (data: any) => {
   //   console.log(data);

   if (data.resPlanilla.idReferente) {
      let idRef = await votosGraf.findOne({ idUsuario: data.resPlanilla.idReferente });
      if (idRef === null) {
         if (data.afiliado === 'Es afiliado al MPN') {
            if (data.genero === 'F') {
               let votosG = {
                  idUsuario: data.resPlanilla.idReferente,
                  role: data.role,
                  coordinador: data.resPlanilla.idCoordinador,
                  referente: '',
                  femenino: 1,
                  afiliado: 1,
                  votos: 1,
               };
               let guardar = new votosGraf(votosG);
               await guardar.save();
            } else {
               let votosG = {
                  idUsuario: data.resPlanilla.idReferente,
                  role: data.role,
                  coordinador: data.resPlanilla.idCoordinador,
                  referente: '',
                  femenino: 0,
                  afiliado: 0,
                  votos: 1,
               };
               let guardar = new votosGraf(votosG);
               await guardar.save();
            }
         } else {
            if (data.genero === 'F') {
               let votosG = {
                  idUsuario: data.resPlanilla.idReferente,
                  role: data.role,
                  coordinador: data.resPlanilla.idCoordinador,
                  referente: '',
                  femenino: 1,
                  afiliado: 0,
                  votos: 1,
               };
               let guardar = new votosGraf(votosG);
               await guardar.save();
            } else {
               let votosG = {
                  idUsuario: data.resPlanilla.idReferente,
                  role: data.role,
                  coordinador: data.resPlanilla.idCoordinador,
                  referente: '',
                  femenino: 0,
                  afiliado: 0,
                  votos: 1,
               };
               let guardar = new votosGraf(votosG);
               await guardar.save();
            }
         }
      } else {
         if (data.afiliado === 'Es afiliado al MPN') {
            if (data.genero === 'F') {
               idRef.femenino++;
            }
            idRef.afiliado++;
            idRef.votos++;
            await idRef.save();
            //return true;
         } else {
            if (data.genero === 'F') {
               idRef.femenino++;
            }
            idRef.votos++;
            await idRef.save();
            // return true;
         }
      }
      if (data.resPlanilla.idCoordinador) {
         //console.log('coord');
         let idCoord = await votosGraf.findOne({ idUsuario: data.resPlanilla.idCoordinador });
         if (idCoord === null) {
            if (data.afiliado === 'Es afiliado al MPN') {
               if (data.genero === 'F') {
                  let votosG = {
                     idUsuario: data.resPlanilla.idCoordinador,
                     role: data.role,
                     coordinador: '',
                     referente: '',
                     femenino: 1,
                     afiliado: 1,
                     votos: 1,
                  };
                  let guardar = new votosGraf(votosG);
                  await guardar.save();
               }
               let votosG = {
                  idUsuario: data.resPlanilla.idCoordinador,
                  role: data.role,
                  coordinador: '',
                  referente: '',
                  femenino: 0,
                  afiliado: 1,
                  votos: 1,
               };
               let guardar = new votosGraf(votosG);
               await guardar.save();
               // return true;
            } else {
               if (data.genero === 'F') {
                  let votosG = {
                     idUsuario: data.resPlanilla.idCoordinador,
                     role: data.role,
                     coordinador: '',
                     referente: '',
                     femenino: 1,
                     afiliado: 1,
                     votos: 1,
                  };
                  let guardar = new votosGraf(votosG);
                  await guardar.save();
               }
               let votosG = {
                  idUsuario: data.resPlanilla.idCoordinador,
                  role: data.role,
                  coordinador: '',
                  referente: '',
                  femenino: 0,
                  afiliado: 1,
                  votos: 1,
               };
               let guardar = new votosGraf(votosG);
               await guardar.save();
            }
         } else {
            if (data.afiliado === 'Es afiliado al MPN') {
               if (data.genero === 'F') {
                  idCoord.femenino++;
               }
               idCoord.afiliado++;
               idCoord.votos++;
               await idCoord.save();
               //   return true;
            } else {
               if (data.genero === 'F') {
                  idCoord.femenino++;
               }
               idCoord.votos++;
               await idCoord.save();
               // return true;
            }
         }
      }
      if (data.resPlanilla.idResPlanilla) {
         let idRes = await votosGraf.findOne({ idUsuario: data.resPlanilla.idResPlanilla });
         //  console.log(idRes);
         if (idRes === null) {
            if (data.afiliado === 'Es afiliado al MPN') {
               if (data.genero === 'F') {
                  let votosG = {
                     idUsuario: data.resPlanilla.idResPlanilla,
                     role: data.role,
                     coordinador: data.resPlanilla.idCoordinador,
                     referente: data.resPlanilla.idReferente,
                     femenino: 1,
                     afiliado: 1,
                     votos: 1,
                  };
                  let guardar = new votosGraf(votosG);
                  await guardar.save();
               }
               let votosG = {
                  idUsuario: data.resPlanilla.idResPlanilla,
                  role: data.role,
                  coordinador: data.resPlanilla.idCoordinador,
                  referente: data.resPlanilla.idReferente,
                  femenino: 0,
                  afiliado: 1,
                  votos: 1,
               };
               let guardar = new votosGraf(votosG);
               await guardar.save();

               // return true;
            } else {
               if (data.genero === 'F') {
                  let votosG = {
                     idUsuario: data.resPlanilla.idResPlanilla,
                     role: data.role,
                     coordinador: data.resPlanilla.idCoordinador,
                     referente: data.resPlanilla.idReferente,
                     femenino: 1,
                     afiliado: 1,
                     votos: 1,
                  };
                  let guardar = new votosGraf(votosG);
                  await guardar.save();
               }
               let votosG = {
                  idUsuario: data.resPlanilla.idResPlanilla,
                  role: data.role,
                  coordinador: data.resPlanilla.idCoordinador,
                  referente: data.resPlanilla.idReferente,
                  femenino: 0,
                  afiliado: 1,
                  votos: 1,
               };
               let guardar = new votosGraf(votosG);
               await guardar.save();
            }
         } else {
            if (data.afiliado === 'Es afiliado al MPN') {
               if (data.genero === 'F') {
                  idRes.femenino++;
               }
               idRes.afiliado++;
               idRes.votos++;
               await idRes.save();
               //  return true;
            } else {
               if (data.genero === 'F') {
                  idRes.femenino++;
               }
               idRes.votos++;
               idRes.save();
               //return true;
            }
         }
      }
      return true;
   }
};
