import { Request, Response } from 'express';

export const postDatos = async (req: Request, res: Response) => {
     res.status(200).json({
          ok: true,
     });
};
