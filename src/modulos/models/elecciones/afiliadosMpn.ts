import { Schema, model, Document } from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');

export interface Iafiliado extends Document {
     seccional: string;
     seccion: string;
     cod_seccion: string;
     circuito: string;
     cod_circuito: string;
     nro_lote: string;
     documento?: String;
     apellido: string;
     nombre: string;
     genero: string;
     tipo_documento: string;
     fecha_nacimiento: string;
     clase: string;
     estado_actual_elector: string;
     estado_afiliacion: string;
     fecha_afiliacion: string;
     fecha_pendiente: string;
     fecha_baja: string;
     fecha_verificacion: string;
     analfabeto: string;
     profesion: string;
     fecha_domicilio: string;
     domicilio: string;
     establecimiento: string;
     dom_establecimiento: string;
     mesa: string;
     orden: string;
     observacion: string;
}

const afiliadoSchema = new Schema(
     {
          seccional: { type: String, lowercase: true },
          seccion: { type: String, lowercase: true },
          cod_seccion: { type: String, lowercase: true },
          circuito: { type: String, lowercase: true },
          cod_circuito: { type: String, lowercase: true },
          nro_lote: { type: String },
          apellido: { type: String, lowercase: true },
          nombre: { type: String, lowercase: true },
          genero: { type: String, lowercase: true },
          tipo_documento: { type: String, lowercase: true },
          documento: { type: String, lowercase: true },
          fecha_nacimiento: { type: String, lowercase: true },
          clase: { type: String },
          estado_actual_elector: { type: String, lowercase: true },
          estado_afiliacion: { type: String, lowercase: true },
          fecha_afiliacion: { type: String },
          fecha_pendiente: { type: String },
          fecha_baja: { type: String },
          fecha_verificacion: { type: String },
          analfabeto: { type: String, lowercase: true },
          profesion: { type: String, lowercase: true },
          fecha_domicilio: { type: String, lowercase: true },
          domicilio: { type: String, lowercase: true },
          establecimiento: { type: String, lowercase: true },
          dom_establecimiento: { type: String, lowercase: true },
          mesa: { type: String, lowercase: true },
          orden: { type: String, lowercase: true },
          observacion: { type: String, lowercase: true },
     },
     { timestamps: true }
);

afiliadoSchema.plugin(uniqueValidator);

export const afiliado = model<Iafiliado>('afiliados', afiliadoSchema, 'afiliados');
