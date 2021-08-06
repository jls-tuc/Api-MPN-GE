import { Request, Response } from 'express';
import { usuarios, Iusuario } from '../Auth/models/authUsers.model';

exports.verificaRol = async (req: Request, res: Response, next) => {
   const id = req.body._id;
   console.log(id);
   try {
      const usuario = await usuarios.findById(id);

      if (!usuario) {
         return res.status(400).json({
            ok: false,
            msg: 'No existe el usuario',
         });
      } else if (usuario.role !== 'system') {
         return res.status(400).json({
            ok: false,
            msg: 'No tiene permisos',
         });
      }
      next();
   } catch (error) {
      console.log('VerificaRol', error),
         res.status(500).json({
            ok: false,
            msg: 'MMMMM algo paso!!!',
         });
   }
};
