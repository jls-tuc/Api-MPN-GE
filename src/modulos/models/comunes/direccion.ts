import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  pais: { type: String, required: false },
  provincia: { type: String, required: false },
  localidad: { type: String, required: false },
  codigoPostal: String,
  calle: { type: String, required: false },
  numero: { type: String, required: false },
  block: { type: String, required: false },
  piso: { type: String, required: false },
  dpto: { type: String, required: false },
  barrio: { type: String, required: false },
  geoReferencia: {
    type: [Number],
  },
  activo: {
    type: Boolean,
    required: true,
    default: true,
  },
  ultimaActualizacion: Date,
});

export = schema;
