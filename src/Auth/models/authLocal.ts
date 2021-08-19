import { Schema, model } from 'mongoose';

const _Schema = new Schema({
   usuario: { type: String },
   idCoordinador: { type: String },
   idReferente: { typpe: String },
   role: { typpe: String },
});

export const userLocal = model('usIdcoordinador', _Schema, 'usIdcoordinador');
