import { Schema, model, Document } from 'mongoose';

export interface Geometry {
     type: string;
     coordinates: number[][][][];
}

export interface Properties {
     gid: number;
     distrito: string;
     provincia: string;
     departamen: string;
     cabecera: string;
     circuito: string;
     indec_p: string;
     indec_d: string;
     color: string;
     colorOutline: string;
     totalAfiliados: number;
     totalIndependientes: number;
     escuelas: [Iescuelas];
}

interface IcircuitosPolig extends Document {
     type: string;
     id: string;
     geometry: Geometry;
     geometry_name: string;
     properties: Properties;
}

interface Iescuelas {
     establecimiento: string;
     domEstablecimiento: string;
     localidad: string;
     mesas: Imesa[];
}
interface Imesa {
     mesa: string;
}

const _Schema = new Schema({
     type: { type: String },
     id: { type: String },
     geometry: {
          type: { type: String },
          coordinates: { type: [[[[Number]]]] },
     },
     geometry_name: { type: String },
     properties: {
          gid: { type: Number },
          distrito: { type: String },
          provincia: { type: String },
          departamen: { type: String },
          cabecera: { type: String },
          circuito: { type: String },
          indec_p: { type: String },
          indec_d: { type: String },
          color: { type: String },
          colorOutline: { type: String },
          totalAfiliados: { type: Number },
          totalIndependientes: { type: Number },
          escuelas: [
               {
                    establecimiento: { type: String, lowercase: true },
                    domEstablecimiento: { type: String, lowercase: true },
                    localidad: { type: String, lowercase: true },
                    mesas: [
                         {
                              mesa: { type: String, lowercase: true },
                         },
                    ],
               },
          ],
     },
});
export const geoCircuitos = model<IcircuitosPolig>('circuitosElectPoligonos', _Schema, 'circuitosElectPoligonos');
