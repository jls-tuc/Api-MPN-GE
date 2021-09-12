import { Request, Response } from 'express';
import { geoEscuela, IgeoEscuela } from '../../../models/elecciones/geo/votosXEsc';

import { padron, Ipadron } from '../../../models/elecciones/padronNeuquen';

interface Iesc {
     esc: string;
     genero: string;
     mesa: string;
     afiliado: string;
}

export const postGeo = async (req: Request, res: Response) => {
     console.log(req.body);

     let escuela: any = await padron.findOne({ establecimiento: req.body.esc });

     console.log(escuela);

     // let escuela:IgeoEscuela = await geoEscuela.findOne({ establecimiento: req.query.esc });
};

export const cargarVotoXEsc = async (esc: Iesc, geom?) => {
     // deben pasar un obj con la esc donde vota, mesa, sexo,mesa
     let dato: any = geoEscuela.findOne({ establecimiento: esc.esc });

     if (dato !== null) {
          esc.genero === 'F' ? dato.femeninoEsc++ : dato.masculinoEsc++;
          if (esc.afiliado === 'Es afiliado al MPN') {
               dato.afiliadoEsc++;
          }
          dato.votosEsc++;

          if (dato.mesa.nro === esc.mesa) {
               dato.mesa.genero === 'F' ? dato.mesa.femenino++ : dato.mesa.masculino++;

               if (dato.mesa.afiliado === 'Es afiliado al MPN') {
                    dato.mesa.afiliado++;
               }
               dato.mesa.votoMesa++;
               await dato.save();
          }
     }

     let femenino = 0;
     let masculino = 0;
     let afiliado = 0;

     esc.genero === 'F' ? (femenino = 1) : (femenino = 0);
     esc.genero === 'M' ? (femenino = 1) : (femenino = 0);
     esc.afiliado === 'Es afiliado al MPN' ? (afiliado = 1) : (afiliado = 0);

     let escuelaVoto: any = {
          establecimiento: esc.esc,
          mesa: {
               nro: esc.mesa,
               votosMesa: 1,
               masculino: masculino,
               femenino: femenino,
               afiliado: afiliado,
          },
          votosEsc: 1,
          femeninoEsc: femenino,
          masculinoEsc: masculino,
          afiliadoEsc: afiliado,
          geometry: geom,
     };
     console.log(escuelaVoto);
};
////manda info para cargar en el mapaaa
export const getDonas = async (req: Request, res: Response) => {
     let dataGeo: any = {
          type: 'FeatureCollection',
          features: [],
     };

     let escuelas = await geoEscuela.find({}, { localidad: 0, _id: 0 }).lean().sort({ establecimiento: 1 });
     // console.log(escuelas.length);

     for (let esc of escuelas) {
          let busqueda = dataGeo.features.findIndex((data) => data.properties.establecimiento === esc.establecimiento);
          //console.log(busqueda);

          if (busqueda !== -1) {
               dataGeo.features[busqueda].properties.total += esc.votosMesa;
               dataGeo.features[busqueda].properties.totalAf += esc.afiliado;
               dataGeo.features[busqueda].properties.totalFem += esc.femenino;
               dataGeo.features[busqueda].properties.totalMasc += esc.masculino;
               dataGeo.features[busqueda].properties.votaron += esc.votaron;
               dataGeo.features[busqueda].properties.votaronA += esc.votaronA;
               dataGeo.features[busqueda].properties.votaronF += esc.votaronF;
          } else {
               let data = {
                    type: 'Feature',
                    properties: {
                         establecimiento: esc.establecimiento,
                         total: esc.votosMesa,
                         totalAf: esc.afiliado,
                         totalFem: esc.femenino,
                         totalMasc: esc.masculino,
                         votaron: esc.votaron,
                         votaronA: esc.votaronA,
                         votaronF: esc.votaronF,
                    },
                    geometry: { type: 'Point', coordinates: [esc.lon, esc.lat, 100] },
               };
               dataGeo.features.push(data);
          }
     }
     res.status(200).json({
          ok: true,
          dataGeo,
     });
};
