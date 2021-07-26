import * as mongoose from 'mongoose';

const provLocSchemma = new mongoose.Schema({
  localidad_nombre: {
    type: String,
    es_indexed: true,
  },
  localidad_centroide_lat: {
    type: String,
  },
  localidad_centroide_lon: {
    type: String,
  },
  provincia_id: {
    type: String,
  },
  provincia_nombre: {
    type: String,
    es_indexed: true,
  },
  departamento_nombre: {
    type: String,
  },
  municipio_nombre: {
    type: String,
  },
  localidad_censal_nombre: {
    type: String,
  },
});

export const provLoc = mongoose.model('provLoc', provLocSchemma, 'provLoc');
