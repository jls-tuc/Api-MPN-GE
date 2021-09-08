
import { Request, Response } from 'express';
import { afiliado } from '../../modulos/models/elecciones/afiliadosMpn';
import { estProv } from '../../modulos/models/elecciones/establecimientos';
import { padron } from '../../modulos/models/elecciones/padronNeuquen';
import { votoAdh } from '../../modulos/models/elecciones/votoAdhesion';
export const crearJsonUsr = async (req: Request, res: Response) => {
  let establecimientos: any = await estProv.find({}, { establecimiento: 1, localidad: 1, codigo: 1 });
  let data: any = [];
  let contEst = 0;
  for (let est of establecimientos) {

    if (contEst === 0) {
      let estTemp = {
        establecimiento: est.establecimiento,
        localidad: est.localidad,
        usuario: est.codigo,
      }
      await data.push(estTemp)

    } else {
      if (est.establecimiento !== data[contEst - 1].establecimiento) {
        console.log(`estTemp`, data[contEst - 1].establecimiento)
        console.log(`est.establecimiento`, est.establecimiento)
        let estTemp = {
          establecimiento: est.establecimiento,
          localidad: est.localidad,
          usuario: est.codigo,
        }
        await data.push(estTemp);

      } else {
        if (est.localidad !== data[contEst - 1].localidad) {
          console.log(`estTemp`, data[contEst - 1].establecimiento)
          console.log(`est.establecimiento`, est.establecimiento)
          let estTemp = {
            establecimiento: est.establecimiento,
            localidad: est.localidad,
            usuario: est.codigo,
          }
          await data.push(estTemp);
        }
      }

    }
    contEst++;
    console.log(`contEst`, contEst)
  }
  return res.status(200).json({
    ok: true,
    data,
  });
};
export const crearJsonApp = async (req: Request, res: Response) => {
  let establecimientos: any = await estProv.find({}, { establecimiento: 1, localidad: 1, codigo: 1 });
  let estTemp: any;
  let data: any = [];
  let contEst = 0;
  let priEst = 0;
  for (let est of establecimientos) {
    //console.log(`est`, est)
    let padEst: any = await padron.find({ establecimiento: est.establecimiento, localidad: est.localidad }, { documento: 1, establecimiento: 1, mesa: 1, orden: 1, genero: 1 }).sort({ establecimiento: 1, mesa: 1 });
    if (padEst === null) {
      console.log(`Essssste no esta`, est.establecimiento)
      return
    }
    let mesa = 0;
    let ordenPos = 0;
    let obs1 = "";
    let obs2 = "";
    for (let pad of padEst) {
      let votoAfi: any = await afiliado.findOne({ dni: pad.documento });
      let tipoVoto: any = await votoAdh.findOne({ dni: pad.documento });
      if (votoAfi !== null) {
        obs1 = "SI";
      } else {
        obs1 = "NO";
      }
      if (tipoVoto !== null) {
        obs2 = "SI";
      } else {
        obs2 = "NO";
      }

      if (priEst === 0) {
        estTemp = {
          establecimiento: est.establecimiento,
          localidad: est.localidad,
          usuario: est.codigo,
          mesas: [{
            mesa: pad.mesa,
            orden: [{
              orden: pad.orden,
              genero: pad.genero,
              obs1: obs1,
              obs2: obs2,
            }
            ]
          }],
        }
        await data.push(estTemp)
        ordenPos++;
        priEst++;
      } else {
        if (pad.mesa === data[contEst].mesas[mesa].mesa) {
          let orden = {
            orden: pad.orden,
            genero: pad.genero,
            obs1: obs1,
            obs2: obs2,
          }
          await data[contEst].mesas[mesa].orden.push(orden);

        } else {
          mesa++;
          let mesaTemp = {
            mesa: pad.mesa,
            orden: [{
              orden: pad.orden,
              genero: pad.genero,
              obs1: obs1,
              obs2: obs2,
            }]
          }
          await data[contEst].mesas.push(mesaTemp);
        }
      }
    }
    priEst = 0
    contEst++;
    console.log(`contEst`, contEst)

  }
  let cont = 1
  for (let est of establecimientos) {
    let falta: any = await data.find(res => res.establecimiento === est.establecimiento && res.localidad === est.localidad);
    if (falta === null) {
      console.log(`dato.establecimieinto`, est.establecimieinto, " ", est.localidad)
      return
    } else {
      console.log(`entro`)
      console.log(`cont`, cont)
      cont++
    }
  }
  return res.status(200).json({
    ok: true,
    data,
  });
};
