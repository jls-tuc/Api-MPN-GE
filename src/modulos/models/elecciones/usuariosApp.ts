import { Schema, model } from 'mongoose';

export interface IusuarioApp extends Document {
  establecimiento: string;
  localidad: string;
  codigo: string;
  password: string;

}

const _Schema = new Schema<IusuarioApp>({
  establecimiento: { type: String, lowcase: false },
  localidad: { type: String, lowcase: false },
  codigo: { type: String },
  password: { type: String },

});

export const usuarioApp = model<IusuarioApp>('usuariosApp', _Schema, 'usuarioAspp');
