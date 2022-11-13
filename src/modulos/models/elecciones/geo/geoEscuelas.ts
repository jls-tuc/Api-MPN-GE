import { Schema, model, Document } from 'mongoose';

const uniqueValidator = require('mongoose-unique-validator');

export interface IgeoEscuelaMpn extends Document {
     establecimiento: string;
     estado: string;
     localidad: string;
     typeGeo: string;
     lon: string;
     lat: string;
     elecciones: Ielecciones[];
}

interface Ielecciones {
     eleccion: string;
     tipoEleccion: string;
     estadoEleccion: string;
     fechaEleccion: string;
     mesaNro: string;
     votosMesa: number;
     masculino: number;
     femenino: number;
     otro: number;
     afiliado: number;
     independientes: number;
     votaron: number;
     votaronA: number;
     votaronF: number;
     votaronO: number;
}
const _Schema = new Schema<IgeoEscuelaMpn>(
     {
          establecimiento: { type: String, lowercase: true },
          estado: { type: String, lowercase: true },
          localidad: { type: String },
          elecciones: [
               {
                    eleccion: { type: String, lowercase: true },
                    tipoEleccion: { type: String, lowercase: true },
                    estadoEleccion: { type: String, lowercase: true },
                    fechaEleccion: { type: String },
                    mesaNro: { type: String },
                    votosMesa: { type: Number },
                    masculino: { type: Number },
                    femenino: { type: Number },
                    otro: { type: Number },
                    afiliado: { type: Number },
                    independientes: { type: Number },
                    votaron: { type: Number },
                    votaronA: { type: Number },
                    votaronF: { type: Number },
                    votaronO: { type: Number },
               },
          ],

          typeGeo: { type: String },
          lon: { type: String },
          lat: { type: String },
     },
     { timestamps: true }
);

export const geoEscuelaElec = model<IgeoEscuelaMpn>('geoEsc', _Schema, 'geoEsc');
