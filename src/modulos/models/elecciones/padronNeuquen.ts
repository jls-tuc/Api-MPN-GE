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
     codSeccion: string;
     circuito: string;
     codCircuito: string;
     establecimiento: string;
     dom_estableimiento: string;
     localidad: string;
     lat: string;
     lon: string;
}

const padronSchema = new Schema(
     {
          documento: { type: String },
          clase: { type: String },
          apellido: { type: String },
          nombre: { type: String },
          domicilio: { type: String },
          ejemplar: { type: String },
          genero: { type: String },
          mesa: { type: String },
          orden: { type: String },
          seccion: { type: String },
          circuito: { type: String },
          codCircuito: { type: String },
          codSeccion: { type: String },
          establecimiento: { type: String },
          dom_establecimiento: { type: String },
          localidad: { type: String },
          lat: { type: String },
          lon: { type: String },
     },
     { timestamps: true }
);

export const padron = model('padronOficial', padronSchema, 'padronOficial');
