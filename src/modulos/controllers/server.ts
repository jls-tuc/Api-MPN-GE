import { Request, Response } from 'express';

export const getServerSPS = async (req: Request, res: Response) => {
  res.json({ msg: 'Servidor funcionando OK' });
};
