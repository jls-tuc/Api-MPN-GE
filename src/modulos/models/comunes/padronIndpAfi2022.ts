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
     __v?: number;
}

const _Schema = new Schema(
     {
          seccion: { typer: String },
          codSeccion: { typer: String },
          circuito: { typer: String },
          codCircuito: { typer: String },
          apellido: { typer: String },
          nombre: { typer: String },
          genero: { typer: String },
          tipoDocumento: { typer: String },
          matricula: { typer: String },
          fechaNacimiento: { typer: String },
          clase: { typer: String },
          estadoAfiliacion: { typer: String },
          fechaDomicilio: { typer: String },
          domicilio: { typer: String },
          establecimiento: { typer: String },
          domEstablecimiento: { typer: String },
          mesa: { typer: String },
          orden: { typer: String },
          localidad: { typer: String },
     },
     { timestamps: true }
);

export const padronIndepAf2022 = model('padronInterna2022', _Schema, 'padronInterna2022');
