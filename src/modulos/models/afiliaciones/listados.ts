import { Schema, model } from 'mongoose';

export interface Ipadronmpn {
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
const _schemaEmp = new Schema({
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


export interface Ilocalidades {
  localidad: string,
  total: number,
  totalFemenino: number,
  totalMasculino: number,
  totalNoBinario: number,
  empadronados: Ipadronmpn[]
}
const _schemaLoc = new Schema({
  localidad: { type: String },
  total: { type: Number },
  totalFemenino: { type: Number },
  totalMasculino: { type: Number },
  totalNoBinario: { type: Number },
  empadronados: [{ type: _schemaEmp }]
})

export interface Idepartamentos {
  departamento: string,
  total: number,
  totalFemenino: number,
  totalMasculino: number,
  totalNoBinario: number,
  localidades: Ilocalidades[]
}

const _schema = new Schema({
  departamento: { type: String },
  total: { type: Number },
  totalFemenino: { type: Number },
  totalMasculino: { type: Number },
  totalNoBinario: { type: Number },
  localidades: [{ type: _schemaLoc }]
})

export const MPNListadosSchema = _schema;
export const MPNlistados = model('Idepartamentos', _schema, 'listados');