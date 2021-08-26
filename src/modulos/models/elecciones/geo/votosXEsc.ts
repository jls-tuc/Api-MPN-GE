import { Schema, model } from 'mongoose';
import geometrySchema from './geometrySchema';
const uniqueValidator = require('mongoose-unique-validator');

export interface IgeoEscuela extends Document {
     mesaNro: string;
     establecimiento: string;
     localidad: string;
     votosMesa: number;
     masculino: number;
     femenino: number;
     afiliado: number;
     typeGeo: string;
     lon: string;
     lat: string;
}

const geoSchema = new Schema<IgeoEscuela>(
     {
          mesaNro: { type: String, unique: true, lowecase: true },
          establecimiento: { type: String, lowecase: true },
          localidad: { type: String },
          votosMesa: { type: Number },
          masculino: { type: Number },
          femenino: { type: Number },
          afiliado: { type: Number },

          typeGeo: String,
          lon: String,
          lat: String,
     },
     { timestamps: true }
);
geoSchema.plugin(uniqueValidator);

export const geoEscuela = model<IgeoEscuela>('geoEscuela', geoSchema, 'geoEscuela');
