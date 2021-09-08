import { Schema, model, Document } from 'mongoose';

export interface IinfoAppMovil extends Document {
     orden: string;
     votoSuido: string;
     establecimiento: string;
     usuario: string;
     fecha: string;
     hora: string;
}

const _Schema = new Schema<IinfoAppMovil>({
     orden: { type: String, lowecase: true },
     votoSuido: { type: String, lowecase: true },
     establecimiento: { type: String, lowecase: true },
     usuario: { type: String, lowecase: true },
     fecha: { type: String, lowecase: true },
     hora: { type: String, lowecase: true },
});

export const infoAppMovil = model<IinfoAppMovil>('infoAppMovil', _Schema, 'infoAppMovil');
