import { Request, Response } from 'express';
import { userLocal } from '../../Auth/models/authLocal';
import { usuarios, Iusuario } from '../../Auth/models/authUsers.model';
import { votoProv, IvotoProv } from '../../modulos/models/elecciones/votoProvisorio';
import { votosGraf } from '../../modulos/models/elecciones/totalVotos';
import { votoPersona, IPerVoto } from './../votosPersonas';
import { planta } from '../../modulos/models/elecciones/empleadosPlanta';
import { savePersona } from '../../modulos/controllers/personas/personaCtrl';
import { padron } from '../../modulos/models/elecciones/padronNeuquen';
import { geoEscuela } from '../../modulos/models/elecciones/geo/votosXEsc';
import { votoAdh } from '../../modulos/models/elecciones/votoAdhesion';
import { votoNQN } from '../../modulos/models/comunes/votoNqn';
import { usrAppMovil } from '../usuariosApp';
import moment from 'moment';
import { afiliado } from '../../modulos/models/elecciones/afiliadosMpn';
import { escuelas } from '../../modulos/models/comunes/establecimientos';
import { actasEscrutinio } from '../../modulos/models/elecciones/votos-12/jsonApp';

///////actualiza los datos en el array de votos, le asigna a los votos del IdCoordinador
export const actualizarVoto = async (req: Request, res: Response) => {
     console.log('arranca');

     //TODO: /1)buscar coordinador null
     /* let votos: any = await votoProv.find({ 'resPlanilla.idCoordinador': null });

     for (let voto of votos) {
          let busqueda = voto.resPlanilla.findIndex((idSrc) => idSrc.idCoordinador === undefined);
          let usr: any = await usuarios.findById(voto.resPlanilla[busqueda].idResPlanilla, { idCoordinador: 1 });
          if (usr !== null) {
               voto.resPlanilla[busqueda].idCoordinador = usr.idCoordinador;
               await voto.save();
          }
     } */
     //TODO:2 BUSCAR COORDINADOR EN ''
     /* let votos: any = await votoProv.find({ 'resPlanilla.idCoordinador': '' });

     for (let voto of votos) {
          let busqueda = voto.resPlanilla.findIndex((idSrc) => idSrc.idCoordinador === '');
          let usr: any = await usuarios.findById(voto.resPlanilla[busqueda].idResPlanilla, {
               idCoordinador: 1,
               idReferente: 1,
          });
          if (usr !== null) {
               console.log('existe el usuario', usr._id);
               voto.resPlanilla[busqueda].idCoordinador = usr.idCoordinador;
               await voto.save();
          } else {
               console.log(' no existe el usuario');
          }
     } */
     //TODO: 3Buscar idReferente null
     /* let votos: any = await votoProv.find({ 'resPlanilla.idReferente': null });
     let total = 0;
     for (let voto of votos) {
          total++;
          let busqueda = voto.resPlanilla.findIndex((idSrc) => idSrc.idReferente === undefined);
          console.log(busqueda);
          if (voto.resPlanilla[busqueda].idResPlanilla) {
               let usr: any = await usuarios.findById(voto.resPlanilla[busqueda].idResPlanilla, {
                    idCoordinador: 1,
                    idReferente: 1,
                    role: 1,
               });
               if (usr !== null && usr.role === 'user-resp') {
                    voto.resPlanilla[busqueda].idCoordinador === usr.idCoordinador
                         ? (voto.resPlanilla[busqueda].idReferente = usr.idReferente)
                         : (voto.resPlanilla[busqueda].idReferente = '');
                    await voto.save();
               } else if (usr !== null && usr.role === 'user-ref') {
                    voto.resPlanilla[busqueda].idCoordinador === usr.idCoordinador
                         ? (voto.resPlanilla[busqueda].idReferente = usr._id)
                         : (voto.resPlanilla[busqueda].idReferente = '');
                    await voto.save();
               } else {
                    voto.resPlanilla[busqueda].idReferente = '';
                    await voto.save();
               }
          } else {
               // console.log('no tiene id Resplanilla');
          }

          console.log(total);
     } */
     //TODO:4 Buscar idReferente:''
     /* let votos: any = await votoProv.find({ 'resPlanilla.idReferente': '' });
     let total = 0;
     for (let voto of votos) {
          total++;
          let busqueda = voto.resPlanilla.findIndex((idSrc) => idSrc.idReferente === '');
          console.log(busqueda);
          if (voto.resPlanilla[busqueda].idResPlanilla) {
               let usr: any = await usuarios.findById(voto.resPlanilla[busqueda].idResPlanilla, {
                    idCoordinador: 1,
                    idReferente: 1,
                    role: 1,
               });
               if (usr !== null && usr.role === 'user-resp') {
                    if (voto.resPlanilla[busqueda].idCoordinador === usr.idCoordinador) {
                         voto.resPlanilla[busqueda].idReferente = usr.idReferente;
                         await voto.save();
                    } else {
                         voto.resPlanilla[busqueda].idCoordinador = usr.idCoordinador;
                         voto.resPlanilla[busqueda].idReferente = usr.idReferente;
                         await voto.save();
                    }
               } else if (usr !== null && usr.role === 'user-ref') {
                    if (voto.resPlanilla[busqueda].idCoordinador === usr.idCoordinador) {
                         voto.resPlanilla[busqueda].idReferente = usr._id;
                         voto.resPlanilla[busqueda].idResPlanilla = '';
                         await voto.save();
                    } else {
                         voto.resPlanilla[busqueda].idCoordinador = usr.idCoordinador;
                         voto.resPlanilla[busqueda].idReferente = usr._id;
                         voto.resPlanilla[busqueda].idResPlanilla = '';
                         await voto.save();
                    }
               } else {
                    voto.resPlanilla[busqueda].idReferente = '';
                    await voto.save();
               }
          } else {
               // console.log('no tiene id Resplanilla');
          }

          console.log(total);
     } */
     //TODO: 5 Buscar idResPlanilla null
     /*    let votos: any = await votoProv.find({ 'resPlanilla.idResPlanilla': null });
     let total = 0;
     for (let voto of votos) {
          total++;
          let busqueda = voto.resPlanilla.findIndex((idSrc) => idSrc.idResPlanilla === undefined);
          console.log(busqueda);
          if (voto.resPlanilla[busqueda].idCoordinador) {
               voto.resPlanilla[busqueda].idResPlanilla = '';
               await voto.save();
          } else {
               console.log('no tiene id Resplanilla');
          }

          console.log(total);
     } */
};

//// actualiza el usuario que no tengan idCoordinador,
/* export const actualizar = async (req: Request, res: Response) => {
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
}; */

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

/* export const usrConVotos = async (req: Request, res: Response) => {
   console.log('entra');
   let personas: any = [];

   let totalVotos = await votosGraf.find({}, { idUsuario: 1, votos: 1, afiliado: 1, femenino: 1 });
   // console.log(totalVotos);
   for (let total of totalVotos) {
      let id = new Object(total.idUsuario);
      let usr = await usuarios.findById(id, {
         role: 1,
         'datosPersonales.dni': 1,
         'datosPersonales.nombres': 1,
         'datosPersonales.apellido': 1,
      });
      if (usr !== null) {
         let datoEmp = await planta.findOne({ dni: usr.datosPersonales.dni });
         if (datoEmp !== null) {
            // console.log('datosEmp', datoEmp);
            let datos: any = {
               dni: usr.datosPersonales.dni,
               apellido: usr.datosPersonales.nombres,
               nombre: usr.datosPersonales.apellido,
               role: usr.role,
               legajo: datoEmp.legajo,
               servicio: datoEmp.servicio,
               votos: total.votos,
               afiliado: total.afiliado,
               femenino: total.femenino,
               masculino: total.votos - total.femenino,
            };

            const nPersona = new votoPersona(datos);
            await nPersona.save();
         }
      }
   }
}; */

export const usrConVotos = async (req: Request, res: Response) => {
     console.log('entra');

     let totalNull = 0;

     let user = await usuarios
          .find(
               {},
               {
                    role: 1,
                    idCoordinador: 1,
                    idReferente: 1,
                    'datosPersonales.dni': 1,
                    'datosPersonales.nombres': 1,
                    'datosPersonales.apellido': 1,
               }
          )
          .lean();
     if (user !== null) {
          for (let usr of user) {
               if (usr.datosPersonales.dni !== undefined) {
                    let datoEmp = await planta.findOne({ dni: usr.datosPersonales.dni });
                    if (datoEmp !== null) {
                         if (usr.role === 'user-ref') {
                              let votosReF = await votoAdh.find({
                                   'resPlanilla.idReferente': usr._id,
                              });

                              if (votosReF.length) {
                                   for (let vRef of votosReF) {
                                        for (let data of vRef.resPlanilla) {
                                             // console.log(data);
                                             let idRef = usr._id.toString();
                                             if (data.idResPlanilla === '' && data.idReferente === idRef) {
                                                  let total: any = await votoPersona.find({
                                                       dni: usr.datosPersonales.dni,
                                                  });
                                                  // console.log(total);
                                                  if (total.length) {
                                                       vRef.genero === 'F' ? total[0].femenino++ : total[0].masculino++;
                                                       vRef.afiliado === 'Es afiliado al MPN'
                                                            ? total[0].afiliado++
                                                            : console.log('no es Afiliado');
                                                       total[0].votos++;
                                                       // console.log('antes-ref', total);
                                                       await total[0].save();
                                                  } else {
                                                       if (vRef.afiliado === 'Es afiliado al MPN') {
                                                            if (vRef.genero === 'F') {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: datoEmp.legajo,
                                                                      servicio: datoEmp.servicio,
                                                                      votos: 1,
                                                                      afiliado: 1,
                                                                      femenino: 1,
                                                                      masculino: 0,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };
                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            } else {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: datoEmp.legajo,
                                                                      servicio: datoEmp.servicio,
                                                                      votos: 1,
                                                                      afiliado: 1,
                                                                      femenino: 0,
                                                                      masculino: 1,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };

                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            }
                                                       } else {
                                                            if (vRef.genero === 'F') {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: datoEmp.legajo,
                                                                      servicio: datoEmp.servicio,
                                                                      votos: 1,
                                                                      afiliado: 0,
                                                                      femenino: 1,
                                                                      masculino: 0,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };
                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            } else {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: datoEmp.legajo,
                                                                      servicio: datoEmp.servicio,
                                                                      votos: 1,
                                                                      afiliado: 0,
                                                                      femenino: 0,
                                                                      masculino: 1,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };

                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            }
                                                       }
                                                  }
                                             }
                                        }
                                   }
                              } else {
                                   if (datoEmp !== null) {
                                        let datos: any = {
                                             dni: usr.datosPersonales.dni,
                                             apellido: usr.datosPersonales.nombres,
                                             nombre: usr.datosPersonales.apellido,
                                             role: usr.role,
                                             legajo: datoEmp.legajo,
                                             servicio: datoEmp.servicio,
                                             votos: 0,
                                             afiliado: 0,
                                             femenino: 0,
                                             masculino: 0,
                                             votaron: 0,
                                             votaronA: 0,
                                             votaronF: 0,
                                        };

                                        const nPersona = new votoPersona(datos);
                                        await nPersona.save();
                                   } else {
                                        let datos: any = {
                                             dni: usr.datosPersonales.dni,
                                             apellido: usr.datosPersonales.nombres,
                                             nombre: usr.datosPersonales.apellido,
                                             role: usr.role,
                                             legajo: 'Sin datos',
                                             servicio: 'Sin datos',
                                             votos: 0,
                                             afiliado: 0,
                                             femenino: 0,
                                             masculino: 0,
                                             votaron: 0,
                                             votaronA: 0,
                                             votaronF: 0,
                                        };

                                        const nPersona = new votoPersona(datos);
                                        await nPersona.save();
                                   }
                              }
                         }
                         if (usr.role === 'user-coord') {
                              console.log('user-Coord');

                              let votosCoord = await votoAdh.find({ 'resPlanilla.idCoordinador': usr._id });
                              if (votosCoord.length) {
                                   for (let vCoord of votosCoord) {
                                        //
                                        for (let data of vCoord.resPlanilla) {
                                             if (data.idResPlanilla === '' && data.idReferente === '') {
                                                  let total: any = await votoPersona.find({
                                                       dni: usr.datosPersonales.dni,
                                                  });
                                                  //console.log(total);
                                                  if (total.length) {
                                                       //console.log(total[0].femenino);
                                                       vCoord.genero === 'F'
                                                            ? // console.log(vCoord);
                                                              total[0].femenino++
                                                            : total[0].masculino++;

                                                       vCoord.afiliado === 'Es afiliado al MPN'
                                                            ? total[0].afiliado++
                                                            : console.log('no es afiliado');

                                                       total[0].votos++;
                                                       await total[0].save();
                                                  } else {
                                                       if (vCoord.afiliado === 'Es afiliado al MPN') {
                                                            if (vCoord.genero === 'F') {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: datoEmp.legajo,
                                                                      servicio: datoEmp.servicio,
                                                                      votos: 1,
                                                                      afiliado: 1,
                                                                      femenino: 1,
                                                                      masculino: 0,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };
                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            } else {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: datoEmp.legajo,
                                                                      servicio: datoEmp.servicio,
                                                                      votos: 1,
                                                                      afiliado: 1,
                                                                      femenino: 0,
                                                                      masculino: 1,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };

                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            }
                                                       } else {
                                                            if (vCoord.genero === 'F') {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: datoEmp.legajo,
                                                                      servicio: datoEmp.servicio,
                                                                      votos: 1,
                                                                      afiliado: 0,
                                                                      femenino: 1,
                                                                      masculino: 0,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };
                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            } else {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: datoEmp.legajo,
                                                                      servicio: datoEmp.servicio,
                                                                      votos: 1,
                                                                      afiliado: 0,
                                                                      femenino: 0,
                                                                      masculino: 1,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };

                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            }
                                                       }
                                                  }
                                             }
                                        }
                                   }
                              } else {
                                   if (datoEmp !== null) {
                                        let datos: any = {
                                             dni: usr.datosPersonales.dni,
                                             apellido: usr.datosPersonales.nombres,
                                             nombre: usr.datosPersonales.apellido,
                                             role: usr.role,
                                             legajo: datoEmp.legajo,
                                             servicio: datoEmp.servicio,
                                             votos: 0,
                                             afiliado: 0,
                                             femenino: 0,
                                             masculino: 0,
                                             votaron: 0,
                                             votaronA: 0,
                                             votaronF: 0,
                                        };

                                        const nPersona = new votoPersona(datos);
                                        await nPersona.save();
                                   } else {
                                        let datos: any = {
                                             dni: usr.datosPersonales.dni,
                                             apellido: usr.datosPersonales.nombres,
                                             nombre: usr.datosPersonales.apellido,
                                             role: usr.role,
                                             legajo: 'Sin datos',
                                             servicio: 'Sin datos',
                                             votos: 0,
                                             afiliado: 0,
                                             femenino: 0,
                                             masculino: 0,
                                             votaron: 0,
                                             votaronA: 0,
                                             votaronF: 0,
                                        };

                                        const nPersona = new votoPersona(datos);
                                        await nPersona.save();
                                   }
                              }
                         } else {
                              console.log('user-resp');
                              let votosResP = await votoAdh.find({ 'resPlanilla.idResPlanilla': usr._id });
                              if (votosResP.length) {
                                   for (let vResP of votosResP) {
                                        for (let data of vResP.resPlanilla) {
                                             if (
                                                  data.idCoordinador === usr.idCoordinador &&
                                                  data.idReferente === usr.idReferente
                                             ) {
                                                  let total: any = await votoPersona.find({
                                                       dni: usr.datosPersonales.dni,
                                                  });
                                                  // console.log(total);
                                                  if (total.length) {
                                                       vResP.genero === 'F'
                                                            ? total[0].femenino++
                                                            : total[0].masculino++;
                                                       vResP.afiliado === 'Es afiliado al MPN'
                                                            ? total[0].afiliado++
                                                            : console.log('no es Afiliado');
                                                       total[0].votos++;
                                                       //console.log('antes de guardar resp', total);
                                                       await total[0].save();
                                                  } else {
                                                       if (vResP.afiliado === 'Es afiliado al MPN') {
                                                            if (vResP.genero === 'F') {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: datoEmp.legajo,
                                                                      servicio: datoEmp.servicio,
                                                                      votos: 1,
                                                                      afiliado: 1,
                                                                      femenino: 1,
                                                                      masculino: 0,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };
                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            } else {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: datoEmp.legajo,
                                                                      servicio: datoEmp.servicio,
                                                                      votos: 1,
                                                                      afiliado: 1,
                                                                      femenino: 0,
                                                                      masculino: 1,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };

                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            }
                                                       } else {
                                                            if (vResP.genero === 'F') {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: datoEmp.legajo,
                                                                      servicio: datoEmp.servicio,
                                                                      votos: 1,
                                                                      afiliado: 0,
                                                                      femenino: 1,
                                                                      masculino: 0,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };
                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            } else {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: datoEmp.legajo,
                                                                      servicio: datoEmp.servicio,
                                                                      votos: 1,
                                                                      afiliado: 0,
                                                                      femenino: 0,
                                                                      masculino: 1,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };

                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            }
                                                       }
                                                  }
                                             }
                                        }
                                   }
                              } else {
                                   if (datoEmp !== null) {
                                        let datos: any = {
                                             dni: usr.datosPersonales.dni,
                                             apellido: usr.datosPersonales.nombres,
                                             nombre: usr.datosPersonales.apellido,
                                             role: usr.role,
                                             legajo: datoEmp.legajo,
                                             servicio: datoEmp.servicio,
                                             votos: 0,
                                             afiliado: 0,
                                             femenino: 0,
                                             masculino: 0,
                                             votaron: 0,
                                             votaronA: 0,
                                             votaronF: 0,
                                        };

                                        const nPersona = new votoPersona(datos);
                                        await nPersona.save();
                                   } else {
                                        let datos: any = {
                                             dni: usr.datosPersonales.dni,
                                             apellido: usr.datosPersonales.nombres,
                                             nombre: usr.datosPersonales.apellido,
                                             role: usr.role,
                                             legajo: 'Sin datos',
                                             servicio: 'Sin datos',
                                             votos: 0,
                                             afiliado: 0,
                                             femenino: 0,
                                             masculino: 0,
                                             votaron: 0,
                                             votaronA: 0,
                                             votaronF: 0,
                                        };

                                        const nPersona = new votoPersona(datos);
                                        await nPersona.save();
                                   }
                              }
                         }
                         //console.log(votos);
                    } else {
                         if (usr.role === 'user-ref') {
                              console.log('user-ref');
                              let votosReF = await votoAdh.find({
                                   'resPlanilla.idReferente': usr._id,
                              });

                              if (votosReF.length) {
                                   for (let vRef of votosReF) {
                                        for (let data of vRef.resPlanilla) {
                                             if (data.idResPlanilla === '') {
                                                  let total: any = await votoPersona.find({
                                                       dni: usr.datosPersonales.dni,
                                                  });
                                                  // console.log(total);
                                                  if (total.length) {
                                                       vRef.genero === 'F' ? total[0].femenino++ : total[0].masculino++;
                                                       vRef.afiliado === 'Es afiliado al MPN'
                                                            ? total[0].afiliado++
                                                            : console.log('no es Afiliado');
                                                       total[0].votos++;
                                                       // console.log('antes-ref', total);
                                                       await total[0].save();
                                                  } else {
                                                       if (vRef.afiliado === 'Es afiliado al MPN') {
                                                            if (vRef.genero === 'F') {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: 'Sin datos',
                                                                      servicio: 'Sin datos',
                                                                      votos: 1,
                                                                      afiliado: 1,
                                                                      femenino: 1,
                                                                      masculino: 0,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };
                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            } else {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: 'Sin datos',
                                                                      servicio: 'Sin datos',
                                                                      votos: 1,
                                                                      afiliado: 1,
                                                                      femenino: 0,
                                                                      masculino: 1,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };

                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            }
                                                       } else {
                                                            if (vRef.genero === 'F') {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: 'Sin datos',
                                                                      servicio: 'Sin datos',
                                                                      votos: 1,
                                                                      afiliado: 0,
                                                                      femenino: 1,
                                                                      masculino: 0,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };
                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            } else {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: 'Sin datos',
                                                                      servicio: 'Sin datos',
                                                                      votos: 1,
                                                                      afiliado: 0,
                                                                      femenino: 0,
                                                                      masculino: 1,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };

                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            }
                                                       }
                                                  }
                                             }
                                        }
                                   }
                              } else {
                                   let datos: any = {
                                        dni: usr.datosPersonales.dni,
                                        apellido: usr.datosPersonales.nombres,
                                        nombre: usr.datosPersonales.apellido,
                                        role: usr.role,
                                        legajo: 'Sin datos',
                                        servicio: 'Sin datos',
                                        votos: 0,
                                        afiliado: 0,
                                        femenino: 0,
                                        masculino: 0,
                                        votaron: 0,
                                        votaronA: 0,
                                        votaronF: 0,
                                   };

                                   const nPersona = new votoPersona(datos);
                                   await nPersona.save();
                              }
                         }
                         if (usr.role === 'user-coord') {
                              console.log('user-Coord');
                              let votosCoord = await votoAdh.find({ 'resPlanilla.idCoordinador': usr._id });
                              if (votosCoord.length) {
                                   for (let vCoord of votosCoord) {
                                        //
                                        for (let data of vCoord.resPlanilla) {
                                             if (data.idResPlanilla === '' && data.idReferente === '') {
                                                  let total: any = await votoPersona.find({
                                                       dni: usr.datosPersonales.dni,
                                                  });
                                                  //console.log(total);
                                                  if (total.length) {
                                                       //console.log(total[0].femenino);
                                                       vCoord.genero === 'F'
                                                            ? // console.log(vCoord);
                                                              total[0].femenino++
                                                            : total[0].masculino++;

                                                       vCoord.afiliado === 'Es afiliado al MPN'
                                                            ? total[0].afiliado++
                                                            : console.log('no es afiliado');

                                                       total[0].votos++;
                                                       await total[0].save();
                                                  } else {
                                                       if (vCoord.afiliado === 'Es afiliado al MPN') {
                                                            if (vCoord.genero === 'F') {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: 'Sin datos',
                                                                      servicio: 'Sin datos',
                                                                      votos: 1,
                                                                      afiliado: 1,
                                                                      femenino: 1,
                                                                      masculino: 0,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };
                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            } else {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: 'Sin datos',
                                                                      servicio: 'Sin datos',
                                                                      votos: 1,
                                                                      afiliado: 1,
                                                                      femenino: 0,
                                                                      masculino: 1,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };

                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            }
                                                       } else {
                                                            if (vCoord.genero === 'F') {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: 'Sin datos',
                                                                      servicio: 'Sin datos',
                                                                      votos: 1,
                                                                      afiliado: 0,
                                                                      femenino: 1,
                                                                      masculino: 0,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };
                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            } else {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: 'Sin datos',
                                                                      servicio: 'Sin datos',
                                                                      votos: 1,
                                                                      afiliado: 0,
                                                                      femenino: 0,
                                                                      masculino: 1,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };

                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            }
                                                       }
                                                  }
                                             }
                                        }
                                   }
                              } else {
                                   let datos: any = {
                                        dni: usr.datosPersonales.dni,
                                        apellido: usr.datosPersonales.nombres,
                                        nombre: usr.datosPersonales.apellido,
                                        role: usr.role,
                                        legajo: 'Sin datos',
                                        servicio: 'Sin datos',
                                        votos: 0,
                                        afiliado: 0,
                                        femenino: 0,
                                        masculino: 0,
                                        votaron: 0,
                                        votaronA: 0,
                                        votaronF: 0,
                                   };

                                   const nPersona = new votoPersona(datos);
                                   await nPersona.save();
                              }
                         } else {
                              console.log('user-resp');
                              let votosResP = await votoAdh.find({ 'resPlanilla.idResPlanilla': usr._id });
                              if (votosResP.length) {
                                   for (let vResP of votosResP) {
                                        for (let data of vResP.resPlanilla) {
                                             if (
                                                  data.idCoordinador === usr.idCoordinador &&
                                                  data.idReferente === usr.idReferente
                                             ) {
                                                  let total: any = await votoPersona.find({
                                                       dni: usr.datosPersonales.dni,
                                                  });
                                                  // console.log(total);
                                                  if (total.length) {
                                                       vResP.genero === 'F'
                                                            ? total[0].femenino++
                                                            : total[0].masculino++;
                                                       vResP.afiliado === 'Es afiliado al MPN'
                                                            ? total[0].afiliado++
                                                            : console.log('no es Afiliado');
                                                       total[0].votos++;
                                                       //console.log('antes de guardar resp', total);
                                                       await total[0].save();
                                                  } else {
                                                       if (vResP.afiliado === 'Es afiliado al MPN') {
                                                            if (vResP.genero === 'F') {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: 'Sin datos',
                                                                      servicio: 'Sin datos',
                                                                      votos: 1,
                                                                      afiliado: 1,
                                                                      femenino: 1,
                                                                      masculino: 0,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };
                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            } else {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: 'Sin datos',
                                                                      servicio: 'Sin datos',
                                                                      votos: 1,
                                                                      afiliado: 1,
                                                                      femenino: 0,
                                                                      masculino: 1,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };

                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            }
                                                       } else {
                                                            if (vResP.genero === 'F') {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: 'Sin datos',
                                                                      servicio: 'Sin datos',
                                                                      votos: 1,
                                                                      afiliado: 0,
                                                                      femenino: 1,
                                                                      masculino: 0,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };
                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            } else {
                                                                 let datos: any = {
                                                                      dni: usr.datosPersonales.dni,
                                                                      apellido: usr.datosPersonales.nombres,
                                                                      nombre: usr.datosPersonales.apellido,
                                                                      role: usr.role,
                                                                      legajo: 'Sin datos',
                                                                      servicio: 'Sin datos',
                                                                      votos: 1,
                                                                      afiliado: 0,
                                                                      femenino: 0,
                                                                      masculino: 1,
                                                                      votaron: 0,
                                                                      votaronA: 0,
                                                                      votaronF: 0,
                                                                 };

                                                                 const nPersona = new votoPersona(datos);
                                                                 await nPersona.save();
                                                            }
                                                       }
                                                  }
                                             }
                                        }
                                   }
                              } else {
                                   let datos: any = {
                                        dni: usr.datosPersonales.dni,
                                        apellido: usr.datosPersonales.nombres,
                                        nombre: usr.datosPersonales.apellido,
                                        role: usr.role,
                                        legajo: 'Sin datos',
                                        servicio: 'Sin datos',
                                        votos: 0,
                                        afiliado: 0,
                                        femenino: 0,
                                        masculino: 0,
                                        votaron: 0,
                                        votaronA: 0,
                                        votaronF: 0,
                                   };

                                   const nPersona = new votoPersona(datos);
                                   await nPersona.save();
                              }
                         }
                    }
               } else {
                    console.log(totalNull++);
                    console.log(usr.datosPersonales.dni);
               }
          }
     }
};

export const geoVoto = async (req: Request, res: Response) => {
     console.log('arranca');
     let mesa: any;
     let total: number = 0;

     let votosP: any = await votoAdh.find().lean();

     for (let voto of votosP) {
          //TODO:Busco el dni en el padron

          console.log(total++);
          let datos: any = await padron.findOne(
               { documento: voto.dni },
               { genero: 1, mesa: 1, establecimiento: 1, localidad: 1, lat: 1, lon: 1 }
          );
          let coord: any = await escuelas.findOne({ establecimiento: voto.establecimiento }, { lat: 1, lon: 1 });

          if (coord !== null) {
               //console.log(datos);
               if (datos !== null) {
                    //TODO:busco el establecimiento en el geoEscuela schema

                    let escu: any = await geoEscuela.findOne({ mesaNro: datos.mesa });
                    if (escu !== null) {
                         voto.afiliado === 'Es afiliado al MPN' ? escu.afiliado++ : console.log('no es afiliado');
                         datos.genero === 'F' ? escu.femenino++ : escu.masculino++;
                         escu.votosMesa++;
                         await escu.save();
                    } else {
                         if (voto.afiliado === 'Es afiliado al MPN') {
                              if (datos.genero === 'F') {
                                   let esc = {
                                        mesaNro: datos.mesa,
                                        establecimiento: datos.establecimiento,
                                        localidad: datos.localidad,
                                        votosMesa: 1,
                                        masculino: 0,
                                        femenino: 1,
                                        afiliado: 1,
                                        votaron: 0,
                                        votaronA: 0,
                                        votaronF: 0,
                                        typeGeo: 'Point',
                                        lon: coord.lon,
                                        lat: coord.lat,
                                   };

                                   let nuevaEsc = new geoEscuela(esc);
                                   await nuevaEsc.save();
                              } else {
                                   let esc = {
                                        mesaNro: datos.mesa,
                                        establecimiento: datos.establecimiento,
                                        localidad: datos.localidad,
                                        votosMesa: 1,
                                        masculino: 1,
                                        femenino: 0,
                                        afiliado: 1,
                                        votaron: 0,
                                        votaronA: 0,
                                        votaronF: 0,
                                        typeGeo: 'Point',
                                        lon: coord.lon,
                                        lat: coord.lat,
                                   };

                                   let nuevaEsc = new geoEscuela(esc);
                                   await nuevaEsc.save();
                              }
                         } else {
                              if (datos.genero === 'F') {
                                   let esc = {
                                        mesaNro: datos.mesa,
                                        establecimiento: datos.establecimiento,
                                        localidad: datos.localidad,
                                        votosMesa: 1,
                                        masculino: 0,
                                        femenino: 1,
                                        afiliado: 0,
                                        votaron: 0,
                                        votaronA: 0,
                                        votaronF: 0,
                                        typeGeo: 'Point',
                                        lon: coord.lon,
                                        lat: coord.lat,
                                   };

                                   let nuevaEsc = new geoEscuela(esc);
                                   await nuevaEsc.save();
                              } else {
                                   let esc = {
                                        mesaNro: datos.mesa,
                                        establecimiento: datos.establecimiento,
                                        localidad: datos.localidad,
                                        votosMesa: 1,
                                        masculino: 1,
                                        femenino: 0,
                                        afiliado: 0,
                                        votaron: 0,
                                        votaronA: 0,
                                        votaronF: 0,
                                        typeGeo: 'Point',
                                        lon: coord.lon,
                                        lat: coord.lat,
                                   };

                                   let nuevaEsc = new geoEscuela(esc);
                                   await nuevaEsc.save();
                              }
                         }
                    }
               }
          }
     }
};

export const nuevoVoto = async (req: Request, res: Response) => {
     let total = 0;

     let votos = await votoAdh.find({ nombreCompleto: null }, { dni: 1 });

     for (let voto of votos) {
          let dato: any = await padron.findOne({ documento: voto.dni }, { nombre: 1, apellido: 1 });
          if (dato !== null) {
               console.log(dato);
               voto.nombreCompleto = dato.apellido + dato.nombre;
               await voto.save();
               console.log(total++);
          }
     }

     /*    console.log('estoy');
     let dniNoExiste = 0;
     let votosV: any = await votoProv.find();

     for (let data of votosV) {
          let padronN: any = await padron.findOne(
               { documento: data.dni },
               { establecimiento: 1, dom_estableimiento: 1, mesa: 1, orden: 1, localidad: 1 }
          );

          if (padronN !== null) {
               let nuevoVoto = {
                    dni: data.dni,
                    sexo: data.sexo,
                    nombreCompleto: data.nombreCompleto,
                    clase: data.clase,
                    genero: data.genero,
                    telefono: data.telefono,
                    tipo_voto: data.tipo_voto,
                    afiliado: data.afiliado,
                    localidad: padronN.localidad,
                    dom_estableimiento: padronN.dom_estableimiento,
                    establecimiento: padronN.establecimiento,
                    mesa: padronN.mesa,
                    orden: padronN.orden,
                    resPlanilla: data.resPlanilla,
               };

               const nuevoVAD = new votoAdh(nuevoVoto);
               await nuevoVAD.save();
          } else {
               console.log(dniNoExiste++);
               data.observacion = 'el documento no existe en el padron definitivo paso 2021';
               await data.save();
          }
     } */
};

/* export const votosNQN = async (req: Request, res: Response) => {
     console.log('estoyyyy');
     let votosDuplicados: any = [];
     let votosSin: any = [];
     let votoNqn: any = await votoNQN.find({});
     let usCoord: any;
     let usRef: any;
     let total = 0;
     let localidad = [];

     for (let vNqn of votoNqn) {
          //console.log(vNqn);
          let data = await votoAdh.findOne({ dni: vNqn.DNI }, { dni: 1, resPlanilla: 1, localidad: 1 });
          //console.log(data);

          if (data !== null) {
               localidad.push(data.localidad);

               for (let id of data.resPlanilla) {
                    if (id.idCoordinador && id.idReferente && id.idResPlanilla) {
                         let usuario = await usuarios.findById(id.idResPlanilla, {
                              'datosPersonales.dni': 1,
                              'datosPersonales.apellido': 1,
                              'datosPersonales.nombres': 1,
                         });

                         if (usuario !== null) {
                              usCoord = await usuarios.findById(id.idCoordinador, {
                                   'datosPersonales.apellido': 1,
                                   'datosPersonales.nombres': 1,
                              });
                              usRef = await usuarios.findById(id.idReferente, {
                                   'datosPersonales.apellido': 1,
                                   'datosPersonales.nombres': 1,
                              });

                              if (usCoord === null) {
                                   usCoord = {
                                        datosPersonales: {
                                             nombres: '',
                                             apellidos: '',
                                        },
                                   };
                              } else if (usRef === null) {
                                   usRef = {
                                        datosPersonales: {
                                             nombres: '',
                                             apellidos: '',
                                        },
                                   };
                              } else {
                                   let votos = {
                                        dni: data.dni,
                                        ResPlanillaNombre: usuario.datosPersonales.nombres,
                                        ResPlanillaApellido: usuario.datosPersonales.apellido,
                                        ResPlanillaDni: usuario.datosPersonales.dni,
                                        ReFNombre: usRef.datosPersonales.nombres,
                                        ReFApellido: usRef.datosPersonales.apellido,
                                        CoordNombre: usCoord.datosPersonales.nombres,
                                        CoordApellido: usCoord.datosPersonales.apellido,
                                   };

                                   votosDuplicados.push(votos);
                              }
                         } else {
                              let votos = {
                                   dni: data.dni,
                                   ResPlanillaNombre: '',
                                   ResPlanillaApellido: '',
                                   ResPlanillaDni: '',
                              };

                              votosDuplicados.push(votos);
                         }
                    } else if (id.idCoordinador && id.idReferente && id.idResPlanilla === '') {
                         let usuario = await usuarios.findById(id.idReferente, {
                              'datosPersonales.dni': 1,
                              'datosPersonales.apellido': 1,
                              'datosPersonales.nombres': 1,
                         });

                         if (usuario !== null) {
                              usCoord = await usuarios.findById(id.idCoordinador, {
                                   'datosPersonales.apellido': 1,
                                   'datosPersonales.nombres': 1,
                              });

                              if (usCoord === null) {
                                   usCoord = {
                                        datosPersonales: {
                                             nombres: '',
                                             apellidos: '',
                                        },
                                   };
                              } else {
                                   let votos = {
                                        dni: data.dni,
                                        ReFNombre: usuario.datosPersonales.nombres,
                                        ReFApellido: usuario.datosPersonales.apellido,
                                        ReFDni: usuario.datosPersonales.dni,
                                        CoordNombre: usCoord.datosPersonales.nombres,
                                        CoordApellido: usCoord.datosPersonales.apellido,
                                   };

                                   votosDuplicados.push(votos);
                              }
                         } else {
                              let votos = {
                                   dni: data.dni,
                                   ReFNombre: '',
                                   ReFApellido: '',
                                   ReFDni: '',
                              };

                              votosDuplicados.push(votos);
                         }
                    } else {
                         let usuario = await usuarios.findById(id.idCoordinador, {
                              'datosPersonales.dni': 1,
                              'datosPersonales.apellido': 1,
                              'datosPersonales.nombres': 1,
                         });

                         if (usuario !== null) {
                              let votos = {
                                   dni: data.dni,
                                   CoordNombre: usuario.datosPersonales.nombres,
                                   CoordApellido: usuario.datosPersonales.apellido,
                                   CoordDni: usuario.datosPersonales.dni,
                              };

                              votosDuplicados.push(votos);
                         } else {
                              let votos = {
                                   dni: data.dni,
                                   CoordNombre: '',
                                   CoordApellido: '',
                                   CoordDni: '',
                              };

                              votosDuplicados.push(votos);
                         }
                    }
               }

               console.log(total++);
          }

          votosSin.push(vNqn);
     }
     let locDup: any = await countLocalidad(localidad);

     res.status(200).json({
          ok: true,
          locDup,
          votosDuplicados,
          votosSin,
     });
}; */

export const usuariosAppM = async (req: Request, res: Response) => {
     let usrArr: any = await usrAppMovil.find();

     for (let us of usrArr) {
          // console.log(us);

          let localidad: any = await padron.findOne({ establecimiento: us.establecimiento }, { localidad: 1 });
          //console.log(localidad);
          if (localidad !== null) {
               let altUsr = {
                    usuario: us.usuario,
                    activo: 'true',
                    password: us.password,
                    fechaltaUsuario: moment().format('YYYY/MM/DD'),
                    fechaajaUsuario: '',
                    foto: 'sinfoto',
                    datosersonales: {
                         nombres: us.establecimiento,
                         apellido: '',
                         dni: '',
                         calle: '',
                         numero: '',
                         localidad: localidad.localidad,
                         email: '',
                         telefono: '',
                    },
                    datosLaborales: {
                         legajo: '',
                         ministerio: '',
                         area: '',
                         servicioPuestoPrincipal: '',
                    },
                    role: 'app-movil',
               };

               const userExist: any = await usuarios.findOne({ usuario: us.usuario });
               if (userExist) {
                    //pregunto si ya existe un idreferente en el array
                    if (userExist.role === 'user-ref') {
                         res.status(200).json({
                              ok: false,
                              msg: 'El referente ya se encuentra cargado',
                         });
                    } else if (userExist.role === 'user-resp') {
                         res.status(200).json({
                              ok: false,
                              msg: 'El responsable de la planilla ya se encuentra asignado al referente seleccionado',
                         });
                    } else if (userExist.role === 'user-coord') {
                         res.status(200).json({
                              ok: false,
                              msg: 'El usuario seleccionado es coordinador',
                         });
                    } else {
                         res.status(200).json({
                              ok: false,
                              msg: 'El usuario para la app Movil ya existe',
                         });
                    }
               }

               const user: Iusuario = new usuarios(altUsr);
               await user.save();
          }
     }
     return res.status(200).json({
          ok: true,
     });
};

/* export const votosNQN = async (req: Request, res: Response) => {
     console.log('estoyyyy');

     let votoNqn: any = await votoNQN.find({}).lean();
     let total = 0;
     let votoSisProv: any = await votoAdh.find({}, { dni: 1, localidad: 1 }).lean();
     let totalSinDup = 0;
     let totalDup = 0;
     let localidades = [];
     let locSindp = [];
     let localidadRepetida = [];
     let locMuni = [];
     let totalMuni = 0;

     for (let votoPrv of votoSisProv) {
          localidades.push(votoPrv.localidad);

          let data = await votoNqn.find((elemento) => elemento.DNI === votoPrv.dni);
          s console.log('repqtido', data);
          if (data !== undefined) {
               localidadRepetida.push(votoPrv.localidad);
               totalDup++;
          } else {
               locSindp.push(votoPrv.localidad);
               totalSinDup++;
          }
          console.log(total++);
     }

     for (let vNqn of votoNqn) {
          let data = await votoAdh.findOne({ dni: vNqn.DNI }, { dni: 1, resPlanilla: 1, localidad: 1 });
          // console.log(data);
          if (data !== null) {
               locMuni.push(vNqn.LOCALIDAD);
               totalMuni++;
          }
     }
     let SinDupProv: any = await countLocalidad(locMuni);

     res.status(200).json({
          SinDupProv,

          totalSinDup,
          totalDup,
          totalMuni,
     });
}; */

export const migrarNqn = async (req: Request, res: Response) => {
     console.log('Entro');

     let votosNuevos = await votoNQN.find().lean();
     let total = 0;
     for (let votoNuevo of votosNuevos) {
          let voto = await votoAdh.findOne({ dni: votoNuevo.DNI });

          if (voto === null) {
               let datosPadron: any = await padron.findOne(
                    { documento: votoNuevo.DNI },
                    { lat: 0, lon: 0, circuito: 0, ejemplar: 0, _id: 0 }
               );
               let padronAfi = await afiliado.findOne({ dni: votoNuevo.DNI });

               let guardarData: any = {};

               if (padronAfi !== null) {
                    guardarData.afiliado = 'Es afiliado al MPN';
               } else {
                    guardarData.afiliado = '';
               }
               guardarData.dni = votoNuevo.DNI;
               guardarData.sexo = datosPadron.genero;
               guardarData.nombreCompleto = datosPadron.nombre;
               guardarData.clase = datosPadron.clase;
               guardarData.genero = datosPadron.genero;
               guardarData.telefono = '';
               guardarData.tipo_voto = 'Voto Adhesion';
               guardarData.localidad = datosPadron.localidad;
               guardarData.dom_establecimiento = datosPadron.dom_establecimiento;
               guardarData.establecimiento = datosPadron.establecimiento;
               guardarData.mesa = datosPadron.mesa;
               guardarData.orden = datosPadron.orden;
               (guardarData.realizoVoto = ''),
                    (guardarData.resPlanilla = {
                         idCoordinador: '6112cd081b7e004260bada04',
                         idReferente: '',
                         idResPlanilla: '',
                    });

               let gVoto = new votoAdh(guardarData);
               await gVoto.save();
               console.log(total++);
          }
     }
};

const countLocalidad = async (localidades) => {
     let data = localidades;
     let locRepetidas = {};

     data.forEach((element) => {
          locRepetidas[element] = (locRepetidas[element] || 0) + 1;
     });

     return locRepetidas;
};
/* export const migrarNqn = async (req: Request, res: Response) => {
     console.log('Entro');

     let votosNuevos = await votoNQN.find().lean();
     let total = 0;
     for (let votoNuevo of votosNuevos) {
          let voto = await votoAdh.findOne({ dni: votoNuevo.DNI });

          if (voto === null) {
               let datosPadron: any = await padron.findOne(
                    { documento: votoNuevo.DNI },
                    { lat: 0, lon: 0, circuito: 0, ejemplar: 0, _id: 0 }
               );
               let padronAfi = await afiliado.findOne({ dni: votoNuevo.DNI });

               let guardarData: any = {};

               if (padronAfi !== null) {
                    guardarData.afiliado = 'Es afiliado al MPN';
               } else {
                    guardarData.afiliado = '';
               }
               guardarData.dni = votoNuevo.DNI;
               guardarData.sexo = datosPadron.genero;
               guardarData.nombreCompleto = datosPadron.nombre;
               guardarData.clase = datosPadron.clase;
               guardarData.genero = datosPadron.genero;
               guardarData.telefono = '';
               guardarData.tipo_voto = 'Voto Adhesion';
               guardarData.localidad = datosPadron.localidad;
               guardarData.dom_establecimiento = datosPadron.dom_establecimiento;
               guardarData.establecimiento = datosPadron.establecimiento;
               guardarData.mesa = datosPadron.mesa;
               guardarData.orden = datosPadron.orden;
               (guardarData.realizoVoto = ''),
                    (guardarData.resPlanilla = {
                         idCoordinador: '6112cd081b7e004260bada04',
                         idReferente: '',
                         idResPlanilla: '',
                    });

               let gVoto = new votoAdh(guardarData);
               await gVoto.save();
               console.log(total++);
          }
     }
}; */

export const sinLoc = async (req: Request, res: Response) => {
     let sinLoc: any = await votoAdh.find({}, { dni: 1, establecimiento: 1, dom_establecimiento: 1, localidad: 1 });

     let totalsincambio = 0;
     let totalcambios = 0;

     for (let votos of sinLoc) {
          let data: any = await padron.findOne(
               { documento: votos.dni },
               { establecimiento: 1, dom_establecimiento: 1, localidad: 1 }
          );

          if (data !== null) {
               if (votos.establecimiento !== data.establecimiento) {
                    votos.establecimiento = data.establecimiento;
                    votos.dom_establecimiento = data.dom_establecimiento;
                    votos.localidad = data.localidad;
                    await votos.save();
                    console.log('cambioss', totalcambios++);
               } else {
                    console.log(totalsincambio++);
               }
          }
     }
};

export const totales = async (req: Request, res: Response) => {
     let totales = await actasEscrutinio.find({}).lean().sort({ localidad: 1 });

     let localidades: any = [...new Set(totales.map((element) => element.localidad))];

     let datosLocalidad: any = [];

     let totalLocEsc: any = [];

     for (let localidad of localidades) {
          let locaSelecc = totales.filter((element) => element.localidad === localidad);

          for (let loc of locaSelecc) {
               let locIndx = datosLocalidad.findIndex((loc) => loc.localidad === localidad);

               if (locIndx === -1) {
                    let info = {
                         localidad: loc.localidad,
                         votosNulos: loc.resultadosGral.votosNulos,
                         votosRecurridos: loc.resultadosGral.votosRecurridos,
                         votosBlanco: loc.resultadosGral.votosBlanco,
                         votosImpugnados: loc.resultadosGral.votosImpugnados,
                         totalVotos: loc.resultadosGral.totalVotos,
                         electoresVotaron: loc.resultadosGral.electoresVotaron,
                         sobresUrnas: loc.resultadosGral.sobresUrnas,
                         diferencia: loc.resultadosGral.diferencia,
                    };

                    loc.resultadosGral.listas.map((data, indx) => {
                         info[`lista_${data.lista}`] = data.lista;
                         info[`resultado_${data.lista}`] = data.resultado;
                    });
                    datosLocalidad.push(info);
               } else {
                    (datosLocalidad[locIndx].votosNulos += loc.resultadosGral.votosNulos),
                         (datosLocalidad[locIndx].votosRecurridos += loc.resultadosGral.votosRecurridos),
                         (datosLocalidad[locIndx].votosBlanco += loc.resultadosGral.votosBlanco),
                         (datosLocalidad[locIndx].votosImpugnados += loc.resultadosGral.votosImpugnados),
                         (datosLocalidad[locIndx].totalVotos += loc.resultadosGral.totalVotos),
                         (datosLocalidad[locIndx].electoresVotaron += loc.resultadosGral.electoresVotaron),
                         (datosLocalidad[locIndx].sobresUrnas += loc.resultadosGral.sobresUrnas),
                         (datosLocalidad[locIndx].diferencia += loc.resultadosGral.diferencia);
                    loc.resultadosGral.listas.map((data, indx) => {
                         let mesaIndx = datosLocalidad.findIndex((item) => item[`lista_${data.lista}`] === data.lista);

                         if (mesaIndx === -1) {
                              datosLocalidad[locIndx][`lista_${data.lista}`] = data.lista;
                              datosLocalidad[locIndx][`resultado_${data.lista}`] = data.resultado;
                         } else {
                              datosLocalidad[locIndx][`resultado_${data.lista}`] += data.resultado;
                         }
                    });
               }
               let escIndx = totalLocEsc.findIndex((esc) => esc.establecimiento === loc.establecimiento);

               if (escIndx === -1) {
                    for (let mesaArr of loc.mesas) {
                         mesaArr.resultadoMesa.listas.map((data, indx) => {
                              let mesaIndx = totalLocEsc.findIndex((data) => data.mesa === mesaArr.mesa);
                              if (mesaIndx === -1) {
                                   totalLocEsc.push({
                                        localidad: loc.localidad,
                                        establecimiento: loc.establecimiento,
                                        mesa: mesaArr.mesa,
                                        totalElectoresMesa: mesaArr.ordenTotal,
                                        votosNulos: mesaArr.resultadoMesa.votosNulos,
                                        votosRecurridos: mesaArr.resultadoMesa.votosRecurridos,
                                        votosBlanco: mesaArr.resultadoMesa.votosBlanco,
                                        votosImpugnados: mesaArr.resultadoMesa.votosImpugnados,
                                        totalVotos: mesaArr.resultadoMesa.totalVotos,
                                        electoresVotaron: mesaArr.resultadoMesa.electoresVotaron,
                                        sobresUrnas: mesaArr.resultadoMesa.sobresUrna,
                                        diferencia: mesaArr.resultadoMesa.diferencia,
                                        [`lista_${indx}`]: data.lista,
                                        [`resultado_${indx}`]: data.resultado,
                                   });
                              } else {
                                   totalLocEsc[mesaIndx][`lista_${indx}`] = data.lista;
                                   totalLocEsc[mesaIndx][`resultado_${indx}`] = data.resultado;
                              }
                         });
                    }
               } else {
                    for (let mesaArr of loc.mesas)
                         mesaArr.resultadoMesa.listas.map((data, indx) => {
                              let mesaIndx = totalLocEsc.findIndex((data) => data.mesa === mesaArr.mesa);
                              if (mesaIndx === -1) {
                                   (totalLocEsc[escIndx].mesa = mesaArr.mesa),
                                        (totalLocEsc[escIndx].totalElectoresMesa = mesaArr.ordenTotal),
                                        (totalLocEsc[escIndx].votosNulos = mesaArr.resultadoMesa.votosNulos),
                                        (totalLocEsc[escIndx].votosRecurridos = mesaArr.resultadoMesa.votosRecurridos),
                                        (totalLocEsc[escIndx].votosBlanco = mesaArr.resultadoMesa.votosBlanco),
                                        (totalLocEsc[escIndx].votosImpugnados = mesaArr.resultadoMesa.votosImpugnados),
                                        (totalLocEsc[escIndx].totalVotos = mesaArr.resultadoMesa.totalVotos),
                                        (totalLocEsc[escIndx].electoresVotaron =
                                             mesaArr.resultadoMesa.electoresVotaron),
                                        (totalLocEsc[escIndx].sobresUrnas = mesaArr.resultadoMesa.sobresUrna),
                                        (totalLocEsc[escIndx].diferencia = mesaArr.resultadoMesa.diferencia),
                                        (totalLocEsc[escIndx][`lista_${indx}`] = data.lista);
                                   totalLocEsc[escIndx][`resultado_${indx}`] = data.resultado;
                              } else {
                                   totalLocEsc[escIndx][`lista_${indx}`] = data.lista;
                                   totalLocEsc[escIndx][`resultado_${indx}`] = data.resultado;
                              }
                         });
               }
          }
     }

     res.status(200).json({ datosLocalidad, totalLocEsc });
};
