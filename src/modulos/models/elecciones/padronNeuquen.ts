import { Schema, model, Document } from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');

export interface Ipadron extends Document {
  documento: String;
  clase: String;
  apellido: String;
  nombre: String;
  domicilio: String;
  tipo_ejemplar: String;
  seccion: String;
  circuito: String;
  mesa: String;
  orden: String;
  escuela: String;
  direccion: String;
  localidad: String;
  observaciones: String;
}

const padronSchema = new Schema(
  {
    documento: { type: String, lowecase: true },
    clase: { type: String, lowecase: true },
    apellido: { type: String, lowecase: true },
    nombre: { type: String, lowecase: true },
    domicilio: { type: String, lowecase: true },
    tipo_ejemplar: { type: String, lowecase: true },
    seccion: { type: String, lowecase: true },
    circuito: { type: String, lowecase: true },
    mesa: { type: String, lowecase: true },
    orden: { type: String, lowecase: true },
    escuela: { type: String, lowecase: true },
    direccion: { type: String, lowecase: true },
    localidad: { type: String, lowecase: true },
    observaciones: { type: String, lowecase: true },
  },
  { timestamps: true }
);

export const padron = model('padronNeuquen', padronSchema, 'padronNeuquen');
