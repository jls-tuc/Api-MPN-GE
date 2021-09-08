import { Schema, model, Document } from 'mongoose';

export interface IvotoNQN extends Document {
     NOMBRE: string;
     DNI: string;
     LOCALIDAD: string;
}

const _Schema = new Schema<IvotoNQN>({
     NOMBRE: { type: String },
     DNI: { type: String },
     LOCALIDAD: { type: String },
});

export const votoNQN = model<IvotoNQN>('votoNQN', _Schema, 'votoNQN');
