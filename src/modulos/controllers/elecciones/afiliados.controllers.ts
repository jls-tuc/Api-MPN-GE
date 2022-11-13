import { Request, Response } from 'express';
import { seccionales } from '../../models/comunes/seccionales';
import { afiliado2022 } from '../../models/elecciones/afiliados2022';
import { afiliado } from '../../models/elecciones/afiliadosMpn';

export const getAfiliado = async (req: Request, res: Response) => {
     let doc: any = req.query.documento;

     await afiliado.findOne({ documento: doc }, (err, data) => {
          console.log(data);
          if (err) {
               return res.status(204).json({
                    ok: false,
                    msg: 'Verificar los datos ingresados',
                    err,
               });
          }
          if (data !== null) {
               return res.status(200).json({
                    ok: true,
                    data,
               });
          } else {
               return res.status(200).json({
                    ok: false,
                    msg: 'El Numero de documento no existe en el padron.',
               });
          }
     });
};
export const getSecCir = async (req: Request, res: Response) => {
     try {
          let secCir = await afiliado.find({}, { seccion: 1, circuito: 1, _id: 0 });
          res.status(200).json({ ok: true, secCir });
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};

export const afiliadoFilto = async (req: Request, res: Response) => {
     let queryOr: any = [];
     let queryAnd: any = {};

     if (req.body.data.seccional) {
          queryAnd.seccional = req.body.data.seccional;
     }
     if (req.body.data.localidad.length) {
          req.body.data.localidad.forEach((element) => {
               let circuito: any = {};
               circuito.circuito = element;
               queryOr.push(circuito);
          });
     }
     if (req.body.data.seccion) {
          queryAnd.seccion = req.body.data.seccion;
     }
     if (req.body.data.circuito) {
          queryAnd.circuito = req.body.data.circuito;
     }
     if (
          req.body.data.genero !== '' ||
          req.body.data.genero === 'M' ||
          req.body.data.genero === 'F' ||
          req.body.data.genero === 'X'
     ) {
          queryAnd.genero = req.body.data.genero;
     }
     if (req.body.data.estado !== '') {
          queryAnd.estado_afiliacion = req.body.data.estado;
     }
     if (req.body.data.profesion !== '') {
          queryAnd.profesion = req.body.data.profesion;
     }

     try {
          afiliado.find(
               {
                    $and: [
                         {
                              $or: queryOr,
                         },
                         queryAnd,
                    ],
               },
               (err, data) => res.status(200).json({ ok: true, data })
          );
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};

export const getOneAfiliado = async (req: Request, res: Response) => {
     let doc: any = req.query.dni;

     await afiliado.find({ documento: doc }, (err, data) => {
          if (err) {
               return res.status(204).json({
                    ok: false,
                    msg: 'Verificar los datos ingresados',
                    err,
               });
          }
          if (data.length) {
               return res.status(200).json({
                    ok: true,
                    data,
               });
          } else {
               return res.status(200).json({
                    ok: false,
                    msg: 'El Numero de documento no existe en el padron.',
               });
          }
     });
};

///// actualizar estado del afiliado

export const updateEstadoAf = async (req: Request, res: Response) => {
     let filtro = { documento: req.body.upd.documento };
     let upd: any = {};
     upd.estado_afiliacion = req.body.upd.estadoAf;
     upd.fecha_afiliacion = req.body.upd.fechaAfilia;
     upd.fecha_baja = req.body.upd.fechaBaja;
     upd.observacion = req.body.upd.obserBaja;

     try {
          await afiliado.findOneAndUpdate(filtro, upd);
          await afiliado.find(filtro, (err, data) => {
               res.status(200).json({ ok: true, data });
          });
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};

////// estadisticas de los afiliados

export const estAfiliados = async (req: Request, res: Response) => {
     try {
          let total = await afiliado.find({ estado_afiliacion: 'afiliado' }).countDocuments();

          let totalFemenino = await afiliado
               .find({ $and: [{ genero: 'f' }, { estado_afiliacion: 'afiliado' }] })
               .countDocuments();

          let totalMasculino = await afiliado
               .find({ $and: [{ genero: 'm' }, { estado_afiliacion: 'afiliado' }] })
               .countDocuments();

          let totalOtro = await afiliado
               .find({ $and: [{ genero: 'x' }, { estado_afiliacion: 'afiliado' }] })
               .countDocuments();

          res.status(200).json({ ok: true, total, totalFemenino, totalMasculino, totalOtro });
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};

export const grafAfiliados = async (req: Request, res: Response) => {
     interface ISerie {
          name: string;
          value: number;
     }
     interface IgraficoBar {
          name: string;
          series: ISerie[];
     }

     try {
          let grafico: any = [];
          let dataSecc = await seccionales.find({}, { seccional: 1 }).sort({ seccional: 'asc' });

          for (let secc of dataSecc) {
               let info: IgraficoBar = {
                    name: '',
                    series: [],
               };
               let infoAfiliado = await afiliado
                    .findOne({ $and: [{ seccional: secc.seccional }, { estado_afiliacion: 'afiliado' }] })
                    .count();

               let infoVerificar = await afiliado
                    .findOne({ $and: [{ seccional: secc.seccional }, { estado_afiliacion: 'verificar' }] })
                    .count();
               let infoPendiente = await afiliado
                    .findOne({ $and: [{ seccional: secc.seccional }, { estado_afiliacion: 'pendiente' }] })
                    .count();
               let infoBaja = await afiliado
                    .findOne({ $and: [{ seccional: secc.seccional }, { estado_afiliacion: 'baja' }] })
                    .count();

               let exist = grafico.includes((elem: any) => elem.name === secc.seccional);
               if (!exist) {
                    info.name = secc.seccional;
                    if (infoAfiliado >= 0) {
                         let serie: any = { name: '', value: 0 };
                         serie.name = 'Afiliado';
                         serie.value = infoAfiliado | 0;
                         info.series.push(serie);
                    }
                    if (infoVerificar >= 0) {
                         let seriev: any = { name: '', value: 0 };
                         seriev.name = 'Verificar';
                         seriev.value = infoVerificar | 0;
                         info.series.push(seriev);
                    }
                    if (infoPendiente >= 0) {
                         let serieP: any = { name: '', value: 0 };
                         serieP.name = 'Pendiente';
                         serieP.value = infoPendiente | 0;
                         info.series.push(serieP);
                    }
                    if (infoBaja >= 0) {
                         let serieB: any = { name: '', value: 0 };
                         serieB.name = 'Baja';
                         serieB.value = infoBaja | 0;
                         info.series.push(serieB);
                    }
                    grafico.push(info);
               }
          }

          res.status(200).json({ ok: true, grafico });

          /* await dataSecc.forEach(async (element) => {
          } */
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};

export const actPadronAf = async (req: Request, res: Response) => {
     try {
          let afSep = await afiliado2022.find(
               { circuito: 'NEUQUEN - CAPITAL' },
               {
                    documento: 1,
               }
          );

          let afiliadoAct = await afiliado.find(
               { $and: [{ seccional: 'neuquen', estado_afiliacion: 'afiliado' }] },
               { documento: 1 }
          );

          let documentos = [{}];
          for (let afDni of afSep) {
               let noExist = afiliadoAct.find((data) => data.documento === afDni.documento);

               !noExist && console.log(afDni.documento);
               !noExist && documentos.push(afDni.documento);
          }
          console.log('FINN');
          console.log(documentos.length);

          /*   for (let dataAfNuevo of afSep) {
               if (dataAfNuevo.circuito === 'NEUQUEN - CAPITAL') {
                    dataAfNuevo.circuito = 'neuquen';
               }

               await afiliado.findOneAndUpdate(
                    { documento: dataAfNuevo.documento },
                    {
                         seccion: dataAfNuevo.seccion,
                         cod_seccion: dataAfNuevo.cod_seccion,
                         circuito: dataAfNuevo.circuito,
                         cod_circuito: dataAfNuevo.circuito,
                         fecha_domicilio: dataAfNuevo.fecha_domicilio,
                         domicilio: dataAfNuevo.domicilio,
                    }
               );
          } */

          /*  for (let afaAct of afiliadoAct) {
               let exist = await afSep.find((data) => data.documento === afaAct.documento);
               if (!exist && afaAct.estado_afiliacion === 'afiliado') {
                    await afiliado.findOneAndUpdate(
                         { documento: afaAct.documento },
                         {
                              estado_afiliacion: 'verificar',
                              fecha_verificacion: '13-09-2022',
                              observacion:
                                   'Información migrada el 13/09/2022, de acuerdo al padrón enviado por la junta electoral el 09/2022.',
                         }
                    );
               }
          if (exist && afaAct.estado_afiliacion === 'pendiente') {
                    let cambio = { ...afaAct, exist };
                    await afiliado.findOneAndUpdate(
                         {
                              documento: afaAct.documento,
                              observacion:
                                   'Información migrada el 13/09/2022, de acuerdo al padrón enviado por la junta electoral el 13/09/2022.',
                         },
                         { cambio }
                    );
                   
               } 
          } */
          console.log('termino el primer for');
          console.log('arranca el segundo');
          /* for (let nAfiliado of afSep) {
               let exist = afiliadoAct.find((data) => data.documento === nAfiliado.documento);

               if (!exist) {
                    if (nAfiliado.circuito === 'NEUQUEN - CAPITAL') {
                         nAfiliado.circuito = 'neuquen';
                    }

                    let secc = await seccionales.findOne(
                         { 'localidades_parajes_comprende.nombre': nAfiliado.circuito.toLowerCase() },
                         { seccional: 1 }
                    );

                    let afiliadoSep = {
                         seccion: nAfiliado.seccion,
                         cod_seccion: nAfiliado.cod_seccion,
                         circuito: nAfiliado.circuito,
                         cod_circuito: nAfiliado.cod_circuito,
                         apellido: nAfiliado.apellido,
                         nombre: nAfiliado.nombre,
                         genero: nAfiliado.genero,
                         tipo_documento: nAfiliado.tipo_documento,
                         documento: nAfiliado.documento,
                         fecha_nacimiento: nAfiliado.fecha_nacimiento,
                         clase: nAfiliado.clase,
                         estado_actual_elector: nAfiliado.estado_actual_elector,
                         estado_afiliacion: nAfiliado.estado_afiliacion,
                         fecha_afiliacion: nAfiliado.fecha_afiliacion,
                         analfabeto: nAfiliado.analfabeto,
                         profesión: nAfiliado.profesion,
                         fecha_domicilio: nAfiliado.fecha_domicilio,
                         domicilio: nAfiliado.domicilio,
                         nro_lote: '',
                         establecimiento: '',
                         dom_establecimiento: '',
                         mesa: '',
                         orden: '',
                         seccional: secc.seccional,
                         fecha_pendiente: '',
                         fecha_baja: '',
                         fecha_verificacion: '',
                         observacion:
                              'Información migrada el 01/09/2022, de acuerdo al padrón enviado por la junta electoral el 07/2022.',
                    };

                    let nuevoAfiliado = new afiliado(afiliadoSep);
                    await nuevoAfiliado.save();
               }
          } */

          res.status(200).json({
               ok: 'fin',
               documentos,
          });
     } catch (error) {
          res.status(200).json({
               error,
          });
     }
};
