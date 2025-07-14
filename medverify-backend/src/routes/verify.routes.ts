import express from 'express';
import { verifyMedicineController } from '../controllers/verify.controller';

const router = express.Router();

router.get('/:tokenId', verifyMedicineController);

export default router;