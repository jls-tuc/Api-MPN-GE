import { Schema, model, Document } from 'mongoose';

export interface Iestablecimientos extends Document {
     establecimiento: string;
     usuario: string;
     dom_establecimiento: string;
     localidad: string;
     lat: string;
     lon: string;
}

const _Schema = new Schema<Iestablecimientos>({
     establecimiento: {
          type: String,
     },
     usuario: {
          type: String,
     },
     dom_establecimiento: {
          type: String,
     },
     localidad: {
          type: String,
     },
     lon: {
          type: String,
     },
     lat: {
          type: String,
     },
});

export const escuelas = model<Iestablecimientos>('establecimientos', _Schema, 'establecimientos');
