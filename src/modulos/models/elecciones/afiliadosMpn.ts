import { Schema, model, Document } from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');

export interface Iafiliado extends Document {
   apellido: String;
   nombre: String;
   genero: String;
   tipo_ejemplar: String;
   circuito: String;
   fec_afiliacion: String;
   domicilio: String;
   localidad: String;
   departamento: String;
   dni: String;
}

const afiliadoSchema = new Schema(
   {
      dni: { type: String, lowecase: true },
      apellido: { type: String, lowecase: true },
      nombre: { type: String, lowecase: true },
      genero: { type: String, upercase: true },
      tipo_ejemplar: { type: String, lowecase: true },
      circuito: { type: String, lowecase: true },
      fec_afiliacion: { type: String, lowecase: true },
      domicilio: { type: String, lowecase: true },
      localidad: { type: String, lowecase: true },
      departamento: { type: String, lowecase: true },
   },
   { timestamps: true }
);

afiliadoSchema.plugin(uniqueValidator);

export const afiliado = model<Iafiliado>('afiliados', afiliadoSchema, 'afiliados');
