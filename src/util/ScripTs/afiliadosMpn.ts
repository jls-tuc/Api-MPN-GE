import { Request, Response } from 'express';
import { afiliado2022 } from '../../modulos/models/elecciones/afiliados2022';
import { afiliado } from '../../modulos/models/elecciones/afiliadosMpn';
import { listadoJunta } from '../../modulos/models/elecciones/listadoJunta';

export const dataAfiliado = async (req: Request, res: Response) => {
     console.log('llega');
     let totalAfuera = 0;
     let totalSiguen = 0;
     let lisJuta = await listadoJunta.find();

     for (let data of lisJuta) {
          let nuevoAF: any = {
               seccion: data.seccion,
               cod_seccion: data.cod_seccion,
               circuito: data.circuito,
               cod_circuito: data.cod_circuito,
               nro_lote: '',
               apellido: data.apellido,
               nombre: data.nombre,
               genero: data.genero,
               tipo_documento: data.tipo_documento,
               documento: data.matricula,
               fecha_nacimiento: data.fecha_nacimiento,
               clase: data.clase,
               estado_actual_elector: data.estado_actual_elector,
               estado_afiliacion: data.estado_afiliacion,
               fecha_afiliacion: data.fecha_afiliacion,
               analfabeto: data.analfabeto,
               profesion: data.profesion,
               fecha_domicilio: data.fecha_domicilio,
               domicilio: data.domicilio,
               establecimiento: '',
               dom_establecimiento: '',
               mesa: '',
               orden: '',
          };

          let afiliadoNuevo = new afiliado2022(nuevoAF);
          await afiliadoNuevo.save();
     }
};
