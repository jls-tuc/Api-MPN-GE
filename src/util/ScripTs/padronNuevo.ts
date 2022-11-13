import { Request, Response } from 'express';
import { votoProv, IvotoProv } from '../../modulos/models/elecciones/votoProvisorio';
import { padron, Ipadron } from '../../modulos/models/elecciones/padronNeuquen';
import { votoAdh, IvotoAD } from '../../modulos/models/elecciones/votoAdhesion';
import { geoEscuela, IgeoEscuela } from '../../modulos/models/elecciones/geo/votosXEsc';
import { geoEscuelaElec } from '../../modulos/models/elecciones/geo/geoEscuelas';
import { geoCircuitos } from '../../modulos/models/comunes/circuitoElectoralPoligono';
import { padronIndepAf2022 } from '../../modulos/models/comunes/padronIndpAfi2022';
import { padronEscOk } from '../../modulos/models/comunes/padronEscOk';
import { afiliado } from '../../../.history/src/modulos/models/elecciones/afiliadosMpn_20220830214450';

export const crearCapa = async (req: Request, res: Response) => {
     let votos: any = await votoProv.find({}, { dni: 1 }).lean();

     for (let voto of votos) {
          let votoPadron: any = await padron.findOne({ DOCUMENTO: voto.dni });
          if (votoPadron != null) {
               await escuelaGeo(votoPadron);
          } else {
               console.log('nooooo');
               return;
          }
     }
};

const escuelaGeo = async (esc: any) => {
     let escuela: IgeoEscuela = await geoEscuela.findOne({ establecimiento: esc.establecimiento });

     if (escuela != null) {
     }
};

export const nuevoGeoEsc = async (req: Request, res: Response) => {
     console.log('inicia');
     try {
          let geoViejos = await geoEscuela.find();

          for (let esc of geoViejos) {
               await geoEscuelaElec.findOne({ establecimiento: esc.establecimiento }, async (err, escNueva) => {
                    if (escNueva) {
                         let existMesa = escNueva.elecciones.some((mesa) => mesa.mesaNro === esc.mesaNro);

                         if (!existMesa) {
                              escNueva.elecciones.push({
                                   eleccion: 'paso2021',
                                   tipoEleccion: 'elecciones legislativas ',
                                   estadoEleccion: 'realizadas',
                                   fechaEleccion: '12/09/2021',
                                   mesaNro: esc.mesaNro,
                                   votosMesa: esc.votosMesa,
                                   masculino: esc.masculino,
                                   femenino: esc.femenino,
                                   afiliado: esc.afiliado,
                                   votaron: esc.votaron,
                                   votaronA: esc.votaronA,
                                   votaronF: esc.votaronF,
                              });
                              await escNueva.save();
                         }
                    } else {
                         let dataNueva = {
                              establecimiento: esc.establecimiento,
                              estado: 'disponible',
                              localidad: esc.localidad,
                              elecciones: [
                                   {
                                        eleccion: 'paso2021',
                                        tipoEleccion: 'elecciones legislativas ',
                                        estadoEleccion: 'realizadas',
                                        fechaEleccion: '12/09/2021',
                                        mesaNro: esc.mesaNro,
                                        votosMesa: esc.votosMesa,
                                        masculino: esc.masculino,
                                        femenino: esc.femenino,
                                        afiliado: esc.afiliado,
                                        votaron: esc.votaron,
                                        votaronA: esc.votaronA,
                                        votaronF: esc.votaronF,
                                   },
                              ],
                              typeGeo: esc.typeGeo,
                              lon: esc.lon,
                              lat: esc.lat,
                         };
                         const nuevaEsc = new geoEscuelaElec(dataNueva);
                         await nuevaEsc.save();
                    }
               });
          }

          geoEscuelaElec.find({}, (err, data) => {
               res.status(200).json({ ok: true, data });
          });
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};

export const afCircuitos = async (req: Request, res: Response) => {
     let padronTotal: any = await padronIndepAf2022.find({}, { codCircuito: 1, estadoAfiliacion: 1, _id: 0 }).lean();
     let totales: any = [];

     let padronOk = [];
     for (let pad of padronTotal) {
          let cant = pad.codCircuito.length;
          let cant3 = '000';
          let cant2 = '00';
          let cant1 = '0';
          cant === 1 && (pad.codCircuito = cant3.concat(pad.codCircuito));
          cant === 2 && (pad.codCircuito = cant2.concat(pad.codCircuito));
          cant === 3 && (pad.codCircuito = cant1.concat(pad.codCircuito));
          padronOk.push(pad);
     }
     for (let dataNueva of padronOk) {
          let exist = totales.findIndex((element) => element.codCircuito === dataNueva.codCircuito);
          if (exist === -1) {
               dataNueva.estadoAfiliacion === 'afiliado' &&
                    totales.push({ codCircuito: dataNueva.codCircuito, totalAfiliados: 1, totalIndependientes: 0 });

               dataNueva.estadoAfiliacion === 'independiente' &&
                    totales.push({ codCircuito: dataNueva.codCircuito, totalAfiliados: 0, totalIndependientes: 1 });
          }

          if (exist != -1) {
               dataNueva.estadoAfiliacion === 'afiliado' && (totales[exist].totalAfiliados += 1);
               dataNueva.estadoAfiliacion === 'independiente' && (totales[exist].totalIndependientes += 1);
          }
     }

     for (let info of totales) {
          await geoCircuitos.findOneAndUpdate(
               { 'properties.circuito': info.codCircuito },
               {
                    'properties.totalAfiliados': info.totalAfiliados,
                    'properties.totalIndependientes': info.totalIndependientes,
               }
          );
     }

     res.status(200).json({ ok: true, totales });
};

export const circEsc2022 = async (req: Request, res: Response) => {
     let esc: any = await padronEscOk
          .find(
               {},
               {
                    codCircuito: 1,
                    establecimiento: 1,
                    domEstablecimiento: 1,
                    localidad: 1,
                    matricula: 1,
                    mesa: 1,
                    orden: 1,
                    _id: 0,
               }
          )
          .lean()
          .sort({ codCircuito: 1 });
     let escCirc: any = [];
     let padronN: any = [];
     for (let cirFix of esc) {
          let cant = cirFix.codCircuito.length;
          let cant3 = '000';
          let cant2 = '00';
          let cant1 = '0';
          cant === 1 && (cirFix.codCircuito = cant3.concat(cirFix.codCircuito));
          cant === 2 && (cirFix.codCircuito = cant2.concat(cirFix.codCircuito));
          cant === 3 && (cirFix.codCircuito = cant1.concat(cirFix.codCircuito));
          padronN.push(cirFix);
     }

     let mesa = [...new Set(padronN.map((element) => element.mesa))];

     for (let item of mesa) {
          let esc = padronN.find((element) => element.mesa === item);

          let cirIndx = escCirc.findIndex((element) => element.codCircuito === esc.codCircuito);

          if (cirIndx === -1) {
               escCirc.push({
                    codCircuito: esc.codCircuito,
                    establecimientos: [
                         {
                              establecimiento: esc.establecimiento,
                              localidad: esc.localidad,
                              domEstablecimiento: esc.domEstablecimiento,

                              mesas: [
                                   {
                                        mesa: esc.mesa,
                                   },
                              ],
                         },
                    ],
               });
          } else {
               let indx = escCirc[cirIndx].establecimientos.findIndex(
                    (element) => element.establecimiento === esc.establecimiento
               );

               if (indx === -1) {
                    escCirc[cirIndx].establecimientos.push({
                         establecimiento: esc.establecimiento,
                         localidad: esc.localidad,
                         domEstablecimiento: esc.domEstablecimiento,

                         mesas: [
                              {
                                   mesa: esc.mesa,
                              },
                         ],
                    });
               } else {
                    let mesaIndx = escCirc[cirIndx].establecimientos[indx].mesas.findIndex(
                         (element) => element.mesa === esc.mesa
                    );
                    mesaIndx === -1 && escCirc[cirIndx].establecimientos[indx].mesas.push({ mesa: esc.mesa });
               }
          }
     }

     for (let cir of escCirc) {
          await geoCircuitos.find({ 'properties.circuito': cir.codCircuito }, async (err, data) => {
               if (data) {
                    for (let it of data) {
                         it.properties.escuelas = cir.establecimientos;
                         await it.save();
                    }
               }
          });
     }

     res.status(200).json({ ok: true, escCirc });
};

export const votosEsc2022 = async (req: Request, res: Response) => {
     let escuelas: any = [
          {
               establecimiento: '',
               elecciones: [
                    {
                         eleccion: 'internas 2022',
                         tipoEleccion: 'elecciones generales',
                         estadoEleccion: 'proceso',
                         fechaEleccion: '13/11/2022',
                         mesaNro: '',
                         votosMesa: 0,
                         masculino: 0,
                         femenino: 0,
                         afiliado: 0,
                         votaron: 0,
                         votaronA: 0,
                         votaronF: 0,
                    },
               ],
          },
     ];
     let escHab = {
          eleccion: 'internas 2022',
          tipoEleccion: 'elecciones generales',
          estadoEleccion: 'proceso',
          fechaEleccion: '13/11/2022',
          mesaNro: '',
          votosMesa: 0,
          masculino: 0,
          femenino: 0,
          afiliado: 0,
          votaron: 0,
          votaronA: 0,
          votaronF: 0,
     };

     let padron2022: any = await padronEscOk
          .find(
               {},
               {
                    establecimiento: 1,
                    genero: 1,
                    mesa: 1,
                    estadoAfiliacion: 1,
                    _id: 0,
               }
          )
          .lean()
          .sort({ establecimiento: 1 });

     for (let voto of padron2022) {
          let escIndex = escuelas.findIndex((item) => item.establecimiento === voto.establecimiento);

          if (escIndex === -1) {
               if (voto.genero === 'M' && voto.estadoAfiliacion === 'afiliado') {
                    escuelas.push({
                         establecimiento: voto.establecimiento,
                         elecciones: [
                              {
                                   eleccion: 'internas 2022',
                                   tipoEleccion: 'elecciones generales',
                                   estadoEleccion: 'proceso',
                                   fechaEleccion: '13/11/2022',
                                   mesaNro: voto.mesa,
                                   votosMesa: 1,
                                   masculino: 1,
                                   femenino: 0,
                                   otro: 0,
                                   afiliado: 1,
                                   votaron: 0,
                                   votaronA: 0,
                                   votaronF: 0,
                                   votaronO: 0,
                              },
                         ],
                    });
               }

               if (voto.genero === 'F' && voto.estadoAfiliacion === 'afiliado') {
                    escuelas.push({
                         establecimiento: voto.establecimiento,
                         elecciones: [
                              {
                                   eleccion: 'internas 2022',
                                   tipoEleccion: 'elecciones generales',
                                   estadoEleccion: 'proceso',
                                   fechaEleccion: '13/11/2022',
                                   mesaNro: voto.mesa,
                                   votosMesa: 1,
                                   masculino: 0,
                                   femenino: 1,
                                   otro: 0,
                                   afiliado: 1,
                                   votaron: 0,
                                   votaronA: 0,
                                   votaronF: 0,
                                   votaronO: 0,
                              },
                         ],
                    });
               }
               if (voto.genero === 'O' && voto.estadoAfiliacion === 'afiliado') {
                    escuelas.push({
                         establecimiento: voto.establecimiento,
                         elecciones: [
                              {
                                   eleccion: 'internas 2022',
                                   tipoEleccion: 'elecciones generales',
                                   estadoEleccion: 'proceso',
                                   fechaEleccion: '13/11/2022',
                                   mesaNro: voto.mesa,
                                   votosMesa: 1,
                                   masculino: 0,
                                   femenino: 0,
                                   otro: 0,
                                   afiliado: 1,
                                   votaron: 0,
                                   votaronA: 0,
                                   votaronF: 0,
                                   votaronO: 0,
                              },
                         ],
                    });
               }
               if (voto.genero === 'M' && voto.estadoAfiliacion === 'independiente') {
                    escuelas.push({
                         establecimiento: voto.establecimiento,
                         elecciones: [
                              {
                                   eleccion: 'internas 2022',
                                   tipoEleccion: 'elecciones generales',
                                   estadoEleccion: 'proceso',
                                   fechaEleccion: '13/11/2022',
                                   mesaNro: voto.mesa,
                                   votosMesa: 1,
                                   masculino: 1,
                                   femenino: 0,
                                   otro: 0,
                                   independientes: 1,
                                   afiliado: 0,
                                   votaron: 0,
                                   votaronA: 0,
                                   votaronF: 0,
                                   votaronO: 0,
                              },
                         ],
                    });
               }

               if (voto.genero === 'F' && voto.estadoAfiliacion === 'independiente') {
                    escuelas.push({
                         establecimiento: voto.establecimiento,
                         elecciones: [
                              {
                                   eleccion: 'internas 2022',
                                   tipoEleccion: 'elecciones generales',
                                   estadoEleccion: 'proceso',
                                   fechaEleccion: '13/11/2022',
                                   mesaNro: voto.mesa,
                                   votosMesa: 1,
                                   masculino: 0,
                                   femenino: 1,
                                   otro: 0,
                                   independientes: 1,
                                   afiliado: 0,
                                   votaron: 0,
                                   votaronA: 0,
                                   votaronF: 0,
                                   votaronO: 0,
                              },
                         ],
                    });
               }
               if (voto.genero === 'O' && voto.estadoAfiliacion === 'independiente') {
                    escuelas.push({
                         establecimiento: voto.establecimiento,
                         elecciones: [
                              {
                                   eleccion: 'internas 2022',
                                   tipoEleccion: 'elecciones generales',
                                   estadoEleccion: 'proceso',
                                   fechaEleccion: '13/11/2022',
                                   mesaNro: voto.mesa,
                                   votosMesa: 1,
                                   masculino: 0,
                                   femenino: 0,
                                   otro: 0,
                                   independientes: 1,
                                   afiliado: 0,
                                   votaron: 0,
                                   votaronA: 0,
                                   votaronF: 0,
                                   votaronO: 0,
                              },
                         ],
                    });
               }
          } else {
               let mesaIndex = escuelas[escIndex].elecciones.findIndex((item) => item.mesaNro === voto.mesa);

               if (mesaIndex === -1) {
                    if (voto.genero === 'M' && voto.estadoAfiliacion === 'afiliado') {
                         escuelas[escIndex].elecciones.push({
                              eleccion: 'internas 2022',
                              tipoEleccion: 'elecciones generales',
                              estadoEleccion: 'proceso',
                              fechaEleccion: '13/11/2022',
                              mesaNro: voto.mesa,
                              votosMesa: 1,
                              masculino: 1,
                              femenino: 0,
                              otro: 0,
                              afiliado: 1,
                              votaron: 0,
                              votaronA: 0,
                              votaronF: 0,
                              votaronO: 0,
                         });
                    }
                    if (voto.genero === 'F' && voto.estadoAfiliacion === 'afiliado') {
                         escuelas[escIndex].elecciones.push({
                              eleccion: 'internas 2022',
                              tipoEleccion: 'elecciones generales',
                              estadoEleccion: 'proceso',
                              fechaEleccion: '13/11/2022',
                              mesaNro: voto.mesa,
                              votosMesa: 1,
                              masculino: 0,
                              femenino: 1,
                              otro: 0,
                              afiliado: 1,
                              votaron: 0,
                              votaronA: 0,
                              votaronF: 0,
                              votaronO: 0,
                         });
                    }
                    if (voto.genero === 'O' && voto.estadoAfiliacion === 'afiliado') {
                         escuelas[escIndex].elecciones.push({
                              eleccion: 'internas 2022',
                              tipoEleccion: 'elecciones generales',
                              estadoEleccion: 'proceso',
                              fechaEleccion: '13/11/2022',
                              mesaNro: voto.mesa,
                              votosMesa: 1,
                              masculino: 0,
                              femenino: 0,
                              otro: 0,
                              afiliado: 1,
                              votaron: 0,
                              votaronA: 0,
                              votaronF: 0,
                              votaronO: 0,
                         });
                    }
                    if (voto.genero === 'M' && voto.estadoAfiliacion === 'independiente') {
                         escuelas[escIndex].elecciones.push({
                              eleccion: 'internas 2022',
                              tipoEleccion: 'elecciones generales',
                              estadoEleccion: 'proceso',
                              fechaEleccion: '13/11/2022',
                              mesaNro: voto.mesa,
                              votosMesa: 1,
                              masculino: 1,
                              femenino: 0,
                              otro: 0,
                              independientes: 1,
                              afiliado: 0,
                              votaron: 0,
                              votaronA: 0,
                              votaronF: 0,
                              votaronO: 0,
                         });
                    }

                    if (voto.genero === 'F' && voto.estadoAfiliacion === 'independiente') {
                         escuelas[escIndex].elecciones.push({
                              eleccion: 'internas 2022',
                              tipoEleccion: 'elecciones generales',
                              estadoEleccion: 'proceso',
                              fechaEleccion: '13/11/2022',
                              mesaNro: voto.mesa,
                              votosMesa: 1,
                              masculino: 0,
                              femenino: 1,
                              otro: 0,
                              independientes: 1,
                              afiliado: 0,
                              votaron: 0,
                              votaronA: 0,
                              votaronF: 0,
                              votaronO: 0,
                         });
                    }
                    if (voto.genero === 'O' && voto.estadoAfiliacion === 'independiente') {
                         escuelas[escIndex].elecciones.push({
                              eleccion: 'internas 2022',
                              tipoEleccion: 'elecciones generales',
                              estadoEleccion: 'proceso',
                              fechaEleccion: '13/11/2022',
                              mesaNro: voto.mesa,
                              votosMesa: 1,
                              masculino: 0,
                              femenino: 0,
                              otro: 0,
                              independientes: 1,
                              afiliado: 0,
                              votaron: 0,
                              votaronA: 0,
                              votaronF: 0,
                              votaronO: 0,
                         });
                    }
               } else {
                    if (voto.genero === 'M' && voto.estadoAfiliacion === 'afiliado') {
                         escuelas[escIndex].elecciones[mesaIndex].votosMesa += 1;
                         escuelas[escIndex].elecciones[mesaIndex].masculino += 1;
                         escuelas[escIndex].elecciones[mesaIndex].afiliado += 1;
                    }
                    if (voto.genero === 'F' && voto.estadoAfiliacion === 'afiliado') {
                         escuelas[escIndex].elecciones[mesaIndex].votosMesa += 1;
                         escuelas[escIndex].elecciones[mesaIndex].femenino += 1;
                         escuelas[escIndex].elecciones[mesaIndex].afiliado += 1;
                    }
                    if (voto.genero === 'O' && voto.estadoAfiliacion === 'afiliado') {
                         escuelas[escIndex].elecciones[mesaIndex].votosMesa += 1;
                         escuelas[escIndex].elecciones[mesaIndex].otro += 1;
                         escuelas[escIndex].elecciones[mesaIndex].afiliado += 1;
                    }
                    if (voto.genero === 'M' && voto.estadoAfiliacion !== 'afiliado') {
                         escuelas[escIndex].elecciones[mesaIndex].votosMesa += 1;
                         escuelas[escIndex].elecciones[mesaIndex].masculino += 1;
                         escuelas[escIndex].elecciones[mesaIndex].independientes++;
                    }

                    if (voto.genero === 'F' && voto.estadoAfiliacion !== 'afiliado') {
                         escuelas[escIndex].elecciones[mesaIndex].votosMesa += 1;
                         escuelas[escIndex].elecciones[mesaIndex].femenino += 1;
                         escuelas[escIndex].elecciones[mesaIndex].independientes++;
                    }
                    if (voto.genero === 'O' && voto.estadoAfiliacion !== 'afiliado') {
                         escuelas[escIndex].elecciones[mesaIndex].votosMesa += 1;
                         escuelas[escIndex].elecciones[mesaIndex].otro += 1;
                         escuelas[escIndex].elecciones[mesaIndex].independientes++;
                    }
               }
          }
     }

     for (let esc of escuelas) {
          geoEscuelaElec.findOne({ establecimiento: esc.establecimiento }, async (err, data) => {
               if (data) {
                    for (let item of esc.elecciones) {
                         data.elecciones.push(item);
                         await data.save();
                    }
               } else {
                    console.log('No existe la esc', esc.establecimiento);
               }
          });
     }

     res.status(200).json({ ok: true, escuelas });
};
