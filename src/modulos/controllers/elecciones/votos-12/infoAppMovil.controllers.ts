import { Request, Response } from 'express';
import { escuelas } from '../../../models/comunes/establecimientos';
import { infoAppMovil } from '../../../models/elecciones/votos-12/infoAppMovil';

export const getMesa = async (req: Request, res: Response) => {
     //console.log(req.body);
     let usuario = req.body.usuario;

     let esc = await escuelas.findOne({ usuario: usuario }, { establecimiento: 1 });

     if (esc !== null) {
          await infoAppMovil.findOne({ establecimiento: esc.establecimiento }, async (err, data: any) => {
               if (err) {
                    console.log('GetAppMesa', err);
               } else {
                    let mesaIndx = await data.mesa.findIndex((element) => element.mesa === req.body.mesa);

                    if (mesaIndx === -1) {
                         res.status(200).json({
                              ok: true,
                              msg: 'no se registran ordenes cargadas',
                         });
                    } else {
                         let mesa = data.mesa[mesaIndx];

                         res.status(200).json({
                              ok: true,
                              mesa,
                         });
                    }
               }
          });
     }
};
