import { Schema, model } from 'mongoose';
import { constantes } from '../../../util/constantes';
const uniqueValidator = require('mongoose-unique-validator');

const _schema = new Schema(
  {
    ID_TRAMITE_PRINCIPAL: String,
    ID_TRAMITE_TARJETA_REIMPRESA: String,
    EJEMPLAR: String,
    VENCIMIENTO: { type: String },
    EMISION: { type: String },
    apellido: { type: String, lowercase: true },
    nombres: { type: String, lowercase: true },
    fechaNacimiento: { type: Date },
    cuil: {
      type: String,
      es_indexed: true,
      unique: true,
    },
    calle: { type: String, lowercase: true },
    numero: { type: String },
    piso: { type: String },
    departamento: { type: String, lowercase: true },
    cpostal: { type: String },
    barrio: { type: String, lowercase: true },
    monoblock: { type: String, lowercase: true },
    ciudad: { type: String, lowercase: true },
    municipio: { type: String, lowercase: true },
    provincia: { type: String, lowercase: true },
    pais: { type: String, lowercase: true },
    codigoError: Number,
    codigof: Number,
    mensaf: { type: String, lowercase: true },
    origenf: { type: String, lowercase: true },
    fechaf: { type: String },
    idciudadano: { type: String },
    nroError: Number,
    foto: String,
    descripcionError: { type: String, lowercase: true },
    sexo: constantes.SEXO,
    dni: {
      type: String,
      es_indexed: true,
      unique: true,
    },
  },
  { timestamps: true }
);

_schema.plugin(uniqueValidator);

export const personaSchema = _schema;
export const persona = model('personaSchema', _schema, 'persona');
