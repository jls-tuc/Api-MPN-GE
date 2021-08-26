import { Schema, model } from 'mongoose';

export interface Iplanta extends Document {
   servicio: string;
   dni: string;
   legajo: string;
   apellido: string;
   nombres: string;
}

const _Schema = new Schema<Iplanta>({
   servicio: { type: String, lowcase: true },
   dni: { type: String, lowcase: true },
   legajo: { type: String, lowcase: true },
   apellido: { type: String, lowcase: true },
   nombres: { type: String, lowcase: true },
});

export const planta = model<Iplanta>('planta', _Schema, 'planta');
