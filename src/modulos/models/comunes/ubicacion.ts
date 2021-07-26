import * as mongoose from 'mongoose';

const ubicacionSchema = new mongoose.Schema({
  barrio: { type: String, required: false },
  localidad: { type: String, required: false },
  provincia: { type: String, required: false },
  pais: { type: String, required: false },
});

export = ubicacionSchema;
