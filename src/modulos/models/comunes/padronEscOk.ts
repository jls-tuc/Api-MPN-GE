import { Schema, model, Document } from 'mongoose';

export interface IpadronIndpAf2022 extends Document {
     _id?: string;
     seccion: string;
     codSeccion: string;
     circuito: string;
     codCircuito: string;
     apellido: string;
     nombre: string;
     genero: string;
     tipoDocumento: string;
     matricula: string;
     fechaNacimiento: string;
     clase: string;
     estadoAfiliacion: string;
     fechaDomicilio: string;
     domicilio: string;
     establecimiento: string;
     domEstablecimiento: string;
     mesa: string;
     orden: string;
     localidad: string;
     voto: boolean;
     __v?: number;
}

const _Schema = new Schema(
     {
          apellido: { type: String },
          circuito: { type: String },
          clase: { type: String },
          codCircuito: { type: String },
          codSeccion: { type: String },
          domEstablecimiento: { type: String },
          domicilio: { type: String },
          establecimiento: { type: String },
          estadoAfiliacion: { type: String },
          fechaDomicilio: { type: String },
          fechaNacimiento: { type: String },
          genero: { type: String },
          localidad: { type: String },
          matricula: { type: String },
          mesa: { type: String },
          nombre: { type: String },
          orden: { type: String },
          seccion: { type: String },
          tipoDocumento: { type: String },
          voto: { type: Boolean },
     },
     { timestamps: true }
);

export const padronEscOk = model('padronEscOk', _Schema, 'padronEscOk');
