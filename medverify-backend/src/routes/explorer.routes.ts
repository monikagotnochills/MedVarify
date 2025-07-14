import express from 'express';
import { getBatchExplorerController } from '../controllers/explorer.controller';

const router = express.Router();

router.get('/', getBatchExplorerController);

export default router;