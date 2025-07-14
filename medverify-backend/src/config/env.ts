import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const PORT = process.env.PORT || 3000;
export const ARCHWAY_RPC_URL = process.env.ARCHWAY_RPC_URL || 'https://rpc.constantine.archway.io';
export const CHAIN_ID = process.env.CHAIN_ID || 'constantine-3';
export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '';
export const ADMIN_WALLET_MNEMONIC = process.env.ADMIN_WALLET_MNEMONIC || '';
export const PINATA_API_KEY = process.env.PINATA_API_KEY || '';
export const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY || '';
export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
export const ADMIN_ADDRESSES = process.env.ADMIN_ADDRESSES?.split(',') || [];