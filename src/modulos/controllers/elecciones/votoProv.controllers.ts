import { Request, Response } from 'express';
import { afiliado } from '../../models/elecciones/afiliadosMpn';
import { IvotosCalc, votosGraf } from '../../models/elecciones/totalVotos';
import { votoProv, IvotoProv } from '../../models/elecciones/votoProvisorio';
import { usuarios, Iusuario } from '../../../Auth/models/authUsers.model';
import { cargarVotoGraf } from '../../../util/agregarVoto';

export const guardarVoto = async (req: Request, res: Response) => {
   // console.log(req.body.resPlanilla);
   const voto: IvotoProv = await votoProv.findOne({ dni: req.body.dni });
   // console.log(voto);
   if (voto) {
      if (voto.resPlanilla.some((data) => data.idCoordinador === req.body.resPlanilla.idCoordinador)) {
         if (voto.resPlanilla.some((data) => data.idReferente === req.body.resPlanilla.idReferente)) {
            return res.status(200).json({
               ok: false,
               msg: 'El Voto ya se encuentra cargado, dentro de su estructura',
            });
         }
      }
      //  console.log('no esta el ID');
      voto.resPlanilla.push(req.body.resPlanilla);
      await voto.save();
      return res.status(200).json({
         ok: true,
         msg: 'El dni ya se econtraba cargado, se agrego un responsable de planilla',
      });
   } else {
      //console.log('no existe el voto');
      const nVoto: IvotoProv = new votoProv(req.body);
      await nVoto.save();
      return res.status(200).json({
         ok: true,
         nVoto,
      });
   }
};

export const getvotos = async (req: Request, res: Response) => {
   let votos: any;

   if (req.query.consulta === 'Referente') {
      votos = await votoProv.find({ 'resPlanilla.idReferente': req.query.valor }).lean();
   } else if (req.query.consulta === 'Resplanilla') {
      votos = await votoProv.find({ 'resPlanilla.idResPlanilla': req.query.valor }).lean();
   } else if (req.query.consulta === 'Coord') {
      votos = await votoProv.find({ 'resPlanilla.idCoordinador': req.query.valor }).lean();
   } else {
      return res.status(300).json({
         ok: false,
         msg: 'Faltan datos para la busqueda',
      });
   }
   if (votos === null) {
      res.status(300).json({
         ok: false,
         msg: 'Algo esta mal',
      });
   } else {
      const votosUnicos = await Array.from(new Set(votos));
      let totalV = votosUnicos.length;
      res.status(200).json({
         ok: true,
         votosUnicos,
         totalV,
      });
   }
};
export const getOneVoto = async (req: Request, res: Response) => {
   await votoProv.findOne({ dni: req.body.dni }, (err, data: IvotoProv) => {
      if (err) {
         res.status(300).json({
            ok: false,
            msg: 'Verificar los datos ingresados',
            err,
         });
      }
      if (data) {
         return res.status(200).json({
            ok: true,
            data,
         });
      } else {
         return res.status(200).json({
            ok: false,
            msg: 'El Numero de documento no fue cargado.',
         });
      }
   });
};

///////////////////////cargar votosdeGrafff

export const cargarVoto = async (req: Request, res: Response) => {
   console.log('dataaaaaa');
   let data: any = req.body;
   let voto = await cargarVotoGraf(data);
   if (voto) {
      return res.status(200).json({
         ok: true,
      });
   } else {
      return res.status(300).json({
         ok: false,
      });
   }
};

export const getCalculoTotal = async (req: Request, res: Response) => {
   let totales = await votosGraf.find().lean();

   let dato: any = {
      organizacion: String,
      nombreCompleto: String,
      role: String,
      coordinador: String,
      totalafiliados: Number,
      toatlnoafiliados: Number,
      totalvotos: Number,
   };
   let data: any = [];
   for (let calc of totales) {
      let usuario = await usuarios.findOne(
         { _id: calc.idUsuario },
         { 'datosPersonales.areaResponsable': 1, 'datosPersonales.apellido': 1, 'datosPersonales.nombres': 1 }
      );
      if (usuario !== null) {
         let totalnoafiliados = calc.votos - calc.afiliado;
         data.push({
            organizacion: usuario.datosPersonales.areaResponsable,
            nombrecompleto: usuario.datosPersonales.apellido + ' ' + usuario.datosPersonales.nombres,
            coordinador: calc.coordinador,
            role: calc.role,
            totalafiliados: calc.afiliado,
            totalnoafiliados: totalnoafiliados,
            totalvotos: calc.votos,
         });
      } else {
         console.log(`Usuario no Existe: `, calc.idUsuario);
      }
   }
   console.log(`Ya esta!!!`);
   res.status(200).json({
      ok: true,
      data,
   });
};

export const getvotosGrafica = async (req: Request, res: Response) => {
   console.log('estoy');
   await votoProv.find((err, data: any) => {
      console.log(err);
      if (err) {
         res.status(300).json({
            ok: false,
            err,
         });
      } else {
         let votosTotal = data.length;
         let afiliados = data.filter((datos: any) => datos.afiliado === 'Es afiliado al MPN').length;
         let femenino = data.filter((datos: any) => datos.genero === 'M').length;
         let masculino = votosTotal - femenino;
         let noafiliados = votosTotal - afiliados;

         res.status(200).json({
            ok: true,
            votosTotal,
            afiliados,
            femenino,
            masculino,
            noafiliados,
         });
      }
   });
};
