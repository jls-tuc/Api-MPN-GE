import { Schema, model, Document } from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');

export interface Iafiliado extends Document {
     seccion: string;
     cod_seccion: string;
     circuito: string;
     cod_circuito: string;
     nro_lote: string;
     documento: string;
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
     establecimiento: string;
     dom_establecimiento: string;
     mesa: string;
     orden: string;
}

const afiliadoSchema = new Schema<Iafiliado>(
     {
          seccion: { type: String, lowercase: true },
          cod_seccion: { type: String, lowercase: true },
          circuito: { type: String, lowercase: true },
          cod_circuito: { type: String, lowercase: true },
          nro_lote: { type: String, lowercase: true },
          apellido: { type: String, lowercase: true },
          nombre: { type: String, lowercase: true },
          genero: { type: String, lowercase: true },
          tipo_documento: { type: String, lowercase: true },
          documento: { type: String, lowercase: true },
          fecha_nacimiento: { type: String, lowercase: true },
          clase: { type: String },
          estado_actual_elector: { type: String, lowercase: true },
          estado_afiliacion: { type: String, lowercase: true },
          fecha_afiliacion: { type: String, lowercase: true },
          analfabeto: { type: String, lowercase: true },
          profesion: { type: String, lowercase: true },
          fecha_domicilio: { type: String, lowercase: true },
          domicilio: { type: String, lowercase: true },
          establecimiento: { type: String, lowercase: true },
          dom_establecimiento: { type: String, lowercase: true },
          mesa: { type: String, lowercase: true },
          orden: { type: String, lowercase: true },
     },
     { timestamps: true }
);

afiliadoSchema.plugin(uniqueValidator);

export const afiliado2022 = model<Iafiliado>('afiliados2022', afiliadoSchema, 'afiliados2022');
