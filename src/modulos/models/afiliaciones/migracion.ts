import { Schema, model } from 'mongoose';

export interface fichaImportar {

  _id?: string;
  numero: string;
  documento: string;
  Nombre: string;
  circuito: string;
  ocupacion: string;
  Direccion: string;
  fechaNac: string;
  lugarNac: string;
  referente: string;
  EstadoCivil: string;
  FechaAfil: string;
  Afiliacion: string;
  lote: string;
  observaciones: string;

}

const _schemaFicha = new Schema(
  {
    numero: { type: String, unique: true, es_indexed: true },
    documento: { type: String, lowercase: true, trim: true },
    Nombre: { type: String, lowercase: true, trim: true },
    circuito: { type: String, lowercase: true, trim: true },
    ocupacion: { type: String, lowercase: true, trim: true },
    EstadoCivil: { type: String, lowercase: true, trim: true },
    FechaAfil: { type: String, lowercase: true, trim: true },
    Afiliacion: { type: String, lowercase: true, trim: true },
    Direccion: { type: String, lowercase: true, trim: true },
    fechaNac: { type: String, lowercase: true, trim: true },
    lugarNac: { type: String, lowercase: true, trim: true },
    lote: { type: String, lowercase: true, trim: true },
    referente: { type: String, lowercase: true, trim: true },
    observaciones: { type: String, lowercase: true, trim: true },
  }
);
export const fichaMigrarSchema = _schemaFicha;
export const fichaMigracion = model('fichaImportar', _schemaFicha, 'fichaImportar');

export interface loteImportar {

  _id?: string;
  numero: string;
  referente: string;
  fechaPres: string;
  fechaCreacion: string;
  cerrado: string;
  observaciones: string;
  cantFichas_borrar: string;

}

const _schema = new Schema(
  {
    numero: { type: String, unique: true, es_indexed: true },
    referente: { type: String, lowercase: true, trim: true },
    fechaPres: { type: String, lowercase: true, trim: true },
    fechaCreacion: { type: String, lowercase: true, trim: true },
    cerrado: { type: String, lowercase: true, trim: true },
    observaciones: { type: String, lowercase: true, trim: true },
    cantFichas_borrar: { type: String, lowercase: true, trim: true },
  }
);
export const LoteMigrarSchema = _schema;
export const loteMigracion = model('loteImportar', _schema, 'loteImportar');
