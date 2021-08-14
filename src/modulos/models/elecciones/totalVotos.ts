import { Schema, model } from 'mongoose';
import { Interface } from 'readline';

const IvotosCalc = new Schema<IvotosCalc>({
   idUsuario: { type: String, lowecase: true, unique: true },
   role: { type: String, lowecase: true },
   coordinador: { type: String, lowecase: true },
   referente: { type: String, lowecase: true },
   afiliado: { type: Number, lowecase: true },
   femenino: { type: Number },
   votos: { type: Number },
});
export interface IvotosCalc extends Document {
   idUsuario: string;
   role: string;
   coordinador: string;
   referente: string;
   afiliado: number;
   femenino: number;
   votos: number;
}
export const votosGraf = model<IvotosCalc>('votosGraf', IvotosCalc, 'votosGraf');
