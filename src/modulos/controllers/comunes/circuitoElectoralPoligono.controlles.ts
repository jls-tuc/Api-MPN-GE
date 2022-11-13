import { Request, Response } from 'express';
import { geoCircuitos } from '../../models/comunes/circuitoElectoralPoligono';

export const getAllCircuitos = async (req: Request, res: Response) => {
     try {
          await geoCircuitos.find({}, (err, circ) => {
               let poligono = {
                    type: 'FeatureCollection',
                    totalFeatures: circ.length,
                    features: circ,
                    crs: {
                         type: 'name',
                         properties: {
                              name: 'urn:ogc:def:crs:EPSG::4326',
                         },
                    },
               };
               res.status(200).json({ ok: true, poligono, circ });
          });
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};
