import { Schema, model, Document } from 'mongoose';
export interface LocalidadesParajesComprende {
     _id: string;
     nombre: string;
}
export interface DatosResponsable {
     apellido: string;
     dni: string;
     email: string;
     fecha_alta: string;
     nombres: string;
     telefono: string;
}
export interface ISeccional extends Document {
     seccional: string;
     fecha_alta: string;
     telefono: string;
     localidad: string;
     codigo_postal: string;
     calle: string;
     numero: string;
     dpto: string;
     piso: string;
     estado: boolean;
     datos_responsable: DatosResponsable;
     localidades_parajes_comprende: LocalidadesParajesComprende[];
}

const _Schema = new Schema(
     {
          seccional: { type: String, lowercase: true },
          fecha_alta: { type: String },
          telefono: { type: String, lowercase: true },
          localidad: { type: String, lowercase: true },
          codigo_postal: { type: String, lowercase: true },
          calle: { type: String, lowercase: true },
          numero: { type: String, lowercase: true },
          dpto: { type: String, lowercase: true },
          piso: { type: String, lowercase: true },
          estado: { type: String, lowercase: true },
          datos_responsable: {
               nombres: { type: String, lowercase: true },
               apellido: { type: String, lowercase: true },
               dni: { type: String },
               fecha_alta: { type: String, lowercase: true },
               telefono: { type: String, lowercase: true },
               email: { type: String },
          },
          localidades_parajes_comprende: [
               {
                    nombre: { type: String, lowercase: true },
               },
          ],
     },
     { timestamps: true }
);

export const seccionales = model<ISeccional>('seccionales', _Schema, 'seccionales');
