import { usuarios } from '../Auth/models/authUsers.model';
import { planta } from '../modulos/models/elecciones/empleadosPlanta';
import { votoAdh } from '../modulos/models/elecciones/votoAdhesion';
import { votoPersona } from './votosPersonas';

export const usrConVotos = async (data?: any) => {
     console.log('entra');
     let id: any;
     let genero = data.sexo;
     let afiliado = data.afiliado;

     if (data.resPlanilla.idCoordinador && data.resPlanilla.idReferente && data.resPlanilla.idResPlanilla) {
          id = data.resPlanilla.idResPlanilla;
     } else if (data.resPlanilla.idCoordinador && data.resPlanilla.idReferente) {
          id = data.resPlanilla.idReferente;
     } else {
          id = data.resPlanilla.idCoordinador;
     }

     let us = await usuarios.findById(id, {
          role: 1,
          idCoordinador: 1,
          idReferente: 1,
          'datosPersonales.dni': 1,
          'datosPersonales.nombres': 1,
          'datosPersonales.apellido': 1,
     });

     let datoEmp = await planta.findOne({ dni: us.datosPersonales.dni });
     if (datoEmp !== null) {
          let total: any = await votoPersona.findOne({ dni: us.datosPersonales.dni });
          // console.log(total);
          if (total !== null) {
               genero === 'F' ? total.femenino++ : total.masculino++;
               afiliado === 'Es afiliado al MPN' ? total.afiliado++ : console.log('no es Afiliado');
               total.votos++;
               //console.log('antes de guardar resp', total);
               await total.save();
               return true;
          } else {
               if (afiliado === 'Es afiliado al MPN') {
                    if (genero === 'F') {
                         let datos: any = {
                              dni: us.datosPersonales.dni,
                              apellido: us.datosPersonales.nombres,
                              nombre: us.datosPersonales.apellido,
                              role: us.role,
                              legajo: datoEmp.legajo,
                              servicio: datoEmp.servicio,
                              votos: 1,
                              afiliado: 1,
                              femenino: 1,
                              masculino: 0,
                         };
                         const nPersona = new votoPersona(datos);
                         await nPersona.save();
                    } else {
                         let datos: any = {
                              dni: us.datosPersonales.dni,
                              apellido: us.datosPersonales.nombres,
                              nombre: us.datosPersonales.apellido,
                              role: us.role,
                              legajo: datoEmp.legajo,
                              servicio: datoEmp.servicio,
                              votos: 1,
                              afiliado: 1,
                              femenino: 0,
                              masculino: 1,
                         };

                         const nPersona = new votoPersona(datos);
                         await nPersona.save();
                    }
               } else {
                    let result = await crearVoto(afiliado, genero, datoEmp, us);
               }
          }
     } else {
          let dato: {
               legajo: 'No existe registro';
               servicio: 'No existe registro';
          };
          await crearVoto(afiliado, genero, dato, us);
     }
};

const crearVoto = async (afiliado, genero, datoEmp, us) => {
     if (afiliado === 'Es afiliado al MPN') {
          if (genero === 'F') {
               let datos: any = {
                    dni: us.datosPersonales.dni,
                    apellido: us.datosPersonales.nombres,
                    nombre: us.datosPersonales.apellido,
                    role: us.role,
                    legajo: datoEmp.legajo,
                    servicio: datoEmp.servicio,
                    votos: 1,
                    afiliado: 1,
                    femenino: 1,
                    masculino: 0,
               };
               const nPersona = new votoPersona(datos);
               await nPersona.save();
               return true;
          } else {
               let datos: any = {
                    dni: us.datosPersonales.dni,
                    apellido: us.datosPersonales.nombres,
                    nombre: us.datosPersonales.apellido,
                    role: us.role,
                    legajo: datoEmp.legajo,
                    servicio: datoEmp.servicio,
                    votos: 1,
                    afiliado: 1,
                    femenino: 0,
                    masculino: 1,
               };

               const nPersona = new votoPersona(datos);
               await nPersona.save();
               return true;
          }
     } else {
          if (genero === 'F') {
               let datos: any = {
                    dni: us.datosPersonales.dni,
                    apellido: us.datosPersonales.nombres,
                    nombre: us.datosPersonales.apellido,
                    role: us.role,
                    legajo: datoEmp.legajo,
                    servicio: datoEmp.servicio,
                    votos: 1,
                    afiliado: 0,
                    femenino: 1,
                    masculino: 0,
               };
               const nPersona = new votoPersona(datos);
               await nPersona.save();
               return true;
          } else {
               let datos: any = {
                    dni: us.datosPersonales.dni,
                    apellido: us.datosPersonales.nombres,
                    nombre: us.datosPersonales.apellido,
                    role: us.role,
                    legajo: datoEmp.legajo,
                    servicio: datoEmp.servicio,
                    votos: 1,
                    afiliado: 0,
                    femenino: 0,
                    masculino: 1,
               };

               const nPersona = new votoPersona(datos);
               await nPersona.save();
               return true;
          }
     }
};
