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
     /*     console.log('entra');

     // console.log(totalVotos);

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
                                             let total: any = await votoPersona.find({ dni: usr.datosPersonales.dni });
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
                                   };

                                   const nPersona = new votoPersona(datos);
                                   await nPersona.save();
                              }
                         }
                    } else if (usr.role === 'user-coord') {
                         console.log('user-Coord');

                         let votosCoord = await votoAdh.find({ 'resPlanilla.idCoordinador': usr._id });
                         if (votosCoord.length) {
                              for (let vCoord of votosCoord) {
                                   //
                                   for (let data of vCoord.resPlanilla) {
                                        if (data.idResPlanilla === '' && data.idReferente === '') {
                                             let total: any = await votoPersona.find({ dni: usr.datosPersonales.dni });
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
                                             let total: any = await votoPersona.find({ dni: usr.datosPersonales.dni });
                                             // console.log(total);
                                             if (total.length) {
                                                  vResP.genero === 'F' ? total[0].femenino++ : total[0].masculino++;
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
                                             let total: any = await votoPersona.find({ dni: usr.datosPersonales.dni });
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
                              };

                              const nPersona = new votoPersona(datos);
                              await nPersona.save();
                         }
                    } else if (usr.role === 'user-coord') {
                         console.log('user-Coord');
                         let votosCoord = await votoAdh.find({ 'resPlanilla.idCoordinador': usr._id });
                         if (votosCoord.length) {
                              for (let vCoord of votosCoord) {
                                   //
                                   for (let data of vCoord.resPlanilla) {
                                        if (data.idResPlanilla === '' && data.idReferente === '') {
                                             let total: any = await votoPersona.find({ dni: usr.datosPersonales.dni });
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
                                             let total: any = await votoPersona.find({ dni: usr.datosPersonales.dni });
                                             // console.log(total);
                                             if (total.length) {
                                                  vResP.genero === 'F' ? total[0].femenino++ : total[0].masculino++;
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
                              };

                              const nPersona = new votoPersona(datos);
                              await nPersona.save();
                         }
                    }
               }
          }
     } */
};

export const geoVoto = async (req: Request, res: Response) => {
     /* console.log('arranca');
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
          //console.log(datos);
          if (datos !== null) {
               //TODO:busco el establecimiento en el geoEscuela schema

               let esc: any = await geoEscuela.findOne({ mesaNro: datos.mesa });
               if (esc !== null) {
                    voto.afiliado === 'Es afiliado al MPN' ? esc.afiliado++ : console.log('no es afiliado');
                    datos.genero === 'F' ? esc.femenino++ : esc.masculino++;
                    esc.votosMesa++;
                    await esc.save();
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
                                   typeGeo: 'Point',
                                   lon: datos.lon,
                                   lat: datos.lat,
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
                                   typeGeo: 'Point',
                                   lon: datos.lon,
                                   lat: datos.lat,
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
                                   typeGeo: 'Point',
                                   lon: datos.lon,
                                   lat: datos.lat,
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
                                   typeGeo: 'Point',
                                   lon: datos.lon,
                                   lat: datos.lat,
                              };

                              let nuevaEsc = new geoEscuela(esc);
                              await nuevaEsc.save();
                         }
                    }
               }
          }
     } */
};

export const nuevoVoto = async (req: Request, res: Response) => {
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
