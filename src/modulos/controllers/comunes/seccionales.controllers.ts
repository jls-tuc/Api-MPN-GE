import { Request, Response } from 'express';
import { loteAfiliacion } from '../../models/afiliaciones/grupoAfiliacion';
import { ISeccional, seccionales } from '../../models/comunes/seccionales';
import { afiliado } from '../../models/elecciones/afiliadosMpn';

export const scriptSeccionales = async (req: Request, res: Response) => {
     let cargar: any = [
          {
               seccional: 'neuquen',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [{ nombre: 'neuquen' }],
          },
          {
               seccional: 'alumine',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [
                    { nombre: 'Puipucun' },
                    { nombre: 'Villa Pehuenia' },
                    { nombre: 'Moquehue' },
                    { nombre: 'Kilca' },
                    { nombre: 'Pulmari' },
                    { nombre: 'Ñorquinco' },
                    { nombre: 'Alumine' },
                    { nombre: 'Ruca Choroy' },
                    { nombre: 'Angostura' },
                    { nombre: 'Icalma' },
                    { nombre: 'Lonco Luan' },
                    { nombre: 'Quillén' },
               ],
          },
          {
               seccional: 'minas',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [
                    { nombre: 'Varvarco' },
                    { nombre: 'Invernada Vieja' },
                    { nombre: 'Manzano Amargo' },
                    { nombre: 'Butalon Norte' },
                    { nombre: 'Cura Mallin' },
                    { nombre: 'Villa Nahueve' },
                    { nombre: 'Andacollo' },
                    { nombre: 'Los Miches' },
                    { nombre: 'Las Ovejas' },
                    { nombre: 'Huinganco' },
                    { nombre: 'Guañacos' },
                    { nombre: 'Bella Vista' },
               ],
          },
          {
               seccional: 'picunches',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [
                    { nombre: 'Las Lajas' },
                    { nombre: 'Bajada de Agrio' },
                    { nombre: 'Quili Malal' },
                    { nombre: 'Mallin de los caballos' },
                    { nombre: 'Codihue' },
                    { nombre: 'los Alazanes' },
               ],
          },
          {
               seccional: 'loncopue',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [
                    { nombre: 'loncopue' },
                    { nombre: 'chorrica' },
                    { nombre: 'trahuencura' },
                    { nombre: 'quintuco' },
                    { nombre: 'huerenchenque' },
                    { nombre: 'cajon de almaza' },
                    { nombre: 'huncal' },
               ],
          },
          {
               seccional: 'picun leufu',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [
                    { nombre: 'picun leufu' },
                    { nombre: 'el sauce' },
                    { nombre: 'limay' },
                    { nombre: 'centro' },
                    { nombre: 'paso aguerre' },
               ],
          },
          {
               seccional: 'colllon cura',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [
                    { nombre: 'piedra del aguila' },
                    { nombre: 'santo tomas' },
                    { nombre: 'piedra pintada' },
                    { nombre: 'san ignacio' },
                    { nombre: 'carran cura' },
                    { nombre: 'zaina yegua' },
                    { nombre: 'sañi co' },
               ],
          },
          {
               seccional: 'añelo',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [
                    { nombre: 'añelo' },
                    { nombre: 'san patricio del chañar' },
                    { nombre: 'los chihuidos' },
                    { nombre: 'aguada san roque' },
               ],
          },
          {
               seccional: 'senillosa',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [
                    { nombre: 'senillosa' },
                    { nombre: 'arroyito' },
                    { nombre: 'villa el chocon' },
               ],
          },
          {
               seccional: 'los lagos',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [
                    { nombre: 'villa la angostura' },
                    { nombre: 'villa traful' },
                    { nombre: 'la lipela' },
                    { nombre: 'paso coihue' },
               ],
          },
          {
               seccional: 'zapala',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [
                    { nombre: 'covunco abajo' },
                    { nombre: 'carro quebrado' },
                    { nombre: 'bajada de los molles' },
                    { nombre: 'villa del puente' },
                    { nombre: 'puente picun leufu' },
                    { nombre: 'covunco arriba' },
                    { nombre: 'barda negra' },
                    { nombre: 'laguna blanca' },
                    { nombre: 'los catutos' },
                    { nombre: 'zapala' },
                    { nombre: 'mariano moreno' },
                    { nombre: 'ramon castro' },
                    { nombre: 'ñireco' },
                    { nombre: 'laguna miranda' },
               ],
          },
          {
               seccional: 'centenario',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [
                    { nombre: 'centenario' },
                    { nombre: 'vista alegre sur' },
                    { nombre: 'vista alegre norte' },
                    { nombre: 'planicie banderita' },
               ],
          },
          {
               seccional: 'buta ranquil',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [
                    { nombre: 'buta ranquil' },
                    { nombre: 'barrancas' },
                    { nombre: 'huantraico' },
               ],
          },
          {
               seccional: 'ñorquin',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [
                    { nombre: 'naunauco' },
                    { nombre: 'tralaitue' },
                    { nombre: 'tres chorros' },
                    { nombre: 'ranquilon' },
                    { nombre: 'el huecu' },
                    { nombre: 'taquimilan abajo' },
                    { nombre: 'el cholar' },
                    { nombre: 'caviahue' },
                    { nombre: 'colipilli' },
               ],
          },
          {
               seccional: 'catan lil',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [
                    { nombre: 'las coloradas' },
                    { nombre: 'aguada florencio' },
                    { nombre: 'el salitral' },
                    { nombre: 'las cortaderas' },
                    { nombre: 'pilo lil' },
                    { nombre: 'caichihue' },
                    { nombre: 'chacaico' },
                    { nombre: 'la picaza' },
                    { nombre: 'media luna' },
               ],
          },
          {
               seccional: 'lacar',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [
                    { nombre: 'san martin de los andes' },
                    { nombre: 'chapelco grande' },
                    { nombre: 'hua hum' },
                    { nombre: 'lago hermoso' },
                    { nombre: 'lago meliquina' },
                    { nombre: 'pil pil' },
                    { nombre: 'quila quina' },
                    { nombre: 'trompul' },
                    { nombre: 'lago lolog' },
                    { nombre: 'vega maipu' },
                    { nombre: 'quemquentreu' },
               ],
          },
          {
               seccional: 'huiliches',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [
                    { nombre: 'junin de los andes' },
                    { nombre: 'pampa del malleo' },
                    { nombre: 'chiquilihuin' },
                    { nombre: 'atreuco' },
                    { nombre: 'aucapan' },
                    { nombre: 'nahuel mapi' },
                    { nombre: 'huechulafquen' },
               ],
          },
          {
               seccional: 'plottier',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [{ nombre: 'plottier' }],
          },
          {
               seccional: 'chos malal',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [
                    { nombre: 'chos malal' },
                    { nombre: 'tricao malal' },
                    { nombre: 'caepe malal' },
                    { nombre: 'cajon del curi leuvu' },
                    { nombre: 'coyuco' },
                    { nombre: 'cochico' },
               ],
          },
          {
               seccional: 'cutrol co',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [{ nombre: 'cutral co' }, { nombre: 'sauzal bonito' }],
          },
          {
               seccional: 'plaza huincul',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [{ nombre: 'plaza huincul' }, { nombre: 'challaco' }],
          },
          {
               seccional: 'rincon de los sauces',
               fecha_alta: '01-01-2022',
               telefono: '',
               localidad: '',
               codigo_postal: '',
               calle: '',
               numero: '',
               dpto: '',
               piso: '',
               estado: true,
               datos_responsable: {
                    nombres: '',
                    apellido: '',
                    dni: '',
                    fecha_alta: '',
                    telefono: '',
                    email: '',
               },
               localidades_parajes_comprende: [{ nombre: 'rincon de los sauces' }, { nombre: 'octavio pico' }],
          },
     ];

     cargar.forEach(async (element) => {
          let seccionalNueva = new seccionales(element);
          await seccionalNueva.save();
     });

     res.status(200).json({ ok: true });
};

export const getAll = async (req: Request, res: Response) => {
     try {
          seccionales.find({}, (err, data) => {
               res.status(200).json({ ok: true, data });
          });
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};

//// scripts!!!!!!
export const mgSeccionales = async (req: Request, res: Response) => {
     try {
          let total = 0;
          let dataSecc = await seccionales.find({});
          dataSecc.forEach((element) => {
               element.localidades_parajes_comprende.forEach(async (loca) => {
                    await afiliado.find({ circuito: loca.nombre }, async (err, data) => {
                         if (data) {
                              data.forEach(async (secc) => {
                                   secc.seccional = element.seccional;
                                   secc.fecha_pendiente = '';
                                   secc.fecha_baja = '';
                                   secc.fecha_verificacion = '';
                                   secc.observacion =
                                        'Información migrada el 01/09/2022, de acuerdo al padrón enviado por la junta electoral el 07/2022.';
                                   await secc.save();
                              });
                         }
                    });
                    total++;
               });
          });
          res.json({ total });
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};

export const chCircuito = async (req: Request, res: Response) => {
     try {
          afiliado.find({}, (err, data) => {
               data.forEach(async (element) => {
                    if (element.circuito === 'neuquen - capital') {
                         element.circuito = 'neuquen';
                         await element.save();
                    }
               });
               res.status(200).json({ ok: true });
          });
     } catch (error) {
          res.status(200).json({
               ok: false,
               error,
          });
     }
};

export const nrlte = async (req: Request, res: Response) => {
     console.log('arranca');
     let gpros = await loteAfiliacion.find({}, { numero: 1, planillas: 1 });

     await gpros.forEach((element) => {
          console.log(element.numero);
          element.planillas.forEach(async (pers) => {
               await afiliado.findOneAndUpdate({ documento: pers.documento }, { nro_lote: element.numero });
          });
     });

     console.log('Finnnn');
     res.status(200);
};
