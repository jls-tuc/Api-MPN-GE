import * as mongoose from 'mongoose';
import { constantes } from '../../../util/constantes';

const datosPersonalesSchema = new mongoose.Schema({
  nombre: {
    type: String,
    es_indexed: true,
  },
  apellido: {
    type: String,
    es_indexed: true,
  },
  dni: {
    type: String,
    es_indexed: true,
  },
  fechaNacimiento: {
    type: Date,
    es_indexed: true,
  },
  edad: {
    type: String,
    es_indexed: true,
  },
  sexo: constantes.SEXO,
  genero: constantes.GENERO,
  nroTramite: String,
  cuil: {
    type: String,
    es_indexed: true,
  },
  fechaFallecimiento: {
    type: String,
  },
  estadoCivil: constantes.ESTADOCIVIL,
  foto: {
    type: String,
    select: false,
  },
  origenf: {
    type: String,
    select: false,
  },
});

export = datosPersonalesSchema;
