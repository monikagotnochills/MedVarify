import express from 'express';
import { generateQRCodeController } from '../controllers/qr.controller';

const router = express.Router();

router.get('/:tokenId', generateQRCodeController);

export default router;