import { Schema, model, Document } from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
export interface IlistadoJunta extends Document {
     seccion: string;
     cod_seccion: string;
     circuito: string;
     cod_circuito: string;
     nro_lote: string;
     matricula: string;
     apellido: string;
     nombre: string;
     genero: string;
     tipo_documento: string;
     fecha_nacimiento: string;
     clase: string;
     estado_actual_elector: string;
     estado_afiliacion: string;
     fecha_afiliacion: string;
     analfabeto: string;
     profesion: string;
     fecha_domicilio: string;
     domicilio: string;
}

const _Schema = new Schema<IlistadoJunta>(
     {
          seccion: { type: String, lowecase: true },
          cod_seccion: { type: String, lowecase: true },
          circuito: { type: String, lowecase: true },
          cod_circuito: { type: String, lowecase: true },
          nro_lote: { type: String, lowecase: true },
          apellido: { type: String, lowecase: true },
          nombre: { type: String, lowecase: true },
          genero: { type: String, upercase: true },
          tipo_documento: { type: String, lowecase: true },
          matricula: { type: String, lowecase: true },
          fecha_nacimiento: { type: String, lowecase: true },
          clase: { type: String },
          estado_actual_elector: { type: String, lowecase: true },
          estado_afiliacion: { type: String, lowecase: true },
          fecha_afiliacion: { type: String, lowecase: true },
          analfabeto: { type: String, lowecase: true },
          profesion: { type: String, lowecase: true },
          fecha_domicilio: { type: String, lowecase: true },
          domicilio: { type: String, lowecase: true },
     },
     { timestamps: true }
);

_Schema.plugin(uniqueValidator);

export const listadoJunta = model<IlistadoJunta>('listadoJunta', _Schema, 'listadoJunta');
