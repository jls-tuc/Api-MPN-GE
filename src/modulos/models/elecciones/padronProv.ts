import { Schema, model, Document } from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');

export interface IpadronProv extends Document {
   documento: String;
   genero: String;
   clase: String;
   apellido_nombre: String;
   domicilio: String;
   seccion: String;
   circuito: String;
}

const padronSchema = new Schema(
   {
      documento: { type: String, lowecase: true },
      genero: { type: String, lowecase: true },
      clase: { type: String, lowecase: true },
      apellido_nombre: { type: String, lowecase: true },
      domicilio: { type: String, lowecase: true },
      seccion: { type: String, lowecase: true },
      circuito: { type: String, lowecase: true },
   },
   { timestamps: true }
);

export const padronProv = model('padronProvisorio', padronSchema, 'padronProvisorio');
