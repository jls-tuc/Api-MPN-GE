import { Request, Response } from 'express';
import { stringify } from 'querystring';
import { afiliado } from '../../models/elecciones/afiliadosMpn';
import { IvotosCalc, votosGraf } from '../../models/elecciones/totalVotos';
import { votoProv, IvotoProv } from '../../models/elecciones/votoProvisorio';
import { usuarios, Iusuario } from '../../../Auth/models/authUsers.model';

export const guardarVoto = async (req: Request, res: Response) => {
   // console.log(`this.req.body`, req.body.resPlanilla.idResPlanilla);
   const voto: IvotoProv = await votoProv.findOne({ dni: req.body.dni });

   if (voto) {
      if (
         voto.resPlanilla.some(
            (data) =>
               data.idResPlanilla === req.body.resPlanilla.idResPlanilla &&
               data.idResPlanilla === req.body.resPlanilla.idResPlanilla &&
               data.idCoordinador === req.body.resPlanilla.idCoordinador
         )
      ) {
         return res.status(200).json({
            ok: false,
            msg: 'El Voto ya se encuentra cargado',
         });
      }
      console.log('no esta el ID');
      voto.resPlanilla.push(req.body.resPlanilla);
      await voto.save();
      return res.status(200).json({
         ok: true,
         msg: 'El dni ya se econtraba cargado, se agrego un responsable de planilla',
      });
   } else {
      console.log('no existe el voto');
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
export const getRecalculando = async (req: Request, res: Response) => {
   let votos = await votoProv.find().lean();
   console.log(`Ya traje el los Votos`);
   let afiliados = await afiliado.find().lean();
   console.log(`Ya traje el los Afiliados`);
   let votosG: any;
   console.log(`Empiezo Rutina`);
   let paso = 0;
   for (let data of votos) {
      paso++;
      console.log(`Data :`, paso);
      let dniAf = afiliados.find(res => res.dni === data.dni);

      if (dniAf !== undefined) {
         for (let usuario of data.resPlanilla) {
            if (usuario.idCoordinador) {
               let idCor = await votosGraf.findOne({ idUsuario: usuario.idCoordinador })
               if (idCor !== null) {
                  idCor.afiliado++;
                  idCor.votos++;
                  await idCor.save();
               } else {
                  votosG = {
                     idUsuario: usuario.idCoordinador,
                     role: "user-coord",
                     coordinador: "",
                     referente: "",
                     afiliado: 1,
                     votos: 1,
                  }
                  let guardar = new votosGraf(votosG);
                  await guardar.save();
               }
            };
            if (usuario.idReferente) {
               let idRef = await votosGraf.findOne({ idUsuario: usuario.idReferente })
               if (idRef !== null) {
                  idRef.afiliado++;
                  idRef.votos++;
                  await idRef.save();
               } else {
                  votosG = {
                     idUsuario: usuario.idReferente,
                     role: "user-ref",
                     coordinador: usuario.idCoordinador,
                     referente: "",
                     afiliado: 1,
                     votos: 1,
                  }
                  let guardar = new votosGraf(votosG);
                  await guardar.save();
               }
            };
            if (usuario.idResPlanilla) {
               let idRes = await votosGraf.findOne({ idUsuario: usuario.idResPlanilla })
               if (idRes !== null) {
                  idRes.afiliado++;
                  idRes.votos++;
                  await idRes.save();
               } else {
                  votosG = {
                     idUsuario: usuario.idResPlanilla,
                     role: "user-resp",
                     coordinador: usuario.idCoordinador,
                     referente: usuario.idReferente,
                     afiliado: 1,
                     votos: 1,
                  }
                  let guardar = new votosGraf(votosG);
                  await guardar.save();
               }
            }
         }
      } else {
         for (let usuario of data.resPlanilla) {
            if (usuario.idCoordinador) {
               let idCor = await votosGraf.findOne({ idUsuario: usuario.idCoordinador })
               if (idCor !== null) {
                  idCor.votos++;
                  await idCor.save();
               } else {
                  votosG = {
                     idUsuario: usuario.idCoordinador,
                     role: "user-coord",
                     coordinador: "",
                     referente: "",
                     afiliado: 0,
                     votos: 1,
                  }
                  let guardar = new votosGraf(votosG);
                  await guardar.save();
               }
            };
            if (usuario.idReferente) {
               let idRef = await votosGraf.findOne({ idUsuario: usuario.idReferente })
               if (idRef !== null) {
                  idRef.votos++;
                  await idRef.save();
               } else {
                  votosG = {
                     idUsuario: usuario.idReferente,
                     role: "user-ref",
                     coordinador: usuario.idCoordinador,
                     referente: "",
                     afiliado: 0,
                     votos: 1,
                  }
                  let guardar = new votosGraf(votosG);
                  await guardar.save();
               }
            };
            if (usuario.idResPlanilla) {
               let idRes = await votosGraf.findOne({ idUsuario: usuario.idResPlanilla })
               if (idRes !== null) {

                  idRes.votos++;
                  await idRes.save();
               } else {
                  votosG = {
                     idUsuario: usuario.idResPlanilla,
                     role: "user-resp",
                     coordinador: usuario.idCoordinador,
                     referente: usuario.idReferente,
                     afiliado: 0,
                     votos: 1,
                  }
                  let guardar = new votosGraf(votosG);
                  await guardar.save();
               }
            }

         }
      }
   };

   return res.status(200).json({
      ok: true,
   })
};
////////////Consutlas de graficas//////////////////////////
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
   }
   let data: any = [];
   for (let calc of totales) {
      let usuario = await usuarios.findOne({ '_id': calc.idUsuario }, { 'datosPersonales.areaResponsable': 1, 'datosPersonales.apellido': 1, 'datosPersonales.nombres': 1 });
      if (usuario !== null) {
         let totalnoafiliados = calc.votos - calc.afiliado;
         data.push({
            organizacion: usuario.datosPersonales.areaResponsable,
            nombrecompleto: usuario.datosPersonales.apellido + " " + usuario.datosPersonales.nombres,
            coordinador: calc.coordinador,
            role: calc.role,
            totalafiliados: calc.afiliado,
            totalnoafiliados: totalnoafiliados,
            totalvotos: calc.votos
         }
         );

      } else {
         console.log(`Usuario no Existe: `, calc.idUsuario)
      }
   }
   console.log(`Ya esta!!!`)
   res.status(200).json({
      ok: true,
      data,
   })
}

export const getvotosGrafica = async (req: Request, res: Response) => {
   await votoProv.find((err, data: any) => {
      if (err) {
         res.status(300).json({
            ok: false,
            err,
         });
      } else {
         let votosTotal = data.length;
         let afiliados = data.filter((datos: any) => datos.afiliado === "Es afiliado al MPN").length;
         let femenino = data.filter((datos: any) => datos.genero === "M").length;
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
////////actualizar

export const actualizarVoto = async (req: Request, res: Response) => {
   let votos: any = await votoProv.find({ 'resPlanilla.idReferente': req.body.idRef });
   // console.log(votos);
   for (let data of votos) {
      // console.log(data);
      let busqueda = data.resPlanilla.findIndex((idRef) => idRef.idReferente === req.body.idRef);
      if (data.resPlanilla[busqueda].idCoordinador != undefined) {
         data.resPlanilla[busqueda].idCoordinador = req.body.coord;
         await data.save();
      } else {
         //  console.log(data.resPlanilla[busqueda].idCoordinador);
      }
   }
   return res.status(200).json({
      ok: true,
   });
};
