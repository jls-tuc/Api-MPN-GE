import { Schema, model, Document } from 'mongoose';

interface Ilistas {
     lista: string;
     resultado: number;
}
interface Imesas {
     mesa: string;
     ordenTotal: number;
     actaCargada: boolean;
     resultadosMesa: {
          listas: Ilistas[];
          votosNulos: number;
          votosRecurridos: number;
          votosBlanco: number;
          votosImpugnados: number;
          totalVotos: number;
          electoresVotaron: number;
          sobresUrna: number;
          diferencia: number;
     };
}
export interface IjsonApp extends Document {
     establecimiento: string;
     localidad: string;
     resultadosGral: {
          listas: Ilistas[];
          votosNulos: number;
          votosRecurridos: number;
          votosBlanco: number;
          votosImpugnados: number;
          totalVotos: number;
          electoresVotaron: number;
          sobresUrnas: number;
          diferencia: number;
     };
     mesas: Imesas[];
}

const _Schema = new Schema<IjsonApp>({
     establecimiento: { type: String, unique: true },
     localidad: { type: String, lowercase: true },
     resultadosGral: {
          listas: [
               {
                    lista: { type: String, lowercase: true },
                    resultado: { type: Number },
               },
          ],
          votosNulos: { type: Number },
          votosRecurridos: { type: Number },
          votosBlanco: { type: Number },
          votosImpugnados: { type: Number },
          totalVotos: { type: Number },
          electoresVotaron: { type: Number },
          sobresUrnas: { type: Number },
          diferencia: { type: Number },
     },
     mesas: [
          {
               mesa: { type: String },
               ordenTotal: { type: Number },
               actaCargada: { type: Boolean },
               resultadoMesa: {
                    listas: [
                         {
                              lista: { type: String, lowercase: true },
                              resultado: { type: Number },
                         },
                    ],
                    votosNulos: { type: Number },
                    votosRecurridos: { type: Number },
                    votosBlanco: { type: Number },
                    votosImpugnados: { type: Number },
                    totalVotos: { type: Number },
                    electoresVotaron: { type: Number },
                    sobresUrna: { type: Number },
                    diferencia: { type: Number },
               },
          },
     ],
});

export const actasEscrutinio = model<IjsonApp>('actasEscrutinio', _Schema, 'actasEscrutinio');
