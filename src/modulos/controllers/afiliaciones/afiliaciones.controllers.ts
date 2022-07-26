import { Request, Response } from 'express';
import moment from 'moment';
import { loteAfiliacion, ILoteAfiliacion } from '../../models/afiliaciones/grupoAfiliacion';
import { fichaImportar, fichaMigracion, loteImportar, loteMigracion } from '../../models/afiliaciones/migracion';
import { MPNPadron, padronmpn } from '../../models/afiliaciones/padronmpn';
import { clone } from '../../models/comunes/datosPersonales';
import { afiliado } from '../../models/elecciones/afiliadosMpn';
import { Ipadron, padron } from '../../models/elecciones/padronNeuquen';

export const getAllGrupos = async (req: Request, res: Response) => {
     await loteAfiliacion.find({}, (err, data) => {
          if (err) {
               res.status(200).json({ ok: false, err });
          } else {
               res.status(200).json({ ok: true, data });
          }
     });
};

export const saveGrupo = async (req: Request, res: Response) => {
     const data = new loteAfiliacion(req.body.data);
     await data.save((err, data) => {
          if (err) {
               res.status(200).json({ ok: false, err });
          } else {
               loteAfiliacion.find((err, data) => {
                    res.status(200).json({ ok: true, data });
               });
          }
     });
};


export const addAfiliadoGrupo = async (req: Request, res: Response) => {
     await loteAfiliacion.find({ nro: req.params.nroLote }, async (err, data: ILoteAfiliacion) => {
          if (err) {
               res.status(200).json({ ok: false, err });
          } else {
               data[0].planillas.push(req.body.data);
               await data[0].save();
               loteAfiliacion.find((err, data) => {
                    res.status(200).json({ ok: true, data });
               });
          }
     });
};

export const searchAfiliadoGrupo = async (req: Request, res: Response) => {
     await loteAfiliacion.findOne({ 'planillas.documento': req.body.dni }, (err, data) => {
          if (err) {
               res.status(200).json({ ok: false, err });
          } else {
               !data && res.status(200).json({ ok: true, msg: 'sin registros' });
               data && res.status(200).json({ ok: true, data });
          }
     });
};

//////update Grupo

export const updGrupo = (req: Request, res: Response) => {
     let upd: any = {};
     upd.usuarioResponsable = req.body.upd.usuarioResponsable;
     upd.lugarAfiliacion = req.body.upd.lugarAfiliacion;
     upd.fechaInicioAfiliacion = req.body.upd.fechaInicioAfiliacion;
     upd.fechaFinAfiliacion = req.body.upd.fechaFinAfiliacion;
     upd.estadoAfiliacion = req.body.upd.estadoAfiliacion;

     let options = { new: true, omitUndefined: true };

     try {
          loteAfiliacion.findByIdAndUpdate(req.params._id, upd, options, (err, data: ILoteAfiliacion) => {
               if (data) {
                    loteAfiliacion.find((err, data) => {
                         res.status(200).json({ ok: true, data });
                    });
               }
          });
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};

///presentacion de lte

export const presentarLteAndCne = (req: Request, res: Response) => {
     console.log(req.body);
     let updPre: any = {
          estadoAfiliacion: req.body.upd.estadoAfiliacion,
          datosJusElc: {
               fechaIngresoJunta: req.body.upd.fechaIngresoJunta,
          },
     };
     let updInfoJunta: any = {
          estadoAfiliacion: req.body.upd.estadoAfiliacion,
          datosJusElc: {
               fechaIngresoJunta: req.body.upd.fechaIngresoJunta,
               fechaRespuestaJunta: req.body.upd.fechaRespuestaJunta,
               estadoJunta: req.body.upd.estadoJunta,
               obserJunta: req.body.upd.obserJunta,
          },
     };
     let options = { new: true, omitUndefined: true };

     switch (req.body.op) {
          case 'presentar':
               try {
                    loteAfiliacion.findByIdAndUpdate(req.params._id, updPre, options, (err, data) => {
                         if (data) {
                              loteAfiliacion.find((err, data) => {
                                   res.status(200).json({ ok: true, data });
                              });
                         }
                    });
               } catch (error) {
                    res.status(200).json({ ok: false, error });
               }
               break;
          case 'infoCNE':
               try {
                    loteAfiliacion.findByIdAndUpdate(req.params._id, updInfoJunta, options, (err, data) => {
                         if (data) {
                              loteAfiliacion.find((err, data) => {
                                   res.status(200).json({ ok: true, data });
                              });
                         }
                    });
               } catch (error) {
                    res.status(200).json({ ok: false, error });
               }
               break;

          default:
               break;
     }
};

//// estadistica Lote

export const getDataLotes = async (req: Request, res: Response) => {
     let proxAfiliados = await loteAfiliacion.aggregate([
          { $unwind: '$planillas' },
          { $group: { _id: '$_id', sum: { $sum: 1 } } },
          { $group: { _id: null, proxAfilia: { $sum: '$sum' } } },
     ]);
     let lotesPresentados = await loteAfiliacion.aggregate([
          { $match: { estadoAfiliacion: 'presentado' } },
          { $group: { _id: '$_id', count: { $sum: 1 } } },
          { $group: { _id: null, totalPresnt: { $sum: '$count' } } },
     ]);
     let lotesCerrados = await loteAfiliacion.aggregate([
          { $match: { estadoAfiliacion: 'cerrado' } },
          { $group: { _id: '$_id', count: { $sum: 1 } } },
          { $group: { _id: null, totalCerrados: { $sum: '$count' } } },
     ]);

     let totalAfiliados = await afiliado.countDocuments();
     let totalLotes = await loteAfiliacion.countDocuments();

     res.status(200).json({
          proxAfiliados: proxAfiliados[0].proxAfilia,
          ltePresentados: lotesPresentados.length ? lotesPresentados[0].totalPresnt : 0,
          lteCerrados: lotesCerrados.length ? lotesCerrados[0].totalCerrados : 0,
          totalAfiliados,
          totalLotes,
     });
};

//updatePlanilla
export const updPlanilla = async (req: Request, res: Response) => {
     let upd: any = {};
     upd.estadoAf = req.body.upd.estadoAf;
     upd.fechaAfilia = req.body.upd.fechaAfilia;
     upd.fechaBaja = req.body.upd.fechaBaja;
     upd.obserBaja = req.body.upd.obserBaja;

     try {
          loteAfiliacion.findOne({ nro: req.params._nroLte }, (err, data: ILoteAfiliacion) => {
               if (data) {
                    let indx = data.planillas.findIndex((elemento) => elemento.documento === req.body.upd.documento);
                    (data.planillas[indx].estadoAf = upd.estadoAf),
                         (data.planillas[indx].fechaAfilia = upd.fechaAfilia),
                         (data.planillas[indx].fechaBaja = upd.fechaBaja),
                         (data.planillas[indx].obserBaja = upd.obserBaja),
                         data.save();
                    res.status(200).json({ ok: true, data });
               }
          });
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};

///grilla Afiliados segun Lotes

export const getPlanillasLotes = async (req: Request, res: Response) => {
     let sexo: string;
     /* switch (req.body.data.genero) {
          case 'masculino':
               sexo = 'f';
               break;
          case 'femenino':
               sexo = 'f';
               break;
          case 'otros':
               sexo = 'o';
               break;
          default:
               break;
     } */

     let query: any = {
          genero: req.body.data.genero.toLowerCase() || 'm',
          estadoAf: req.body.data?.estado.toLowerCase() || 'pendiente',
          localidad: req.body.data?.localidad.toLowerCase() || 'neunquen',
     };

     let planillas: any = [];

     /* let data: any = await loteAfiliacion.find(query, { _id: 0, nro: 1, planillas: 1 }); */

     if (query.genero === 't' && query.estadoAf === 'todos') {
          let data: any = await loteAfiliacion.aggregate([
               {
                    $match: {
                         planillas: {
                              $elemMatch: {
                                   $and: [{ 'ultDomicilio.localidad': query.localidad }],
                              },
                         },
                    },
               },
               {
                    $project: {
                         nro: 1,
                         _id: 0,
                         planillas: {
                              $filter: {
                                   input: '$planillas',
                                   as: 'item',
                                   cond: {
                                        $and: [{ $eq: ['$$item.ultDomicilio.localidad', query.localidad] }],
                                   },
                              },
                         },
                    },
               },
          ]);
          for (let item of data) {
               item.planillas.forEach((element: any) => {
                    let aflia: any = {
                         nroLte: item.nro,
                         nombre: element.nombre,
                         apellido: element.apellido,
                         documento: element.documento,
                         genero: element.genero,
                         fechaNacimiento: element.fechaNacimiento,
                         estadoAf: element.estadoAf ? element.estadoAf : '',
                         fechaAfilia: element.fechaAfilia ? element.fechaAfilia : '',
                         fechaBaja: element.fechaBaja ? element.fechaBaja : '',
                         obserBaja: element.obserBaja ? element.obserBaja : '',
                         localidad: element.ultDomicilio.localidad,
                         ultDomicilio: {
                              distritoElec: element.ultDomicilio.distritoElec,
                              partidoDepto: element.ultDomicilio.partidoDepto,
                              localidad: element.ultDomicilio.localidad,
                              calle: element.ultDomicilio.calle,
                              nro: element.ultDomicilio.nro,
                              piso: element.ultDomicilio.piso,
                              dep: element.ultDomicilio.dep,
                         },
                         /*  domicilioPostal: {
                              barrio: { type: String },
                              circuito: { type: String },
                              localidad: { type: String },
                              calle: { type: String },
                              nro: { type: String },
                              piso: { type: String },
                              dep: { type: String },
                              telPar: { type: String },
                              telTrab: { type: String },
                              contacto: { type: String },
                              observaciones: { type: String },
                         }, */
                    };

                    planillas.push(aflia);
               });
          }
     }
     if (query.estadoAf === 'todos') {
          let data: any = await loteAfiliacion.aggregate([
               {
                    $match: {
                         planillas: {
                              $elemMatch: {
                                   $and: [{ 'ultDomicilio.localidad': query.localidad }],
                              },
                         },
                    },
               },
               {
                    $project: {
                         nro: 1,
                         _id: 0,
                         planillas: {
                              $filter: {
                                   input: '$planillas',
                                   as: 'item',
                                   cond: {
                                        $and: [
                                             { $eq: ['$$item.genero', query.genero] },
                                             { $eq: ['$$item.ultDomicilio.localidad', query.localidad] },
                                        ],
                                   },
                              },
                         },
                    },
               },
          ]);
          for (let item of data) {
               item.planillas.forEach((element: any) => {
                    let aflia: any = {
                         nroLte: item.nro,
                         nombre: element.nombre,
                         apellido: element.apellido,
                         documento: element.documento,
                         genero: element.genero,
                         fechaNacimiento: element.fechaNacimiento,
                         estadoAf: element.estadoAf ? element.estadoAf : '',
                         fechaAfilia: element.fechaAfilia ? element.fechaAfilia : '',
                         fechaBaja: element.fechaBaja ? element.fechaBaja : '',
                         obserBaja: element.obserBaja ? element.obserBaja : '',
                         localidad: element.ultDomicilio.localidad,
                         ultDomicilio: {
                              distritoElec: element.ultDomicilio.distritoElec,
                              partidoDepto: element.ultDomicilio.partidoDepto,
                              localidad: element.ultDomicilio.localidad,
                              calle: element.ultDomicilio.calle,
                              nro: element.ultDomicilio.nro,
                              piso: element.ultDomicilio.piso,
                              dep: element.ultDomicilio.dep,
                         },
                         /*  domicilioPostal: {
                              barrio: { type: String },
                              circuito: { type: String },
                              localidad: { type: String },
                              calle: { type: String },
                              nro: { type: String },
                              piso: { type: String },
                              dep: { type: String },
                              telPar: { type: String },
                              telTrab: { type: String },
                              contacto: { type: String },
                              observaciones: { type: String },
                         }, */
                    };

                    planillas.push(aflia);
               });
          }
     }
     if (query.genero === 't') {
          let data: any = await loteAfiliacion.aggregate([
               {
                    $match: {
                         planillas: {
                              $elemMatch: {
                                   $and: [{ 'ultDomicilio.localidad': query.localidad }],
                              },
                         },
                    },
               },
               {
                    $project: {
                         nro: 1,
                         _id: 0,
                         planillas: {
                              $filter: {
                                   input: '$planillas',
                                   as: 'item',
                                   cond: {
                                        $and: [
                                             { $eq: ['$$item.estadoAf', query.estadoAf] },
                                             { $eq: ['$$item.ultDomicilio.localidad', query.localidad] },
                                        ],
                                   },
                              },
                         },
                    },
               },
          ]);
          for (let item of data) {
               item.planillas.forEach((element: any) => {
                    let aflia: any = {
                         nroLte: item.nro,
                         nombre: element.nombre,
                         apellido: element.apellido,
                         documento: element.documento,
                         genero: element.genero,
                         fechaNacimiento: element.fechaNacimiento,
                         estadoAf: element.estadoAf ? element.estadoAf : '',
                         fechaAfilia: element.fechaAfilia ? element.fechaAfilia : '',
                         fechaBaja: element.fechaBaja ? element.fechaBaja : '',
                         obserBaja: element.obserBaja ? element.obserBaja : '',
                         localidad: element.ultDomicilio.localidad,
                         ultDomicilio: {
                              distritoElec: element.ultDomicilio.distritoElec,
                              partidoDepto: element.ultDomicilio.partidoDepto,
                              localidad: element.ultDomicilio.localidad,
                              calle: element.ultDomicilio.calle,
                              nro: element.ultDomicilio.nro,
                              piso: element.ultDomicilio.piso,
                              dep: element.ultDomicilio.dep,
                         },
                         /*  domicilioPostal: {
                              barrio: { type: String },
                              circuito: { type: String },
                              localidad: { type: String },
                              calle: { type: String },
                              nro: { type: String },
                              piso: { type: String },
                              dep: { type: String },
                              telPar: { type: String },
                              telTrab: { type: String },
                              contacto: { type: String },
                              observaciones: { type: String },
                         }, */
                    };

                    planillas.push(aflia);
               });
          }
     } else {
          let data: any = await loteAfiliacion.aggregate([
               {
                    $match: {
                         planillas: {
                              $elemMatch: {
                                   $and: [{ 'ultDomicilio.localidad': query.localidad }],
                              },
                         },
                    },
               },
               {
                    $project: {
                         nro: 1,
                         _id: 0,
                         planillas: {
                              $filter: {
                                   input: '$planillas',
                                   as: 'item',
                                   cond: {
                                        $and: [
                                             { $eq: ['$$item.genero', query.genero] },
                                             { $eq: ['$$item.estadoAf', query.estadoAf] },
                                             { $eq: ['$$item.ultDomicilio.localidad', query.localidad] },
                                        ],
                                   },
                              },
                         },
                    },
               },
          ]);
          for (let item of data) {
               item.planillas.forEach((element: any) => {
                    let aflia: any = {
                         nroLte: item.nro,
                         nombre: element.nombre,
                         apellido: element.apellido,
                         documento: element.documento,
                         genero: element.genero,
                         fechaNacimiento: element.fechaNacimiento,
                         estadoAf: element.estadoAf ? element.estadoAf : '',
                         fechaAfilia: element.fechaAfilia ? element.fechaAfilia : '',
                         fechaBaja: element.fechaBaja ? element.fechaBaja : '',
                         obserBaja: element.obserBaja ? element.obserBaja : '',
                         localidad: element.ultDomicilio.localidad,
                         ultDomicilio: {
                              distritoElec: element.ultDomicilio.distritoElec,
                              partidoDepto: element.ultDomicilio.partidoDepto,
                              localidad: element.ultDomicilio.localidad,
                              calle: element.ultDomicilio.calle,
                              nro: element.ultDomicilio.nro,
                              piso: element.ultDomicilio.piso,
                              dep: element.ultDomicilio.dep,
                         },
                         /*  domicilioPostal: {
                         barrio: { type: String },
                         circuito: { type: String },
                         localidad: { type: String },
                         calle: { type: String },
                         nro: { type: String },
                         piso: { type: String },
                         dep: { type: String },
                         telPar: { type: String },
                         telTrab: { type: String },
                         contacto: { type: String },
                         observaciones: { type: String },
                    }, */
                    };

                    planillas.push(aflia);
               });
          }
     }

     res.json({ planillas });
};

/* 
export const getMigrarArchivo = async (req: Request, res: Response) => {

     const results: any = []
     fs.readFile('/Users/alecordoba/Desarrollo/APIS/api-apex/src/modules/agenda/routes/datos.txt', 'utf-8', (error, data) => {
          let lines = data.split("\n");
          let vacio = false
          let guardar = false

          lines.map((linea: any) => {
               let temp = linea.split("\t")
               if (temp[1] === 'Cod. Sección') {
                    guardar = true
               }
               if (guardar && temp[1] !== 'Cod. Sección' && temp[1] !== undefined && temp[2] !== undefined && temp[3] !== undefined && temp[4] !== undefined && temp[5] !== undefined) {
                    if (temp[0] !== '') {
                         let objeto: padronmpn = {
                              seccion: temp[0],
                              codSeccion: temp[1],
                              circuito: temp[2],
                              codCircuito: temp[3],
                              apellido: temp[4],
                              nombre: temp[5],
                              genero: temp[6],
                              tipoDocumento: temp[7],
                              matricula: temp[8],
                              fechaNacimiento: temp[9],
                              clase: temp[10],
                              estadoActualElector: temp[11],
                              estadoAfiliacion: temp[12],
                              fechaAfiliacion: temp[13],
                              analfabeto: temp[14],
                              profesion: temp[15],
                              fechaDomicilio: temp[16],
                              domicilio: temp[17].replace(/(\r\n|\n |\r)/gm, ""),
                         }

                         results.push(objeto)
                         return


                         let padron = new MPNPadron(objeto)
                         padron.save()
                    }
                    if (temp[1] === '') {
                         guardar = false
                    }
               }
          })

     })
};
export const getListados = async (req: Request, res: Response) => {

     const results: any = await MPNPadron.find().lean()
     let datos: Ipadronmpn[] = []
     let deptos: Idepartamentos[] = []
     let localidades: Ilocalidades[] = []
     results.map((objeto: any) => {
          if (deptos.length === 0) {
               localidades.push({
                    localidad: objeto.circuito,
                    total: 1,
                    totalFemenino: objeto.genero === 'F' ? 1 : 0,
                    totalMasculino: objeto.genero === 'M' ? 1 : 0,
                    totalNoBinario: objeto.genero === 'X' ? 1 : 0,
                    empadronados: [objeto]
               })

               deptos.push({
                    departamento: objeto.seccion,
                    total: 1,
                    totalFemenino: objeto.genero === 'F' ? 1 : 0,
                    totalMasculino: objeto.genero === 'M' ? 1 : 0,
                    totalNoBinario: objeto.genero === 'X' ? 1 : 0,
                    localidades: localidades
               })
          }
          else {
               let encontroDepartamento = false
               for (let dep = 0; dep < deptos.length; dep++) {
                    const depto: Idepartamentos = deptos[dep];
                    if (depto.departamento === objeto.seccion) {
                         encontroDepartamento = true
                         depto.total++
                         depto.totalFemenino += objeto.genero === 'F' ? 1 : 0
                         depto.totalMasculino += objeto.genero === 'M' ? 1 : 0
                         depto.totalNoBinario += objeto.genero === 'X' ? 1 : 0
                         let encontroLocalidad = false
                         depto.localidades.map((localidad: Ilocalidades) => {
                              if (localidad.localidad === objeto.circuito) {
                                   encontroLocalidad = true
                                   localidad.total++
                                   localidad.totalFemenino += objeto.genero === 'F' ? 1 : 0
                                   localidad.totalMasculino += objeto.genero === 'M' ? 1 : 0
                                   localidad.totalNoBinario += objeto.genero === 'X' ? 1 : 0
                                   localidad.empadronados.push(objeto)
                              }
                         })
                         if (!encontroLocalidad) {
                              let localidadTemp = {
                                   localidad: objeto.circuito,
                                   total: 1,
                                   totalFemenino: objeto.genero === 'F' ? 1 : 0,
                                   totalMasculino: objeto.genero === 'M' ? 1 : 0,
                                   totalNoBinario: objeto.genero === 'X' ? 1 : 0,
                                   empadronados: [objeto]
                              }
                              depto.localidades.push(localidadTemp)
                         }
                    }
               }
               if (!encontroDepartamento) {

                    localidades = []
                    localidades.push({
                         localidad: objeto.circuito,
                         total: 1,
                         totalFemenino: objeto.genero === 'F' ? 1 : 0,
                         totalMasculino: objeto.genero === 'M' ? 1 : 0,
                         totalNoBinario: objeto.genero === 'X' ? 1 : 0,
                         empadronados: [objeto]
                    })
                    deptos.push({
                         departamento: objeto.seccion,
                         total: 1,
                         totalFemenino: objeto.genero === 'F' ? 1 : 0,
                         totalMasculino: objeto.genero === 'M' ? 1 : 0,
                         totalNoBinario: objeto.genero === 'X' ? 1 : 0,
                         localidades: localidades
                    })
               }
          }
     }
     )
     deptos.map(async (depto: Idepartamentos) => { */
/* let deptoTemp = new MPNlistados(depto) */
/*await deptoTemp.save()  */
/*   console.log('==========================')
  console.log('Departamento: ', depto.departamento)
  console.log('Total de Empadronados: ', depto.total)
  console.log('Total de Empadronados Femenino: ', depto.totalFemenino)
  console.log('Total de Empadronados Masculino: ', depto.totalMasculino)
  console.log('Total de Empadronados No Binario: ', depto.totalNoBinario)
  depto.localidades.map((localidad: Ilocalidades) => {
       console.log('------------------------------------------------------')
       console.log('Localidad: ', localidad.localidad)
       console.log('Total de Empadronados: ', localidad.total)
       console.log('Total de Empadronados Femenino: ', localidad.totalFemenino)
       console.log('Total de Empadronados Masculino: ', localidad.totalMasculino)
       console.log('Total de Empadronados No Binario: ', localidad.totalNoBinario)
   
  })
})

let totales = {

  totalFemenino: results.filter((e: any) => e.genero === 'F').length,
  totalMasculino: results.filter((e: any) => e.genero === 'M').length,
  totalNoBinario: results.filter((e: any) => e.genero === 'X').length,
  total: results.filter((e: any) => e.genero === 'X').length + results.filter((e: any) => e.genero === 'M').length + results.filter((e: any) => e.genero === 'F').length
}
console.log('Total de Empadronados Femenino:', totales.totalFemenino)
console.log('Total de Empadronados Masculino:', totales.totalMasculino)
console.log('Total de Empadronados No Binario:', totales.totalNoBinario)
console.log('Total de Empadronados:', totales.total)
return res.status(200).json({
  ok: true,
  mensaje: 'Archivo cargado correctamente',
  deptos,
  totales
});
}; */


//TODO: MIGRACION DE DATOS DE MPN 

export const migrarLotes = async (req: Request, res: Response) => {
     let dataMigrar: any[] = await loteMigracion.find({})
     console.log('dataMigrar', dataMigrar)
     dataMigrar.map(async (lote: loteImportar) => {

          let dataTemp: any = {
               nro: lote.numero,
               usuarioResponsable: {
                    nombreCompleto: lote.referente,
                    dni: "",
                    telefono: "",
                    email: "",
               },
               lugarAfiliacion: {
                    localidad: "",
                    nombreEdificio: "",
                    calle: "",
                    numero: "",
                    telefono: "",
               },
               fechaInicioAfiliacion: lote.fechaCreacion,
               fechaFinAfiliacion: "",
               estadoAfiliacion: "",
               datosJusElc: {
                    fechaIngresoJunta: lote.fechaPres,
                    fechaRespuestaJunta: "",
                    estadoJunta: "",
                    obserJunta: "",
               }
          }
          let data = new loteAfiliacion(dataTemp);
          console.log('dataTemp', data)
          await data.save()

     })
     res.status(200).json({ ok: true, data: dataMigrar })
};




export const migrarFichas = async (req: Request, res: Response) => {
     console.log('Comenzo la rutina de migrar las Fichas ...........')
     let migrados: any = []
     let noLote: any = []
     await fichaMigracion.find({}).then(async (fichas: any[]) => {
          /* let personas: any = await MPNPadron.find({})
          let personasPadron: any = await padron.find({}) */
          let i = fichas.length
          for await (const ficha of fichas) {

               i--
               let persona: any = await MPNPadron.findOne({ 'matricula': ficha.documento })

               let personaPadron: any = await padron.findOne({ 'documento': ficha.documento })
               let baja = ""
               if (persona === null && personaPadron === null) {
                    baja = "Baja"
               }
               if (persona !== null && personaPadron) {
                    baja = "Activo en Padron Oficial"
               }

               let dataTemp: any = {
                    nombre: persona ? persona.nombre : (personaPadron ? personaPadron.nombre : ""),
                    apellido: persona ? persona.apellido : (personaPadron ? personaPadron.apellido : ficha.Nombre),
                    documento: ficha.documento,
                    dm: "",
                    rg: "",
                    clase: persona ? persona.clase : (personaPadron ? personaPadron.clase : ""),
                    genero: persona ? persona.genero : (personaPadron ? personaPadron.genero : ""),
                    fechaNacimiento: persona ? persona.fechaNacimiento : moment(new Date(ficha.fechaNac)).format("DD/MM/YYYY").toString(),
                    lugar: ficha.lugarNac,
                    profOficio: persona ? persona.profesion : (ficha.ocupacion ? ficha.ocupacion : ""),
                    estadoCivil: ficha.EstadoCivil ? ficha.EstadoCivil : "",
                    ultDomicilio: {
                         distritoElec: "",
                         partidoDepto: persona ? persona.seccion : (ficha.circuito ? ficha.circuito : ""),
                         cuartelPedania: "",
                         localidad: persona ? persona.circuito : (personaPadron ? personaPadron.localidad : (ficha.circuito ? ficha.circuito : "")),
                         calle: persona ? persona.domicilio : (ficha.Direccion ? ficha.Direccion : ""),
                         nro: "",
                         piso: "",
                         dep: "",
                    },
                    domicilioPostal: {
                         barrio: "",
                         circuito: "",
                         localidad: "",
                         calle: "",
                         nro: "",
                         piso: "",
                         dep: "",
                         telPar: "",
                         telTrab: "",
                         contacto: "",
                         observaciones: "",
                    },
                    estadoAf: persona ? persona.estadoAfiliacion : baja,
                    fechaAfilia: persona ? persona.fechaAfiliacion : (ficha.FechaAfil ? ficha.FechaAfil : ""),
                    fechaBaja: "",
                    obserBaja: ficha.Observaciones ? ficha.Observaciones : "",
               }


               let lote: ILoteAfiliacion = await loteAfiliacion.findOne({ nro: ficha.lote })
               /* console.log('lote', lote)
               console.log('ficha.lote', ficha.lote) */
               if (lote) {
                    lote.planillas.push(dataTemp)
                    let data = new loteAfiliacion(lote)
                    await data.save()
               } else {
                    console.log('No existe el lote', ficha)
                    noLote.push(ficha)
               }

               await migrados.push(dataTemp)
          }


     })
     /* console.log('migrados', migrados) */
     /* let data = new loteAfiliacion(dataTemp);
     console.log('dataTemp', data)
     await data.save()  */
     console.log('Finalizó la rutina de migrar las Fichas ...........')
     res.status(200).json({ ok: true, migrados, noLote })
};