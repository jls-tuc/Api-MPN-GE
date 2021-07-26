import { Request, Response } from 'express';
import { getServicioRenaper } from '../../../util/webServices/servicioRenaper';
import * as personaSchema from '../../models/personas/persona';

import { savePersona, resizeFoto } from './personaCtrl';

export const getPersonaRenaper = async (req: Request, res: Response) => {
  console.log('Query Persona: ', req.query);

  let persona: any = await personaSchema.persona.find({
    dni: req.query.dni,
    sexo: req.query.sexo,
  });
  console.log('Encuentra persona: ', persona);
  if (persona.length === 0) {
    persona = await getServicioRenaper({
      documento: req.query.dni,
      sexo: req.query.sexo,
    });

    console.log('Encuentra persona RENAPER: ', persona);
    if (persona && persona.datos.nroError === 0) {
      persona.datos.sexo = req.query.sexo;
      persona.datos.dni = req.query.dni;
      persona.datos.cuil = persona.datos.cuil !== '' ? persona.datos.cuil : persona.datos.dni;
      persona.datos.foto = await resizeFoto(persona.datos.foto);

      await savePersona(persona.datos);
    }
    res.json(persona.datos);
  } else {
    persona[0].foto = await resizeFoto(persona[0].foto);
    res.json(persona[0]);
  }
};
