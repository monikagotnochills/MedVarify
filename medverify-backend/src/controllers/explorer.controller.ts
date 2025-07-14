import { Request, Response } from 'express';
import { getAllNFTs } from '../services/blockchain.service';

export const getBatchExplorerController = async (req: Request, res: Response) => {
    try {
        const { batchId, medicineName, status } = req.query;

        const filters = {
            batchId: batchId as string | undefined,
            medicineName: medicineName as string | undefined,
            status: status as 'valid' | 'expired' | undefined,
        };

        const result = await getAllNFTs(filters);
        res.json(result);
    } catch (error) {
        res.status(500).json({ 
            error: error instanceof Error ? error.message : 'Unknown error occurred' 
        });
    }
};