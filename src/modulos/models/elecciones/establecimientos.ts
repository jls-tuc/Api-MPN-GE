import { Schema, model } from 'mongoose';

export interface Iestablecimiento extends Document {
  establecimiento: string;
  localidad: string;
  codigo: string;
  mesas: [{
    mesa: string,
    orden: string,
  }];
  lat: string;
  lon: string;
}

const _Schema = new Schema<Iestablecimiento>({
  establecimiento: { type: String, lowcase: false },
  localidad: { type: String, lowcase: false },
  codigo: { type: String },
  mesas: [{
    mesa: { type: String },
    orden: { type: String },
  }],
  lat: { type: String, lowcase: true },
  lon: { type: String, lowcase: true },

});

export const estProv = model<Iestablecimiento>('establecimientos', _Schema, 'establecimientos');
