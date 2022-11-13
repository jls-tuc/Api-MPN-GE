import { Request, Response } from 'express';
import { padronEscOk } from '../../../models/comunes/padronEscOk';
import { geoEscuelaElec } from '../../../models/elecciones/geo/geoEscuelas';

export const getEscuelasNqn = async (req: Request, res: Response) => {
     try {
          let esc = geoEscuelaElec.find({}).lean().sort({ establecimiento: 1 });

          res.status(200).json({ ok: true, esc });
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};

export const postChasqui = async (req: Request, res: Response) => {
     try {
          let data: any = await padronEscOk.findOne(
               { mesa: req.body.mesa, orden: req.body.nroOrden },
               { voto: 1, orden: 1 }
          );

          if (!data.voto) {
               await padronEscOk.findOneAndUpdate(
                    { mesa: req.body.mesa, orden: req.body.nroOrden },
                    { voto: true },
                    { new: true },
                    async (err, element: any) => {
                         element.voto && (await IncrementarValores(req.body, element.estadoAfiliacion, element.genero));
                    }
               );
               res.status(200).json({ ok: true, msg: 'Se modificó correctamente.' });
          } else {
               res.status(200).json({ ok: false, msg: `La orden nro:${data.orden}, ya se encuentra cargada.!` });
          }
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};

export const grafChasquis = async (req: Request, res: Response) => {
     let dataTotales: any = [];
     let totalGral: any = {
          totalElectores: 0,
          totalAf: 0,
          totalInd: 0,
          totalF: 0,
          totalM: 0,
          totalO: 0,
          votosF: 0,
          votosM: 0,
          votosO: 0,
          votosAf: 0,
          votosInd: 0,
     };
     let resultados = await geoEscuelaElec
          .find({ 'elecciones.eleccion': 'internas 2022' }, { estblecimiento: 1, localidad: 1, elecciones: 1, _id: 0 })
          .sort({ establecimiento: 1 });

     for (let result of resultados) {
          let eleccion2022: any = result.elecciones.filter((element) => element.eleccion !== 'paso2021');
          if (eleccion2022.length) {
               for (let item of eleccion2022) {
                    let locaIndx = dataTotales.findIndex((element) => element.localidad === result.localidad);

                    if (locaIndx === -1) {
                         dataTotales.push({
                              localidad: result.localidad,
                              totalElectores: item.votosMesa,
                              totalAf: item.afiliado,
                              totalInd: item.independientes,
                              totalF: item.femenino,
                              totalM: item.masculino,
                              totalO: item.otro,
                              votosF: item.votaronF,
                              votosM: item.votaron - item.votaronF - item.votaronO,
                              votosO: item.votaronO,
                              votosAf: item.votaronA,
                              votosInd: item.votaron - item.votaronA,
                         });
                    } else {
                         dataTotales[locaIndx].totalElectores += item.votosMesa;
                         dataTotales[locaIndx].totalAf += item.afiliado;
                         dataTotales[locaIndx].totalInd += item.independientes;
                         dataTotales[locaIndx].totalF += item.femenino;
                         dataTotales[locaIndx].totalM += item.masculino;
                         dataTotales[locaIndx].totalO += item.otro;
                         dataTotales[locaIndx].votosF += item.votaronF;
                         dataTotales[locaIndx].votosM += item.votaron - item.votaronF - item.votaronO;
                         dataTotales[locaIndx].votosO += item.votaronO;
                         dataTotales[locaIndx].votosAf += item.votaronA;
                         dataTotales[locaIndx].votosInd += item.votaron - item.votaronA;
                    }
               }
          }
     }

     for (let total of dataTotales) {
          totalGral.totalElectores += total.totalElectores;
          totalGral.totalAf += total.totalAf;
          totalGral.totalInd += total.totalInd;
          totalGral.totalF += total.totalF;
          totalGral.totalM += total.totalM;
          totalGral.totalO += total.totalO;
          totalGral.votosF += total.votosF;
          totalGral.votosM += total.votosM;
          totalGral.votosO += total.votosO;
          totalGral.votosAf += total.votosAf;
          totalGral.votosInd += total.votosInd;
     }
     res.status(200).json({ ok: true, totalGral, dataTotales });
};

const IncrementarValores = async (datos: any, estadoAfiliacion: string, genero: string) => {
     await geoEscuelaElec.findOne({ establecimiento: datos.establecimiento.toLowerCase() }, async (err, data: any) => {
          if (data) {
               let mesaIndx = data.elecciones.findIndex(
                    (mesa) => mesa.eleccion === datos.eleccion && mesa.mesaNro === datos.mesa
               );
               if (mesaIndx !== -1) {
                    genero === 'F' && (data.elecciones[mesaIndx].votaronF += 1);
                    genero === 'O' && (data.elecciones[mesaIndx].votaronO += 1);
                    estadoAfiliacion === 'afiliado' && (data.elecciones[mesaIndx].votaronA += 1);
                    data.elecciones[mesaIndx].votaron += 1;
                    await data.save();
               }
          }
     });
     return;
};
