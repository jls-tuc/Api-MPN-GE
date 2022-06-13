import * as mongoose from 'mongoose';

export interface ILoteAfiliacion extends mongoose.Document {
     _id?: string;
     nro: string;
     usuarioResponsable: {
          apellido: string;
          nombres: string;
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
               apellido: { type: String },
               nombres: { type: String },
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
                    nombre: { type: String },
                    apellido: { type: String },
                    documento: { type: String },
                    dm: { type: String },
                    rg: { type: String },
                    clase: { type: String },
                    genero: { type: String },
                    fechaNacimiento: { type: String },
                    lugar: { type: String },
                    profOficio: { type: String },
                    estadoCivil: { type: String },
                    ultDomicilio: {
                         distritoElec: { type: String },
                         partidoDepto: { type: String },
                         cuartelPedania: { type: String },
                         localidad: { type: String },
                         calle: { type: String },
                         nro: { type: String },
                         piso: { type: String },
                         dep: { type: String },
                    },
                    domicilioPostal: {
                         barrio: { type: String },
                         circuito: { type: String },
                         localidad: { type: String },
                         calle: { type: String },
                         nro: { type: String },
                         piso: { type: String },
                         dep: { type: String },
                         telPar: { type: String },
                         telTrab: { type: String },
                         contacto: { type: String },
                         observaciones: { type: String },
                    },
               },
          ],
          fechaInicioAfiliacion: { type: String },
          fechaFinAfiliacion: { type: String },
          estadoAfiliacion: { type: String },
          datosJusElc: {
               fechaIngresoJunta: { type: String },
               fechaRespuestaJunta: { type: String },
               estadoJunta: { type: String },
               obserJunta: { type: String },
          },
     },
     { timestamps: true }
);

export const loteAfiliacion = mongoose.model<ILoteAfiliacion>('loteAfiliacion', _SchemaGrupo, 'loteAfiliacion');
