import { Request, Response } from 'express';
import { loteAfiliacion } from '../../models/afiliaciones/grupoAfiliacion';
import { ISeccional, seccionales } from '../../models/comunes/seccionales';
import { afiliado } from '../../models/elecciones/afiliadosMpn';

export const getAll = async (req: Request, res: Response) => {
     try {
          seccionales
               .find({})
               .sort({ seccional: 1 })
               .exec(function (err, data) {
                    res.status(200).json({ ok: true, data });
               });
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};

//// scripts!!!!!!
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
                    { nombre: 'alumine-fuera radio' },
                    { nombre: 'Puipucun' },
                    { nombre: 'Villa Pehuenia' },
                    { nombre: 'villa moquehue' },
                    { nombre: 'Kilca' },
                    { nombre: 'Pulmari' },
                    { nombre: 'Ñorquinco' },
                    { nombre: 'Alumine' },
                    { nombre: 'Ruca Choroy' },
                    { nombre: 'Angostura' },
                    { nombre: 'Icalma' },
                    { nombre: 'Lonco Luan' },
                    { nombre: 'quillen' },
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
                    { nombre: 'butalon norte-huinganco norte' },
                    { nombre: 'varvarco-invernada vieja' },
                    { nombre: 'cura mallin-andacollo sur' },
                    { nombre: 'Varvarco' },
                    { nombre: 'Invernada Vieja' },
                    { nombre: 'Manzano Amargo' },
                    { nombre: 'Butalon Norte' },
                    { nombre: 'Cura Mallin' },
                    { nombre: 'Villa del nahueve' },
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
                    { nombre: 'las lajas fuera de radio' },
                    { nombre: 'bajada del agrio' },
                    { nombre: 'Las Lajas' },
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
                    { nombre: 'loncopue-fuera radio' },
                    { nombre: 'chorriaca' },
                    { nombre: 'huarenchenque' },
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
               seccional: 'collon cura',
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
                    { nombre: 'piedra del aguila-fuera radio' },
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
                    { nombre: 'añelo fuera de radio' },
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
                    { nombre: 'senillosa sur-arroyito' },
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
                    { nombre: 'villa la angostura-fuera de radio' },
                    { nombre: 'villa traful fuera de radio' },
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
                    { nombre: 'zapala sudeste' },
                    { nombre: 'zapala noreste' },
                    { nombre: 'zapala oeste' },
                    { nombre: 'zapala sudoeste-laguna miranda' },
                    { nombre: 'villa del puente picun leufu norte' },
                    { nombre: 'bajada los molles' },
                    { nombre: 'ramon castro fuera de radio' },
                    { nombre: 'covunco abajo' },
                    { nombre: 'carro quebrado' },
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
                    { nombre: 'centenario sur' },
                    { nombre: 'vista alegre' },
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
                    { nombre: 'buta ranquil sur' },
                    { nombre: 'buta ranquil norte' },
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
                    { nombre: 'caviahue' },
                    { nombre: 'caviahue-copahue' },
                    { nombre: 'colipilli' },
                    { nombre: 'el cholar' },
                    { nombre: 'el cholar fuera radio' },
                    { nombre: 'el huecu' },
                    { nombre: 'el huecu fuera de radio' },
                    { nombre: 'naunauco' },
                    { nombre: 'ranquilon' },
                    { nombre: 'taquimilan' },
                    { nombre: 'taquimilan arriba' },
                    { nombre: 'tralaitue' },
                    { nombre: 'tres chorros' },
                    { nombre: 'taquimilan abajo' },
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
                    { nombre: 'chacaico sur' },
                    { nombre: 'villa del puente picun leufu s' },
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
                    { nombre: 'vega maipu-san m. de los andes este' },
                    { nombre: 'lago lolog-san m.de los andes oeste' },
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
                    { nombre: 'chiuquilihuin' },
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
                    { nombre: 'chos malal fuera de radio' },
                    { nombre: 'chapua' },
                    { nombre: 'villa curi leuvu sur' },
                    { nombre: 'villa curi leuvu norte' },
                    { nombre: 'hapua' },
                    { nombre: 'chos malal' },
                    { nombre: 'tricao malal' },
                    { nombre: 'caepe malal' },
                    { nombre: 'cajon del curi leuvu' },
                    { nombre: 'coyuco' },
                    { nombre: 'cochico' },
               ],
          },
          {
               seccional: 'cutral co',
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
                    { nombre: 'cutral co' },
                    { nombre: 'cutral co norte-fili dei' },
                    { nombre: 'sauzal bonito' },
               ],
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
               localidades_parajes_comprende: [
                    { nombre: 'plaza huincul norte' },
                    { nombre: 'plaza huincul sur' },
                    { nombre: 'plaza huincul' },
                    { nombre: 'challaco' },
               ],
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
          {
               seccional: 'extranjeros',
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
                    { nombre: 'cons. gral. en sidney - australia' },
                    { nombre: 'emb. en bruselas - bélgica' },
                    { nombre: 'cons. en curitiba - brasil' },
                    { nombre: 'cons. gral. en toronto - canada' },
                    { nombre: 'emb. en berna - suiza' },
                    { nombre: 'cons. gral. en punta arenas - chile' },
                    { nombre: 'cons. en concepción - chile' },
                    { nombre: 'cons. en puerto montt - chile' },
                    { nombre: 'cons. gral. en santiago - chile' },
                    { nombre: 'cons. en bonn - alemania' },
                    { nombre: 'cons. gral. en hamburgo - alemania' },
                    { nombre: 'emb. en santo domingo - rep. dominicana' },
                    { nombre: 'cons. en guayaquil - ecuador' },
                    { nombre: 'cons. gral. y cpc en barcelona - españa' },
                    { nombre: 'cons. en cádiz - españa' },
                    { nombre: 'cons. gral. en madrid - españa' },
                    { nombre: 'cons. en palma de mallorca - españa' },
                    { nombre: 'cons. gral. en londres - reino unido' },
                    { nombre: 'cons. gral. y cpc en milán - italia' },
                    { nombre: 'cons. gral. en roma - italia' },
                    { nombre: 'cons. gral. en mexico - mexico' },
                    { nombre: 'cons. en playa del carmen - mexico' },
                    { nombre: 'cons. gral. en asunción - paraguay' },
                    { nombre: 'cons. gral. en atlanta - eeuu' },
                    { nombre: 'cons. gral. y cpc en los angeles - eeuu' },
               ],
          },
     ];

     cargar.forEach(async (element) => {
          let seccionalNueva = new seccionales(element);
          await seccionalNueva.save();
     });

     res.status(200).json({ ok: true });
};

export const mgSeccionales = async (req: Request, res: Response) => {
     try {
          let total = 0;
          let dataSecc = await seccionales.find({});
          await dataSecc.forEach((element) => {
               element.localidades_parajes_comprende.forEach(async (loca) => {
                    await afiliado.find({ circuito: loca.nombre }, async (err, data) => {
                         if (data) {
                              data.forEach(async (secc) => {
                                   secc.seccional = element.seccional;
                                   /* secc.fecha_pendiente = '';
                                   secc.fecha_baja = '';
                                   secc.fecha_verificacion = ''; */
                                   secc.observacion =
                                        'Información migrada el 19/09/2022, de acuerdo al padrón enviado por la junta electoral el 13/09/2022.';
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
