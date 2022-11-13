import { Request, Response } from 'express';
import { actasEscrutinio } from '../../../models/elecciones/votos-12/jsonApp';

export const getAllActas = async (req: Request, res: Response) => {
     try {
          await actasEscrutinio
               .find({})
               .sort({ establecimiento: 1 })
               .exec(function (err, data) {
                    res.status(200).json({ ok: true, data });
               });
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};

export const postActa = async (req: Request, res: Response) => {
     //  console.log(req.body);

     let update: any = req.body;
     try {
          actasEscrutinio.findOne({ establecimiento: req.body.establecimiento }, async (err, data) => {
               let idnxMesa = data.mesas.findIndex((data) => data.mesa === update.mesa);

               if (data.mesas[idnxMesa].actaCargada === false) {
                    data.mesas[idnxMesa].actaCargada = true;
                    data.mesas[idnxMesa].resultadoMesa = { ...update };
                    data.resultadosGral.votosNulos += update.votosNulos;
                    data.resultadosGral.votosRecurridos += update.votosRecurridos;
                    data.resultadosGral.votosBlanco += update.votosBlanco;
                    data.resultadosGral.votosImpugnados += update.votosImpugnados;
                    data.resultadosGral.totalVotos += update.totalVotos;
                    data.resultadosGral.electoresVotaron += update.electoresVotaron;
                    data.resultadosGral.sobresUrnas += update.sobresUrnas;
                    data.resultadosGral.diferencia += update.diferencia;

                    for (let list of update.listas) {
                         let indxLista = data.resultadosGral.listas.findIndex(
                              (element) => element.lista === list.lista
                         );
                         if (indxLista === -1) {
                              data.resultadosGral.listas.push(list);
                         } else {
                              console.log(list);
                              data.resultadosGral.listas[indxLista].resultado += list.resultado;
                         }
                    }
               } else {
                    res.status(200).json({ ok: false, msg: 'el acta ya se encuentra cargada' });
               }
               await data.save();
               res.status(200).json({ ok: true, data });
          });
     } catch (error) {
          res.status(200).json({ ok: false, error });
     }
};
