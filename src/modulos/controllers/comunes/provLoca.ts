import { Request, Response } from 'express';
import { provLoc } from '../../models/comunes/provLoc';

export const getProLoc = async (req: Request, res: Response) => {
  console.log(`entra`);
  await provLoc.find((err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json({
      ok: true,
      data,
    });
  });
};
