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
