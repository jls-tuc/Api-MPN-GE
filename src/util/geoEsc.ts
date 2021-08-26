import { geoEscuela } from '../modulos/models/elecciones/geo/votosXEsc';
import { padron } from '../modulos/models/elecciones/padronNeuquen';

export const geoVotoEsc = async (data) => {
     //console.log('arranca');

     let total: number = 0;

     //TODO:Busco el dni en el padron

     let datos: any = await padron.findOne(
          { documento: data.dni },
          { genero: 1, mesa: 1, establecimiento: 1, localidad: 1, lat: 1, lon: 1 }
     );
     //console.log(datos);
     if (datos !== null) {
          //TODO:busco el establecimiento en el geoEscuela schema

          let esc: any = await geoEscuela.findOne({ mesaNro: datos.mesa });
          if (esc !== null) {
               data.afiliado === 'Es afiliado al MPN' ? esc.afiliado++ : console.log('no es afiliado');
               datos.genero === 'F' ? esc.femenino++ : esc.masculino++;
               esc.votosMesa++;
               await esc.save();
               return true;
          } else {
               if (data.afiliado === 'Es afiliado al MPN') {
                    if (datos.genero === 'F') {
                         let esc = {
                              mesaNro: datos.mesa,
                              establecimiento: datos.establecimiento,
                              localidad: datos.localidad,
                              votosMesa: 1,
                              masculino: 0,
                              femenino: 1,
                              afiliado: 1,
                              typeGeo: 'Point',
                              lon: datos.lon,
                              lat: datos.lat,
                         };

                         let nuevaEsc = new geoEscuela(esc);
                         await nuevaEsc.save();
                         return true;
                    } else {
                         let esc = {
                              mesaNro: datos.mesa,
                              establecimiento: datos.establecimiento,
                              localidad: datos.localidad,
                              votosMesa: 1,
                              masculino: 1,
                              femenino: 0,
                              afiliado: 1,
                              typeGeo: 'Point',
                              lon: datos.lon,
                              lat: datos.lat,
                         };

                         let nuevaEsc = new geoEscuela(esc);
                         await nuevaEsc.save();
                         return true;
                    }
               } else {
                    if (datos.genero === 'F') {
                         let esc = {
                              mesaNro: datos.mesa,
                              establecimiento: datos.establecimiento,
                              localidad: datos.localidad,
                              votosMesa: 1,
                              masculino: 0,
                              femenino: 1,
                              afiliado: 0,
                              typeGeo: 'Point',
                              lon: datos.lon,
                              lat: datos.lat,
                         };

                         let nuevaEsc = new geoEscuela(esc);
                         await nuevaEsc.save();
                         return true;
                    } else {
                         let esc = {
                              mesaNro: datos.mesa,
                              establecimiento: datos.establecimiento,
                              localidad: datos.localidad,
                              votosMesa: 1,
                              masculino: 1,
                              femenino: 0,
                              afiliado: 0,
                              typeGeo: 'Point',
                              lon: datos.lon,
                              lat: datos.lat,
                         };

                         let nuevaEsc = new geoEscuela(esc);
                         await nuevaEsc.save();
                         return true;
                    }
               }
          }
     }
     return false;
};
