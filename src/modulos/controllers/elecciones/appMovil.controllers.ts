import { Request, Response } from 'express';
import moment from 'moment';
import { usuarios } from '../../../Auth/models/authUsers.model';
import { votoPersona } from '../../../util/votosPersonas';
import { geoEscuela } from '../../models/elecciones/geo/votosXEsc';
import { votoAdh } from '../../models/elecciones/votoAdhesion';
import { infoAppMovil } from '../../models/elecciones/votos-12/infoAppMovil';
import { votosGraf } from '../../models/elecciones/totalVotos';
import { escuelas } from '../../models/comunes/establecimientos';

export const postDatos = async (req: Request, res: Response) => {
     let infoAppM: any = req.body;

     for (let dataApp of infoAppM) {
          let votoExiste = await verificaVoto(dataApp);
          console.log(votoExiste);

          if (!votoExiste) {
               console.log('yaExisteee');
               dataApp.votoSubido = 'si';
          } else {
               let result = await votoAdh.findOne(
                    { mesa: dataApp.mesa, orden: dataApp.orden },
                    { dni: 1, afiliado: 1, resPlanilla: 1, genero: 1 }
               );

               // console.log(result);
               if (result !== null) {
                    await updateVotoGeoEsc(dataApp.mesa, dataApp.establecimiento);
                    await updateVotoXPersona(result.resPlanilla);
                    await updateVotoXGraf(result);

                    (result.realizoVoto = 'si'), result.save();
                    dataApp.votoSubido = 'si';
               } else {
                    await updateVotoGeoEsc(dataApp.mesa, dataApp.establecimiento);
               }
          }
     }

     res.status(200).json({
          ok: true,
          infoAppM,
     });
};

const updateVotoGeoEsc = async (mesa, establecimiento) => {
     await geoEscuela.findOne({ mesa: mesa, establecimiento: establecimiento }, (err, data) => {
          if (err) {
               return false;
          } else {
               if (data !== null) {
                    //  console.log(data);
                    data.votaron + 1, data.save();
               }
          }
     });
     return true;
};

const updateVotoXPersona = async (resplanilla) => {
     let id: any;

     for (let usr of resplanilla) {
          if (usr.idCoordinador && usr.idReferente && usr.idResPlanilla) {
               id = usr.idResPlanilla;
          } else if (usr.idCoordinador && usr.idReferente) {
               id = usr.idReferente;
          } else {
               id = usr.idCoordinador;
          }

          await usuarios.findById(id, { 'datosPersonales.dni': 1 }, {}, async (err, data) => {
               if (err) {
                    return false;
               } else if (data !== null) {
                    await votoPersona.findOne({ dni: data.datosPersonales.dni }, (err, data) => {
                         if (err) {
                              return false;
                         } else if (data !== null) {
                              (data.votaron = +1),
                                   ///////// console.log()
                                   data.save();
                         }
                    });
               }
          });
     }
     return true;
};

const updateVotoXGraf = async (datos) => {
     //  console.log(datos);
     for (let coord of datos.resPlanilla) {
          if (coord.idCoordinador !== '') {
               await votosGraf.findOne({ idUsuario: coord.idCoordinador }, (err, resp) => {
                    if (err) {
                         console.log(err);
                    } else {
                         datos.afiliado === 'Es afiliado al MPN' && resp.votaronA++;
                         datos.genero === 'F' && resp.votaronF++;
                         resp.votaron++;
                         resp.save();
                    }
               });
          }
          if (coord.idReferente !== '') {
               await votosGraf.findOne({ idUsuario: coord.idReferente }, (err, resp) => {
                    if (err) {
                         console.log(err);
                    } else {
                         //   console.log(resp);
                         datos.afiliado === 'Es afiliado al MPN' && resp.votaronA++;
                         datos.genero === 'F' && resp.votaronF++;
                         resp.votaron++;
                         resp.save();
                    }
               });
          }
          if (coord.idResPlanilla !== '' && coord.idReferente !== coord.idResPlanilla) {
               await votosGraf.findOne({ idUsuario: coord.idResPlanilla }, (err, resp) => {
                    if (err) {
                         console.log(err);
                    } else {
                         datos.afiliado === 'Es afiliado al MPN' && resp.votaronA++;
                         datos.genero === 'F' && resp.votaronF++;
                         resp.votaron++;
                         resp.save();
                    }
               });
          }
     }
};

const verificaVoto = async (datos) => {
     let esc = await escuelas.findOne({ usuario: datos.usuario }, { establecimiento: 1 });
     if (esc !== null) {
          let guardar: any = await infoAppMovil.findOne({ establecimiento: esc.establecimiento });

          if (guardar !== null) {
               let mesaIndx = await guardar.mesa.findIndex((element) => element.mesa === datos.mesa);

               if (mesaIndx !== -1) {
                    let ordIndx = await guardar.mesa[mesaIndx].orden.findIndex(
                         (element) => element.orden === datos.orden
                    );

                    if (ordIndx === -1) {
                         let nuevoOrden = {
                              orden: datos.orden,
                              usuario: datos.usuario,
                              fecha: moment().format('YYYY/MM/DD'),
                              hora: moment().format('hh:mm'),
                              votoSubido: 'si',
                         };
                         guardar.mesa[mesaIndx].orden.push(nuevoOrden);
                         await guardar.save();
                         return true;
                    } else {
                         return false;
                    }
               } else {
                    let mesaNueva = {
                         mesa: datos.mesa,
                         orden: {
                              orden: datos.orden,
                              usuario: datos.usuario,
                              fecha: moment().format('YYYY/MM/DD'),
                              hora: moment().format('hh:mm'),
                              votoSubido: 'si',
                         },
                    };

                    guardar.mesa.push(mesaNueva);
                    await guardar.save();

                    return true;
               }
          } else {
               const voto = {
                    establecimiento: esc.establecimiento,
                    mesa: {
                         mesa: datos.mesa,
                         orden: {
                              orden: datos.orden,
                              usuario: datos.usuario,
                              fecha: moment().format('YYYY/MM/DD'),
                              hora: moment().format('hh:mm'),
                              votoSubido: 'si',
                         },
                    },
               };

               const guardar = new infoAppMovil(voto);
               await guardar.save();
               return true;
          }
     }
};
