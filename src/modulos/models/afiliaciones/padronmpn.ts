import { Schema, model } from 'mongoose';

export interface padronmpn {
  seccion: string,
  codSeccion: string,
  circuito: string,
  codCircuito: string,
  apellido: string,
  nombre: string,
  genero: string,
  tipoDocumento: string,
  matricula: string,
  fechaNacimiento: string,
  clase: string,
  estadoActualElector: string,
  estadoAfiliacion: string,
  fechaAfiliacion: string,
  analfabeto: string,
  profesion: string,
  fechaDomicilio: string,
  domicilio: string,
}

const _schema = new Schema({
  seccion: { type: String },
  codSeccion: { type: String },
  circuito: { type: String },
  codCircuito: { type: String },
  apellido: { type: String },
  nombre: { type: String },
  genero: { type: String },
  tipoDocumento: { type: String },
  matricula: { type: String },
  fechaNacimiento: { type: String },
  clase: { type: String },
  estadoActualElector: { type: String },
  estadoAfiliacion: { type: String },
  fechaAfiliacion: { type: String },
  analfabeto: { type: String },
  profesion: { type: String },
  fechaDomicilio: { type: String },
  domicilio: { type: String },
})
export const MPNSchema = _schema;
export const MPNPadron = model('padronmpn', _schema, 'padronmpn');