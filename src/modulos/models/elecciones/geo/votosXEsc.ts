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
     votaron: number;
     votaronA: number;
     votaronF: number;
     typeGeo: string;
     lon: string;
     lat: string;
}

const geoSchema = new Schema<IgeoEscuela>(
     {
          mesaNro: { type: String, unique: true, lowercase: true },
          establecimiento: { type: String, lowercase: true },
          localidad: { type: String },
          votosMesa: { type: Number },
          masculino: { type: Number },
          femenino: { type: Number },
          afiliado: { type: Number },
          votaron: { type: Number },
          votaronA: { type: Number },
          votaronF: { type: Number },
          typeGeo: { type: String },
          lon: { type: String },
          lat: { type: String },
     },
     { timestamps: true }
);
geoSchema.plugin(uniqueValidator);

export const geoEscuela = model<IgeoEscuela>('geoEscuela', geoSchema, 'geoEscuela');
