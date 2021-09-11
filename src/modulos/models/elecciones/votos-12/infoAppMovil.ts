import { Schema, model, Document } from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
export interface IinfoAppMovil extends Document {
     establecimiento: string;
     mesa: [
          {
               mesa: string;
               orden: [
                    {
                         orden: string;
                         usuario: string;
                         fecha: string;
                         hora: string;
                         votoSubido: string;
                    }
               ];
          }
     ];
}

const _Schema = new Schema<IinfoAppMovil>({
     establecimiento: { type: String },
     mesa: [
          {
               mesa: { type: String },
               orden: [
                    {
                         orden: { type: String },
                         usuario: { type: String },
                         fecha: { type: String, lowecase: true },
                         hora: { type: String, lowecase: true },
                         votoSubido: { type: String, lowecase: true },
                    },
               ],
          },
     ],
});
_Schema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
export const infoAppMovil = model<IinfoAppMovil>('infoAppMovil', _Schema, 'infoAppMovil');
