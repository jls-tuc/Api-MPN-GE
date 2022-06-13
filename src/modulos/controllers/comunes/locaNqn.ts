import { Request, Response } from 'express';
import { locaNqn } from '../../models/comunes/locNqn';

export const getLocaNqn = async (req: Request, res: Response) => {
     try {
          let data = await locaNqn.find();
          res.status(200).json({ ok: true, data });
     } catch (error) {
          res.status(200).json(error);
     }
};
