import { Schema, model } from 'mongoose';

export interface IPerVoto extends Document {
     dni: string;
     apellido: string;
     nombre: string;
     role: string;
     legajo: string;
     servicio: string;
     votos: number;
     votaron: number;
     afiliado: number;
     femenino: number;
     masculino: number;
}

const _Schema = new Schema<IPerVoto>({
     dni: { type: String, lowecase: true },
     apellido: { type: String, lowecase: true },
     nombre: { type: String, lowecase: true },
     role: { type: String, lowecase: true },
     legajo: { type: String, lowecase: true },
     servicio: { type: String, lowecase: true },
     votos: { type: Number },
     votaron: { type: Number },
     afiliado: { type: Number },
     femenino: { type: Number },
     masculino: { type: Number },
});

export const votoPersona = model<IPerVoto>('votosXPersona', _Schema, 'votosXPersona');
