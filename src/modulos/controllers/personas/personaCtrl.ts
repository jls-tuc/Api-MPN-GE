import * as personaSchema from '../../models/personas/persona';
const sharp = require('sharp');

export async function savePersona(datos) {
  const persona = new personaSchema.persona(datos);
  await persona.save();
}

export async function resizeFoto(foto) {
  const base64Image = foto;

  let parts = base64Image.split(';');
  let mimType = parts[0].split(':')[1];
  let imageData = parts[1].split(',')[1];

  let img = new Buffer(imageData, 'base64');
  const semiTransparentRedPng = await sharp(img).resize(200, 250).toBuffer();

  let resizedImageData = semiTransparentRedPng.toString('base64');
  let resizedBase64 = `data:${mimType};base64,${resizedImageData}`;
  return resizedBase64;
}
