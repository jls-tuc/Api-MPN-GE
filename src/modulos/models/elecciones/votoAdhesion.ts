import { Schema, model, Document } from 'mongoose';

const uniqueValidator = require('mongoose-unique-validator');

export interface IvotoAD extends Document {
     dni: string;
     sexo: string;
     nombreCompleto: string;
     clase: string;
     genero: string;
     telefono: string;
     tipo_voto: string;
     afiliado: string;
     localidad: string;
     dom_establecimiento: string;
     establecimiento: string;
     mesa: string;
     orden: string;
     realizoVoto: string;
     resPlanilla: [{ idResPlanilla: any; idCoordinador: any; idReferente: any }];
}

const vSchema = new Schema<IvotoAD>(
     {
          dni: { type: String, lowecase: true, uniqueValidator: true },
          sexo: { type: String, lowecase: true },
          nombreCompleto: { type: String, lowecase: true },
          clase: { type: String, lowecase: true },
          genero: { type: String, lowecase: true },
          telefono: { type: String, lowecase: true },
          tipo_voto: { type: String, lowecase: true },
          afiliado: { type: String, lowecase: true },
          localidad: { type: String, lowecase: true },
          dom_establecimiento: { type: String, lowecase: true },
          establecimiento: { type: String, lowecase: true },
          mesa: { type: String, lowecase: true },
          orden: { type: String, lowecase: true },
          realizoVoto: { type: String, lowecase: true },
          resPlanilla: [
               { idResPlanilla: { type: String }, idCoordinador: { type: String }, idReferente: { type: String } },
          ],
     },
     { timestamps: true }
);

vSchema.plugin(uniqueValidator);

export const votoAdh = model<IvotoAD>('votoAdhesion', vSchema, 'votoAdhesion');
