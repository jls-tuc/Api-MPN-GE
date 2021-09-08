import { Request, Response } from 'express';
import moment from 'moment';
import { usuarios } from '../../../Auth/models/authUsers.model';
import { votoPersona } from '../../../util/votosPersonas';
import { geoEscuela } from '../../models/elecciones/geo/votosXEsc';
import { votoAdh } from '../../models/elecciones/votoAdhesion';
import { infoAppMovil } from '../../models/elecciones/votos-12/infoAppMovil';

export const postDatos = async (req: Request, res: Response) => {
     let infoAppM: any = req.body;

     for (let dataApp of infoAppM) {
          let result = await votoAdh.findOne({
               mesa: dataApp.mesa,
               orden: dataApp.orden,
               establecimiento: dataApp.establecimiento,
          });
          if (result !== null) {
               await updateVotoGeoEsc(dataApp.mesa, dataApp.establecimiento);
               await updateVotoXPersona(result.resPlanilla);
               (result.realizoVoto = 'si'), result.save();
               dataApp.votoSubido = 'si';
               let voto = {
                    orden: dataApp.orden,
                    votoSuido: dataApp.votoSubido,
                    establecimiento: dataApp.establecimiento,
                    usuario: dataApp.usuario,
                    fecha: moment().format('YYYY/MM/DD'),
                    hora: moment().format('hh:mm'),
               };

               let guardar = new infoAppMovil(voto);
               await guardar.save();
          } else {
               await updateVotoGeoEsc(dataApp.mesa, dataApp.establecimiento);
               let voto = {
                    orden: dataApp.orden,
                    votoSuido: dataApp.votoSubido,
                    establecimiento: dataApp.establecimiento,
                    usuario: dataApp.usuario,
                    fecha: moment().format('YYYY/MM/DD'),
                    hora: moment().format('hh:mm'),
               };
               let guardar = new infoAppMovil(voto);
               await guardar.save();
          }
     }

     res.status(200).json({
          ok: true,
          infoAppM,
     });
};

const updateVotoGeoEsc = async (mesa, establecimiento) => {
     await geoEscuela.findOne({ mesa: mesa, establecimiento: establecimiento }, (err, data) => {
          if (err) {
               return false;
          } else {
               if (data !== null) {
                    console.log(data);
                    data.votaron + 1, data.save();
               }
          }
     });
     return true;
};

const updateVotoXPersona = async (resplanilla) => {
     let id: any;

     for (let usr of resplanilla) {
          if (usr.idCoordinador && usr.idReferente && usr.idResPlanilla) {
               id = usr.idResPlanilla;
          } else if (usr.idCoordinador && usr.idReferente) {
               id = usr.idReferente;
          } else {
               id = usr.idCoordinador;
          }

          await usuarios.findById(id, { 'datosPersonales.dni': 1 }, {}, async (err, data) => {
               if (err) {
                    return false;
               } else if (data !== null) {
                    await votoPersona.findOne({ dni: data.datosPersonales.dni }, (err, data) => {
                         if (err) {
                              return false;
                         } else if (data !== null) {
                              (data.votaron = +1), data.save();
                         }
                    });
               }
          });
     }
     return true;
};
