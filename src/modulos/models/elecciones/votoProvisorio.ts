import { Schema, model, Document } from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');

export interface IvotoProv extends Document {
   dni: String;
   nombreCompleto: String;
   clase: String;
   genero: String;
   telefono: String;
   tipo_voto: String;
   afiliado: String;
   circuito: String;
   resPlanilla: [{ idResPlanilla: any; idCoordinador: any; idReferente: any }];
}

const vSchema = new Schema<IvotoProv>({
   dni: { type: String, lowecase: true, uniqueValidator: true },
   nombreCompleto: { type: String, lowecase: true },
   clase: { type: String, lowecase: true },
   genero: { type: String, lowecase: true },
   telefono: { type: String, lowecase: true },
   tipo_voto: { type: String, lowecase: true },
   afiliado: { type: String, lowecase: true },
   circuito: { type: String, lowecase: true },
   resPlanilla: [{ idResPlanilla: { type: String }, idCoordinador: { type: String }, idReferente: { type: String } }],
});

export const votoProv = model<IvotoProv>('votoProv', vSchema, 'votoProv');
