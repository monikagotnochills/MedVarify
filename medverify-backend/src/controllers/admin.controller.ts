import { Request, Response } from 'express';
import { mintMedicineNFT } from '../services/nft.service';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const mintNFTController = async (req: MulterRequest, res: Response) => {
  try {
    const { medicineName, batchId, description, expiryDate } = req.body;
    const imageFile = req.file;
    
    console.log('Received mint request:');
    console.log('Medicine Name:', medicineName);
    console.log('Batch ID:', batchId);
    console.log('Description:', description);
    console.log('Expiry Date:', expiryDate);
    
    if (!imageFile) {
      console.error('No image file provided');
      return res.status(400).json({ error: 'Image file is required' });
    }
    
    console.log('Image file details:', {
      originalname: imageFile.originalname,
      mimetype: imageFile.mimetype,
      size: imageFile.size,
      path: imageFile.path
    });
    
    const result = await mintMedicineNFT(
      medicineName,
      batchId,
      description,
      expiryDate,
      {
        path: imageFile.path,
        originalname: imageFile.originalname,
        mimetype: imageFile.mimetype
      }
    );
    
    res.status(201).json(result);
  } catch (error: any) {
    console.error('Controller Error:', error);
    res.status(500).json({ error: error.message });
  }
};