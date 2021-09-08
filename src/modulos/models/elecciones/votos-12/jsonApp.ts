import { Schema, model, Document } from 'mongoose';

export interface IjsonApp extends Document {
     establecimiento: string;
     localidad: string;
     usuario: any;
     mesa: [
          {
               mesa: string;
               orden: [
                    {
                         orden: string;
                         genero: string;
                         obs1: string;
                         obs2: string;
                    }
               ];
          }
     ];
}

const _Schema = new Schema<IjsonApp>({
     establecimiento: { type: String, unique: true },
     localidad: { type: String },
     usuario: { type: String },
     mesa: [
          {
               mesa: { type: String },
               orden: [
                    {
                         orden: { type: String },
                         genero: { type: String },
                         obs1: { type: String },
                         obs2: { type: String },
                    },
               ],
          },
     ],
});

export const jsonAPP = model<IjsonApp>('jsonApp', _Schema, 'jsonApp');
