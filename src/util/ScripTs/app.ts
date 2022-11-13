import { Request, Response } from 'express';
import { padronEscOk } from '../../modulos/models/comunes/padronEscOk';
import { afiliado } from '../../modulos/models/elecciones/afiliadosMpn';
import { estProv } from '../../modulos/models/elecciones/establecimientos';
import { geoEscuelaElec } from '../../modulos/models/elecciones/geo/geoEscuelas';
import { padron } from '../../modulos/models/elecciones/padronNeuquen';
import { votoAdh } from '../../modulos/models/elecciones/votoAdhesion';
import { actasEscrutinio } from '../../modulos/models/elecciones/votos-12/jsonApp';

export const crearJsonUsr = async (req: Request, res: Response) => {
     let establecimientos: any = await geoEscuelaElec.find({}, { establecimiento: 1, localidad: 1 });
     console.log(establecimientos);
     let data: any = [];
     let contEst = 0;
     for (let est of establecimientos) {
          if (contEst === 0) {
               let estTemp = {
                    establecimiento: est.establecimiento,
                    localidad: est.localidad,
                    usuario: est.establecimientos,
               };
               await data.push(estTemp);
          } else {
               if (est.establecimiento !== data[contEst - 1].establecimiento) {
                    let estTemp = {
                         establecimiento: est.establecimiento,
                         localidad: est.localidad,
                         usuario: est.establecimientos,
                    };
                    await data.push(estTemp);
               } else {
                    if (est.localidad !== data[contEst - 1].localidad) {
                         let estTemp = {
                              establecimiento: est.establecimiento,
                              localidad: est.localidad,
                              usuario: est.establecimientos,
                         };
                         await data.push(estTemp);
                    }
               }
          }
          contEst++;
          console.log(`contEst`, contEst);
     }
     return res.status(200).json({
          ok: true,
          data,
     });
};
export const crearActasEscrutinioProv = async (req: Request, res: Response) => {
     let padEst: any = await padronEscOk
          .find({ establecimiento: { $exists: true } }, { establecimiento: 1, mesa: 1, orden: 1, localidad: 1, _id: 0 })
          .lean()
          .sort({ establecimiento: 1, mesa: 1, orden: 1, _id: 0 });
     let escuelasTotal: any = [];

     for (let esc of padEst) {
          let escIndex = escuelasTotal.findIndex((item: any) => item.establecimiento === esc.establecimiento);

          if (escIndex === -1) {
               escuelasTotal.push({
                    establecimiento: esc.establecimiento,
                    localidad: esc.localidad,
                    resultadosGral: {
                         listas: [],
                         votosNulos: 0,
                         votosRecurridos: 0,
                         votosBlanco: 0,
                         votosImpugnados: 0,
                         totalVotos: 0,
                         electoresVotaron: 0,
                         sobresUrnas: 0,
                         diferencia: 0,
                    },
                    mesas: [
                         {
                              mesa: esc.mesa,
                              ordenTotal: 0,
                              actaCargada: false,
                              resultadoMesa: {
                                   listas: [],
                                   votosNulos: 0,
                                   votosRecurridos: 0,
                                   votosBlanco: 0,
                                   votosImpugnados: 0,
                                   totalVotos: 0,
                                   electoresVotaron: 0,
                                   sobresUrnas: 0,
                                   diferencia: 0,
                              },
                         },
                    ],
               });
          } else {
               let mesaIndx = escuelasTotal[escIndex].mesas.findIndex((item: any) => item.mesa === esc.mesa);
               if (mesaIndx === -1) {
                    escuelasTotal[escIndex].mesas.push({
                         mesa: esc.mesa,
                         actaCargada: false,
                         ordenTotal: 0,
                         resultadoMesa: {
                              listas: [],
                              votosNulos: 0,
                              votosRecurridos: 0,
                              votosBlanco: 0,
                              votosImpugnados: 0,
                              totalVotos: 0,
                              electoresVotaron: 0,
                              sobresUrnas: 0,
                              diferencia: 0,
                         },
                    });
               } else {
                    escuelasTotal[escIndex].mesas[mesaIndx].ordenTotal += 1;
               }
          }
     }
     for (let acta of escuelasTotal) {
          let nuevaActa = new actasEscrutinio(acta);
          await nuevaActa.save();
     }

     return res.status(200).json({
          ok: true,
          escuelasTotal,
     });
};
