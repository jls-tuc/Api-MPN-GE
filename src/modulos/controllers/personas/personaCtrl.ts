import * as personaSchema from '../../models/personas/persona';
export async function savePersona(datos) {
     const persona = new personaSchema.persona(datos);
     await persona.save();
}

export async function resizeFoto(foto) {
     return;
}
