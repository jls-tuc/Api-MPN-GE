import * as mongoose from 'mongoose';

export interface ILoteAfiliacion extends mongoose.Document {
     _id?: string;
     nro: string;
     usuarioResponsable: {
          nombreCompleto: string;
          dni: string;
          telefono: string;
          email: string;
     };
     lugarAfiliacion: {
          localidad: string;
          nombreEdificio: string;
          calle: string;
          numero: string;
          telefono: string;
     };
     planillas: [
          {
               _id?: string;
               nombre: string;
               apellido: string;
               documento: string;
               dm: string;
               rg: string;
               clase: string;
               genero: string;
               fechaNacimiento: string;
               lugar: string;
               profOficio: string;
               estadoCivil: string;
               ultDomicilio: {
                    distritoElec: string;
                    partidoDepto: string;
                    cuartelPedania: string;
                    localidad: string;
                    calle: string;
                    nro: string;
                    piso: string;
                    dep: string;
               };
               domicilioPostal: {
                    barrio: string;
                    circuito: string;
                    localidad: string;
                    calle: string;
                    nro: string;
                    piso: string;
                    dep: string;
                    telPar: string;
                    telTrab: string;
                    contacto: string;
                    observaciones: string;
               };
               estadoAf: string;
               fechaAfilia: string;
               fechaBaja: string;
               obserBaja: string;
          }
     ];
     fechaInicioAfiliacion: string;
     fechaFinAfiliacion: string;
     estadoAfiliacion: string;
     datosJusElc: {
          fechaIngresoJunta: string;
          fechaRespuestaJunta: string;
          estadoJunta: string;
          obserJunta: string;
     };
}



const _SchemaGrupo = new mongoose.Schema<ILoteAfiliacion>(
     {
          nro: { type: String, unique: true, es_indexed: true },
          usuarioResponsable: {

               nombreCompleto: { type: String },
               dni: { type: String },
               telefono: { type: String },
               email: { type: String },
          },
          lugarAfiliacion: {
               localidad: { type: String },
               nombreEdificio: { type: String },
               calle: { type: String },
               numero: { type: String },
               telefono: { type: String },
          },
          planillas: [
               {
                    nombre: { type: String, lowercase: true, trim: true },
                    apellido: { type: String, lowercase: true, trim: true },
                    documento: { type: String, lowercase: true },
                    dm: { type: String, lowercase: true },
                    rg: { type: String, lowercase: true },
                    clase: { type: String, lowercase: true },
                    genero: { type: String, lowercase: true, trim: true },
                    fechaNacimiento: { type: String },
                    lugar: { type: String, lowercase: true, trim: true },
                    profOficio: { type: String, lowercase: true, trim: true },
                    estadoCivil: { type: String, lowercase: true, trim: true },
                    ultDomicilio: {
                         distritoElec: { type: String, lowercase: true, trim: true },
                         partidoDepto: { type: String, lowercase: true, trim: true },
                         cuartelPedania: { type: String, lowercase: true, trim: true },
                         localidad: { type: String, lowercase: true, trim: true },
                         calle: { type: String, lowercase: true, trim: true },
                         nro: { type: String, lowercase: true, trim: true },
                         piso: { type: String, lowercase: true, trim: true },
                         dep: { type: String, lowercase: true, trim: true },
                    },
                    domicilioPostal: {
                         barrio: { type: String, lowercase: true, trim: true },
                         circuito: { type: String, lowercase: true, trim: true },
                         localidad: { type: String, lowercase: true, trim: true },
                         calle: { type: String, lowercase: true, trim: true },
                         nro: { type: String, lowercase: true },
                         piso: { type: String, lowercase: true },
                         dep: { type: String, lowercase: true },
                         telPar: { type: String, lowercase: true },
                         telTrab: { type: String, lowercase: true },
                         contacto: { type: String, lowercase: true, trim: true },
                         observaciones: { type: String, lowercase: true, trim: true },
                    },
                    estadoAf: { type: String, lowercase: true, trim: true },
                    fechaAfilia: { type: String },
                    fechaBaja: { type: String },
                    obserBaja: { type: String, lowercase: true },
               },
          ],
          fechaInicioAfiliacion: { type: String },
          fechaFinAfiliacion: { type: String },
          estadoAfiliacion: { type: String, lowercase: true, trim: true },
          datosJusElc: {
               fechaIngresoJunta: { type: String },
               fechaRespuestaJunta: { type: String },
               estadoJunta: { type: String, lowercase: true, trim: true },
               obserJunta: { type: String, lowercase: true },
          },
     },
     { timestamps: true }
);

export const loteAfiliacion = mongoose.model<ILoteAfiliacion>('loteAfiliacion', _SchemaGrupo, 'loteAfiliacion');
