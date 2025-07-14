import { Request, Response } from 'express';
import { verifyMedicine } from '../services/nft.service';

export const verifyMedicineController = async (req: Request, res: Response) => {
  try {
    const { tokenId } = req.params;
    const result = await verifyMedicine(tokenId);
    res.json(result);
  } catch (error: any) { // Fix error type
    res.status(500).json({ error: error.message });
  }
};