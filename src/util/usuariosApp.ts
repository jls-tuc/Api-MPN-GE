import { Schema, model, Document } from 'mongoose';

export interface IusuariosApp extends Document {
     establecimiento: string;
     usuario: string;
     passworrd: string;
}

const _Schema = new Schema<IusuariosApp>({
     establecimiento: { type: String },
     usuario: { type: String },
     password: { type: String },
});

export const usrAppMovil = model<IusuariosApp>('usuariosApp', _Schema, 'usuariosApp');
