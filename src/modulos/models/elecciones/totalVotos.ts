import { Schema, model } from 'mongoose';

const IvotosCalc = new Schema<IvotosCalc>({
     idUsuario: { type: String, lowecase: true, unique: true },
     role: { type: String, lowecase: true },
     coordinador: { type: String, lowecase: true },
     referente: { type: String, lowecase: true },
     afiliado: { type: Number, lowecase: true },
     femenino: { type: Number, lowecase: true },
     votos: { type: Number },
     votaron: { type: Number },
     votaronA: { type: Number },
     votaronF: { type: Number },
});
export interface IvotosCalc extends Document {
     idUsuario: string;
     role: string;
     coordinador: string;
     referente: string;
     afiliado: number;
     femenino: number;
     votos: number;
     votaron: number;
     votaronA: number;
     votaronF: number;
}
export const votosGraf = model<IvotosCalc>('votosGraf', IvotosCalc, 'votosGraf');
