import { Request, Response } from 'express';
import { stringify } from 'querystring';
import { afiliado } from '../../models/elecciones/afiliadosMpn';
import { IvotosCalc, votosGraf } from '../../models/elecciones/totalVotos';
import { votoProv, IvotoProv } from '../../models/elecciones/votoProvisorio';
import { usuarios, Iusuario } from '../../../Auth/models/authUsers.model';

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
export const getRecalculando = async (req: Request, res: Response) => {
   let votos = await votoProv.find().lean();
   console.log(`Ya traje el los Votos`);
   let afiliados = await afiliado.find().lean();
   console.log(`Ya traje el los Afiliados`);
   let votosG: any;
   console.log(`Empiezo Rutina`);
   let paso = 0;
   for (let data of votos) {
      paso++;
      console.log(`Data :`, paso);
      let dniAf = afiliados.find(res => res.dni === data.dni);
      let sexo = data.genero;
      if (dniAf !== undefined) {

         for (let usuario of data.resPlanilla) {
            if (usuario.idCoordinador) {
               let idCor = await votosGraf.findOne({ idUsuario: usuario.idCoordinador })
               if (idCor !== null) {
                  idCor.afiliado++;
                  if (sexo === "F") { idCor.femenino++ };
                  idCor.votos++;
                  await idCor.save();
               } else {
                  if (sexo === "F") {
                     votosG = {
                        idUsuario: usuario.idCoordinador,
                        role: "user-coord",
                        coordinador: "",
                        referente: "",
                        femenino: 1,
                        afiliado: 1,
                        votos: 1,
                     }
                  } else {
                     votosG = {
                        idUsuario: usuario.idCoordinador,
                        role: "user-coord",
                        coordinador: "",
                        referente: "",
                        afiliado: 1,
                        femenino: 0,
                        votos: 1,
                     }
                     let guardar = new votosGraf(votosG);
                     await guardar.save();
                  }
               }
               if (usuario.idReferente) {
                  let idRef = await votosGraf.findOne({ idUsuario: usuario.idReferente })
                  if (idRef !== null) {
                     idRef.afiliado++;
                     if (sexo === "F") { idRef.femenino++ };
                     idRef.votos++;
                     await idRef.save();
                  } else {
                     if (sexo === "F") {
                        votosG = {
                           idUsuario: usuario.idReferente,
                           role: "user-ref",
                           coordinador: usuario.idCoordinador,
                           referente: "",
                           afiliado: 1,
                           femenino: 1,
                           votos: 1,
                        }
                     } else {
                        votosG = {
                           idUsuario: usuario.idReferente,
                           role: "user-ref",
                           coordinador: usuario.idCoordinador,
                           referente: "",
                           afiliado: 1,
                           femenino: 0,
                           votos: 1,
                        }
                     }
                     let guardar = new votosGraf(votosG);
                     await guardar.save();
                  }
               }
               if (usuario.idResPlanilla) {
                  let idRes = await votosGraf.findOne({ idUsuario: usuario.idResPlanilla })
                  if (idRes !== null) {
                     idRes.afiliado++;
                     if (sexo === "F") { idRes.femenino++ };
                     idRes.votos++;
                     await idRes.save();
                  } else {
                     if (sexo === "F") {
                        votosG = {
                           idUsuario: usuario.idResPlanilla,
                           role: "user-resp",
                           coordinador: usuario.idCoordinador,
                           referente: usuario.idReferente,
                           afiliado: 1,
                           femenino: 1,
                           votos: 1,
                        }
                     } else {
                        votosG = {
                           idUsuario: usuario.idResPlanilla,
                           role: "user-resp",
                           coordinador: usuario.idCoordinador,
                           referente: usuario.idReferente,
                           afiliado: 1,
                           femenino: 0,
                           votos: 1,
                        }
                     }
                     let guardar = new votosGraf(votosG);
                     await guardar.save();
                  }
               }

            }
         }
      }
      else {
         for (let usuario of data.resPlanilla) {
            if (usuario.idCoordinador) {
               let idCor = await votosGraf.findOne({ idUsuario: usuario.idCoordinador })
               if (idCor !== null) {
                  idCor.votos++;
                  if (sexo === "F") { idCor.femenino++ };
                  await idCor.save();
               } else {
                  if (sexo === "F") {
                     votosG = {
                        idUsuario: usuario.idCoordinador,
                        role: "user-coord",
                        coordinador: "",
                        referente: "",
                        afiliado: 0,
                        femenino: 1,
                        votos: 1,
                     }
                  } else {
                     votosG = {
                        idUsuario: usuario.idCoordinador,
                        role: "user-coord",
                        coordinador: "",
                        referente: "",
                        afiliado: 0,
                        femenino: 0,
                        votos: 1,
                     }
                  }
                  let guardar = new votosGraf(votosG);
                  await guardar.save();
               }
            };
            if (usuario.idReferente) {
               let idRef = await votosGraf.findOne({ idUsuario: usuario.idReferente })
               if (idRef !== null) {
                  idRef.votos++;
                  if (sexo === "F") { idRef.femenino++ };
                  await idRef.save();
               } else {
                  if (sexo === "F") {
                     votosG = {
                        idUsuario: usuario.idReferente,
                        role: "user-ref",
                        coordinador: usuario.idCoordinador,
                        referente: "",
                        afiliado: 0,
                        femenino: 1,
                        votos: 1,
                     }
                  } else {
                     votosG = {
                        idUsuario: usuario.idReferente,
                        role: "user-ref",
                        coordinador: usuario.idCoordinador,
                        referente: "",
                        afiliado: 0,
                        femenino: 0,
                        votos: 1,
                     }
                  }
                  let guardar = new votosGraf(votosG);
                  await guardar.save();
               }
            };
            if (usuario.idResPlanilla) {
               let idRes = await votosGraf.findOne({ idUsuario: usuario.idResPlanilla })
               if (idRes !== null) {
                  if (sexo === "F") { idRes.femenino++ };
                  idRes.votos++;
                  await idRes.save();
               } else {
                  if (sexo === "F") {
                     votosG = {
                        idUsuario: usuario.idResPlanilla,
                        role: "user-resp",
                        coordinador: usuario.idCoordinador,
                        referente: usuario.idReferente,
                        afiliado: 0,
                        femenino: 1,
                        votos: 1,
                     }
                  } else {
                     votosG = {
                        idUsuario: usuario.idResPlanilla,
                        role: "user-resp",
                        coordinador: usuario.idCoordinador,
                        referente: usuario.idReferente,
                        afiliado: 0,
                        femenino: 0,
                        votos: 1,
                     }
                  }
                  let guardar = new votosGraf(votosG);
                  await guardar.save();
               }
            }

         }
      }
   }

   return res.status(200).json({
      ok: true,
   })
};
////////////Consutlas de graficas//////////////////////////
export const getCalculoTotal = async (req: Request, res: Response) => {

   let totales: any = await votosGraf.find().lean();
   let usuariosTot = await usuarios.find().lean();
   let data: any = [];
   for (let usuario of usuariosTot) {
      console.log(`EL WEON ES: `, usuario._id)

      if (usuario.role === "user-sys" || usuario.role === "user-calc") {
         console.log(`EL WEON ES: `, usuario.datosPersonales.apellido)
      } else {
         let encontro = 0;
         for (let usuarioVoto of totales) {
            let id = usuario._id.toString();
            if (id === usuarioVoto.idUsuario) {
               console.log(`totales.idUsuario`, totales.idUsuario)
               encontro++;
               let totalnoafiliados = usuarioVoto.votos - usuarioVoto.afiliado;
               data.push({
                  organizacion: usuario.datosPersonales.areaResponsable,
                  nombrecompleto: usuario.datosPersonales.apellido + " " + usuario.datosPersonales.nombres,
                  coordinador: usuarioVoto.coordinador,
                  role: usuarioVoto.role,
                  totalafiliados: usuarioVoto.afiliado,
                  totalnoafiliados: totalnoafiliados,
                  totalvotos: usuarioVoto.votos,
                  id: usuarioVoto.idUsuario
               }
               );

            }
         }
         if (encontro === 0) {
            let id = usuario._id.toString();
            data.push({
               organizacion: usuario.datosPersonales.areaResponsable,
               nombrecompleto: usuario.datosPersonales.apellido + " " + usuario.datosPersonales.nombres,

               role: usuario.role,
               totalafiliados: 0,
               totalnoafiliados: 0,
               totalvotos: 0,
               id: id,

            });
         }
      }
   }
   console.log(`Ya esta Terminamos!!!`)
   res.status(200).json({
      ok: true,
      data,
   })
};

export const getvotosGrafica = async (req: Request, res: Response) => {
   console.log(`req.body`, req.body.role)
   let votosTotal = 0;
   let afiliados = 0;
   let femenino = 0;
   let masculino = 0;
   let noafiliados = 0;
   let referentes = 0;
   let coordinadores = 0;
   let responsables = 0;
   let id;
   if (req.body.role === "user-sys" || req.body.role === "user-calc") {

      await votosGraf.find({ role: "user-ref" }, (err, data: any) => {
         referentes = data.length;
         console.log(`Data Referentes:`, data)
      });
      console.log(`responsables`, referentes)
      await votosGraf.find({ role: "user-resp" }, (err, data: any) => {
         responsables = data.length;
      });

      await votosGraf.find({ role: "user-coord" }, (err, coord: any) => {

         for (let voto of coord) {

            votosTotal = votosTotal + voto.votos;
            afiliados = afiliados + voto.afiliado;
            femenino = femenino + voto.femenino;
            coordinadores++;
         }
         masculino = votosTotal - femenino;
         noafiliados = votosTotal - afiliados;
         res.status(200).json({
            ok: true,
            votosTotal,
            afiliados,
            femenino,
            masculino,
            noafiliados,
            coordinadores,
            referentes,
            responsables
         });

      })
   } else {

      await votosGraf.find({ idUsuario: req.body.id }, (err, data: any) => {

         if (err) {
            res.status(300).json({
               ok: false,
               err,
            });
         } else {
            console.log(`dataaaaaaaaaaa`, data)
            if (data.length === 0) {
               votosTotal = 0;
               afiliados = 0;
               femenino = 0;
               masculino = 0;
               noafiliados = 0;
               id = req.body.id;
            } else {
               votosTotal = data[0].votos;
               afiliados = data[0].afiliado;
               femenino = data[0].femenino;
               masculino = votosTotal - femenino;
               noafiliados = votosTotal - afiliados;
               id = data[0]._id;
            }

            res.status(200).json({
               ok: true,
               votosTotal,
               afiliados,
               femenino,
               masculino,
               noafiliados,
               id
            });
         }
      })
   };

};
/* export const getvotosGrafica = async (req: Request, res: Response) => {
   await votoProv.find((err, data: any) => {
      if (err) {
         res.status(300).json({
            ok: false,
            err,
         });
      } else {
         let votosTotal = data.length;
         let afiliados = data.filter((datos: any) => datos.afiliado === "Es afiliado al MPN").length;
         let femenino = data.filter((datos: any) => datos.genero === "F").length;
         let masculino = votosTotal - femenino;
         let noafiliados = votosTotal - afiliados;
         let id = data._id;

         res.status(200).json({
            ok: true,
            votosTotal,
            afiliados,
            femenino,
            masculino,
            noafiliados,
            id
         });
      }
   });

}; */
