import { Request, Response } from 'express';
import { votoProv, IvotoProv } from '../../modulos/models/elecciones/votoProvisorio';
import { padron, Ipadron } from '../../modulos/models/elecciones/padronNeuquen';
import { votoAdh, IvotoAD } from '../../modulos/models/elecciones/votoAdhesion';
import { geoEscuela, IgeoEscuela } from '../../modulos/models/elecciones/geo/votosXEsc';

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
