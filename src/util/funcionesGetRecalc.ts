import { votosGraf } from '../modulos/models/elecciones/totalVotos';

export const buscarDatos = async (votos: any, afiliados: any) => {
   let paso = 0;
   for (let data of votos) {
      paso++;
      console.log(`Data :`, data.dni);
      for (let resPlanilla of data.resPlanilla) {
         let dniAf = await afiliados.find((res) => res.dni === data.dni);

         if (dniAf) {
            if (resPlanilla.idResPlanilla) {
               let votN = await creoVotoAfResp(data, resPlanilla);
               //console.log(votN);
            }
            if (resPlanilla.idReferente) {
               let votN = await creoVotoAfRef(data, resPlanilla);
               //console.log(votN);
            }
            if (resPlanilla.idCoordinador) {
               let votN = await creoVotoAfCoord(data, resPlanilla);
               //console.log(votN);
            }
         } else {
            if (resPlanilla.idResPlanilla) {
               let votN = await creoVotoNOAfResp(data, resPlanilla);
               // console.log(votN);
            }
            if (resPlanilla.idReferente) {
               let votN = await creoVotoNOAfiRef(data, resPlanilla);
               //console.log(votN);
            }

            if (resPlanilla.idCoordinador) {
               let votN = await creoVotoNOAfCoord(data, resPlanilla);
               //console.log(votN);
            }
         }
      }
   }
};

let creoVotoAfResp = async (voto, idRef) => {
   let votoYa = await votosGraf.findOne({ idUsuario: idRef.idResPlanilla });
   if (votoYa) {
      if (voto.genero === 'F') {
         votoYa.femenino++;
      }
      votoYa.afiliado++;
      votoYa.votos++;
      await votoYa.save();
      return;
   } else {
      if (voto.genero === 'F') {
         let nuevoVoto: any = {
            idUsuario: idRef.idResPlanilla,
            role: 'user-resp',
            coordinador: idRef.idCoordinador,
            referente: idRef.idReferente,
            afiliado: 1,
            femenino: 1,
            votos: 1,
         };
         let guardar = new votosGraf(nuevoVoto);
         await guardar.save();
         return;
      } else {
         let nuevoVoto: any = {
            idUsuario: idRef.idResPlanilla,
            role: 'user-resp',
            coordinador: idRef.idCoordinador,
            referente: idRef.idReferente,
            afiliado: 1,
            femenino: 0,
            votos: 1,
         };
         let guardar = new votosGraf(nuevoVoto);
         await guardar.save();
         return;
      }
   }
};

let creoVotoAfRef = async (voto, idRef) => {
   let votoYa = await votosGraf.findOne({ idUsuario: idRef.idReferente });
   if (votoYa) {
      if (voto.genero === 'F') {
         votoYa.femenino++;
      }
      votoYa.afiliado++;
      votoYa.votos++;
      await votoYa.save();
      return;
   } else {
      if (voto.genero === 'F') {
         let nuevoVoto: any = {
            idUsuario: idRef.idReferente,
            role: 'user-ref',
            coordinador: idRef.idCoordinador,
            referente: '',
            afiliado: 1,
            femenino: 1,
            votos: 1,
         };
         let guardar = new votosGraf(nuevoVoto);
         await guardar.save();
         return;
      } else {
         let nuevoVoto: any = {
            idUsuario: idRef.idReferente,
            role: 'user-ref',
            coordinador: idRef.idCoordinador,
            referente: '',
            afiliado: 1,
            femenino: 0,
            votos: 1,
         };
         let guardar = new votosGraf(nuevoVoto);
         await guardar.save();
         return;
      }
   }
};

let creoVotoAfCoord = async (voto, idRef) => {
   let votoYa = await votosGraf.findOne({ idUsuario: idRef.idCoordinador });
   if (votoYa) {
      if (voto.genero === 'F') {
         votoYa.femenino++;
      }
      votoYa.afiliado++;
      votoYa.votos++;
      await votoYa.save();
      return;
   } else {
      if (voto.genero === 'F') {
         let nuevoVoto: any = {
            idUsuario: idRef.idCoordinador,
            role: 'user-coord',
            coordinador: '',
            referente: '',
            afiliado: 1,
            femenino: 1,
            votos: 1,
         };
         let guardar = new votosGraf(nuevoVoto);
         await guardar.save();
         return;
      } else {
         let nuevoVoto: any = {
            idUsuario: idRef.idCoordinador,
            role: 'user-coord',
            coordinador: '',
            referente: '',
            afiliado: 1,
            femenino: 0,
            votos: 1,
         };
         let guardar = new votosGraf(nuevoVoto);
         await guardar.save();
         return;
      }
   }
};

//////////////////////////////////// funciones no Afiliados

let creoVotoNOAfResp = async (voto, idRef) => {
   let votoYa = await votosGraf.findOne({ idUsuario: idRef.idResPlanilla });
   if (votoYa) {
      if (voto.genero === 'F') {
         votoYa.femenino++;
      }
      votoYa.votos++;
      await votoYa.save();
      return;
   } else {
      if (voto.genero === 'F') {
         let nuevoVoto: any = {
            idUsuario: idRef.idResPlanilla,
            role: 'user-resp',
            coordinador: idRef.idCoordinador,
            referente: idRef.idReferente,
            afiliado: 0,
            femenino: 1,
            votos: 1,
         };
         let guardar = new votosGraf(nuevoVoto);
         await guardar.save();
         return;
      } else {
         let nuevoVoto: any = {
            idUsuario: idRef.idResPlanilla,
            role: 'user-resp',
            coordinador: idRef.idCoordinador,
            referente: idRef.idReferente,
            afiliado: 0,
            femenino: 0,
            votos: 1,
         };
         let guardar = new votosGraf(nuevoVoto);
         await guardar.save();
         return;
      }
   }
};

let creoVotoNOAfiRef = async (voto, idRef) => {
   let votoYa = await votosGraf.findOne({ idUsuario: idRef.idReferente });
   if (votoYa) {
      if (voto.genero === 'F') {
         votoYa.femenino++;
      }
      votoYa.votos++;
      await votoYa.save();
      return;
   } else {
      if (voto.genero === 'F') {
         let nuevoVoto: any = {
            idUsuario: idRef.idReferente,
            role: 'user-ref',
            coordinador: idRef.idCoordinador,
            referente: '',
            afiliado: 0,
            femenino: 1,
            votos: 1,
         };
         let guardar = new votosGraf(nuevoVoto);
         await guardar.save();
         return;
      } else {
         let nuevoVoto: any = {
            idUsuario: idRef.idReferente,
            role: 'user-ref',
            coordinador: idRef.idCoordinador,
            referente: '',
            afiliado: 0,
            femenino: 0,
            votos: 1,
         };
         let guardar = new votosGraf(nuevoVoto);
         await guardar.save();
         return;
      }
   }
};

let creoVotoNOAfCoord = async (voto, idRef) => {
   let votoYa = await votosGraf.findOne({ idUsuario: idRef.idCoordinador });
   if (votoYa) {
      if (voto.genero === 'F') {
         votoYa.femenino++;
      }

      votoYa.votos++;
      await votoYa.save();
      return;
   } else {
      if (voto.genero === 'F') {
         let nuevoVoto: any = {
            idUsuario: idRef.idCoordinador,
            role: 'user-coord',
            coordinador: '',
            referente: '',
            afiliado: 0,
            femenino: 1,
            votos: 1,
         };
         let guardar = new votosGraf(nuevoVoto);
         await guardar.save();
         return;
      } else {
         let nuevoVoto: any = {
            idUsuario: idRef.idCoordinador,
            role: 'user-coord',
            coordinador: '',
            referente: '',
            afiliado: 0,
            femenino: 0,
            votos: 1,
         };
         let guardar = new votosGraf(nuevoVoto);
         await guardar.save();
         return;
      }
   }
};
