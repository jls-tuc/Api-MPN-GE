import { Schema, model, Document } from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');

export interface Ipadron extends Document {
   documento: string;
   clase: string;
   apellido: string;
   nombre: string;
   domicilio: string;
   ejemplar: string;
   genero: string;
   mesa: string;
   orden: string;
   seccion: string;
   circuito: string;
   establecimiento: string;
   dom_estableimiento: string;
   localidad: string;
   lat: string;
   lon: string;
}

const padronSchema = new Schema(
   {
      documento: { type: String, lowecase: true },
      clase: { type: String, lowecase: true },
      apellido: { type: String, lowecase: true },
      nombre: { type: String, lowecase: true },
      domicilio: { type: String, lowecase: true },
      ejemplar: { type: String, lowecase: true },
      genero: { type: String, lowecase: true },
      mesa: { type: String, lowecase: true },
      orden: { type: String, lowecase: true },
      seccion: { type: String, lowecase: true },
      circuito: { type: String, lowecase: true },
      establecimiento: { type: String, lowecase: true },
      dom_estableimiento: { type: String, lowecase: true },
      localidad: { type: String, lowecase: true },
      lat: { type: String },
      lon: { type: String },
   },
   { timestamps: true }
);

export const padron = model('padronOficial', padronSchema, 'padronOficial');
