import express from 'express';
import adminRoutes from './admin.routes';
import verifyRoutes from './verify.routes';
import explorerRoutes from './explorer.routes';
import qrRoutes from './qr.routes';

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/verify', verifyRoutes);
router.use('/explorer', explorerRoutes);
router.use('/qr', qrRoutes);

export default router;