import { Schema, model, Document } from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');

export interface Iafiliado extends Document {
   apellido: string;
   nombre: string;
   genero: string;
   tipo_ejemplar: string;
   circuito: string;
   fec_afiliacion: string;
   domicilio: string;
   localidad: string;
   departamento: string;
   dni: any;
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
