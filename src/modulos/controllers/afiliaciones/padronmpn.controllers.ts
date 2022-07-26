import { Request, Response } from 'express';
import { MPNPadron, padronmpn } from '../../models/afiliaciones/padronmpn';
import fs = require('fs')
import { Idepartamentos, Ilocalidades, Ipadronmpn, MPNlistados } from '../../models/afiliaciones/listados';
import { clone } from '../../models/comunes/datosPersonales';

export const getAfiliados = async (req: Request, res: Response) => {
  await MPNPadron.find({}, (err, data) => {
    if (err) {
      res.status(200).json({ ok: false, err });
    } else {
      console.log('data', data)
      res.status(200).json({ ok: true, data });
    }
  });
};

export const getMigrarArchivo = async (req: Request, res: Response) => {

  const results: any = []
  fs.readFile('/Users/alecordoba/Desarrollo/APIS/api-apex/src/modules/agenda/routes/datos.txt', 'utf-8', (error, data) => {
    let lines = data.split("\n");
    let vacio = false
    let guardar = false

    lines.map((linea: any) => {
      let temp = linea.split("\t")
      if (temp[1] === 'Cod. Sección') {
        guardar = true
      }
      if (guardar && temp[1] !== 'Cod. Sección' && temp[1] !== undefined && temp[2] !== undefined && temp[3] !== undefined && temp[4] !== undefined && temp[5] !== undefined) {
        if (temp[0] !== '') {
          let objeto: padronmpn = {
            seccion: temp[0],
            codSeccion: temp[1],
            circuito: temp[2],
            codCircuito: temp[3],
            apellido: temp[4],
            nombre: temp[5],
            genero: temp[6],
            tipoDocumento: temp[7],
            matricula: temp[8],
            fechaNacimiento: temp[9],
            clase: temp[10],
            estadoActualElector: temp[11],
            estadoAfiliacion: temp[12],
            fechaAfiliacion: temp[13],
            analfabeto: temp[14],
            profesion: temp[15],
            fechaDomicilio: temp[16],
            domicilio: temp[17].replace(/(\r\n|\n |\r)/gm, ""),
          }

          results.push(objeto)
          return


          let padron = new MPNPadron(objeto)
          padron.save()
        }
        if (temp[1] === '') {
          guardar = false
        }
      }
    })

  })
};


export const getListados = async (req: Request, res: Response) => {

  const results: any = await MPNPadron.find().lean()
  let datos: Ipadronmpn[] = []
  let deptos: Idepartamentos[] = []
  let localidades: Ilocalidades[] = []
  results.map((objeto: any) => {
    if (deptos.length === 0) {
      localidades.push({
        localidad: objeto.circuito,
        total: 1,
        totalFemenino: objeto.genero === 'F' ? 1 : 0,
        totalMasculino: objeto.genero === 'M' ? 1 : 0,
        totalNoBinario: objeto.genero === 'X' ? 1 : 0,
        empadronados: [objeto]
      })

      deptos.push({
        departamento: objeto.seccion,
        total: 1,
        totalFemenino: objeto.genero === 'F' ? 1 : 0,
        totalMasculino: objeto.genero === 'M' ? 1 : 0,
        totalNoBinario: objeto.genero === 'X' ? 1 : 0,
        localidades: localidades
      })
    }
    else {
      let encontroDepartamento = false
      for (let dep = 0; dep < deptos.length; dep++) {
        const depto: Idepartamentos = deptos[dep];
        if (depto.departamento === objeto.seccion) {
          encontroDepartamento = true
          depto.total++
          depto.totalFemenino += objeto.genero === 'F' ? 1 : 0
          depto.totalMasculino += objeto.genero === 'M' ? 1 : 0
          depto.totalNoBinario += objeto.genero === 'X' ? 1 : 0
          let encontroLocalidad = false
          depto.localidades.map((localidad: Ilocalidades) => {
            if (localidad.localidad === objeto.circuito) {
              encontroLocalidad = true
              localidad.total++
              localidad.totalFemenino += objeto.genero === 'F' ? 1 : 0
              localidad.totalMasculino += objeto.genero === 'M' ? 1 : 0
              localidad.totalNoBinario += objeto.genero === 'X' ? 1 : 0
              localidad.empadronados.push(objeto)
            }
          })
          if (!encontroLocalidad) {
            let localidadTemp = {
              localidad: objeto.circuito,
              total: 1,
              totalFemenino: objeto.genero === 'F' ? 1 : 0,
              totalMasculino: objeto.genero === 'M' ? 1 : 0,
              totalNoBinario: objeto.genero === 'X' ? 1 : 0,
              empadronados: [objeto]
            }
            depto.localidades.push(localidadTemp)
          }
        }
      }
      if (!encontroDepartamento) {

        localidades = []
        localidades.push({
          localidad: objeto.circuito,
          total: 1,
          totalFemenino: objeto.genero === 'F' ? 1 : 0,
          totalMasculino: objeto.genero === 'M' ? 1 : 0,
          totalNoBinario: objeto.genero === 'X' ? 1 : 0,
          empadronados: [objeto]
        })
        deptos.push({
          departamento: objeto.seccion,
          total: 1,
          totalFemenino: objeto.genero === 'F' ? 1 : 0,
          totalMasculino: objeto.genero === 'M' ? 1 : 0,
          totalNoBinario: objeto.genero === 'X' ? 1 : 0,
          localidades: localidades
        })
      }
    }
  }
  )
  deptos.map(async (depto: Idepartamentos) => {
    /* let deptoTemp = new MPNlistados(depto) */
    /*await deptoTemp.save()  */
    /* console.log('==========================')
    console.log('Departamento: ', depto.departamento)
    console.log('Total de Empadronados: ', depto.total)
    console.log('Total de Empadronados Femenino: ', depto.totalFemenino)
    console.log('Total de Empadronados Masculino: ', depto.totalMasculino)
    console.log('Total de Empadronados No Binario: ', depto.totalNoBinario) */
    depto.localidades.map((localidad: Ilocalidades) => {
      /*  console.log('------------------------------------------------------')
       console.log('Localidad: ', localidad.localidad)
       console.log('Total de Empadronados: ', localidad.total)
       console.log('Total de Empadronados Femenino: ', localidad.totalFemenino)
       console.log('Total de Empadronados Masculino: ', localidad.totalMasculino)
       console.log('Total de Empadronados No Binario: ', localidad.totalNoBinario) */
      /*  localidad.empadronados.map((empadronado: padronmpn) => {
         console.log('empadronado', empadronado)
       }) */
    })
  })

  let totales = {

    totalFemenino: results.filter((e: any) => e.genero === 'F').length,
    totalMasculino: results.filter((e: any) => e.genero === 'M').length,
    totalNoBinario: results.filter((e: any) => e.genero === 'X').length,
    total: results.filter((e: any) => e.genero === 'X').length + results.filter((e: any) => e.genero === 'M').length + results.filter((e: any) => e.genero === 'F').length
  }
  /* console.log('Total de Empadronados Femenino:', totales.totalFemenino)
  console.log('Total de Empadronados Masculino:', totales.totalMasculino)
  console.log('Total de Empadronados No Binario:', totales.totalNoBinario)
  console.log('Total de Empadronados:', totales.total) */
  return res.status(200).json({
    ok: true,
    mensaje: 'Archivo cargado correctamente',
    deptos,
    totales
  });
};

