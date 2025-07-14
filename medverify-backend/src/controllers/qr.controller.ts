import { Request, Response } from 'express';
import QRCode from 'qrcode';
import { FRONTEND_URL } from '../config/env'; // Fixed import path

export const generateQRCodeController = async (req: Request, res: Response) => {
  try {
    const { tokenId } = req.params;
    const verifyUrl = `${FRONTEND_URL}/verify?token_id=${tokenId}`;
    
    const qrDataUrl = await QRCode.toDataURL(verifyUrl);
    res.json({ qrDataUrl });
  } catch (error: any) { // Fix error type
    res.status(500).json({ error: error.message });
  }
};