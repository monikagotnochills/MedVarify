// services/blockchain.service.ts
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';

export interface NFTFilter {
  batchId?: string;
  medicineName?: string;
  status?: 'valid' | 'expired';
}

export const getAllNFTs = async (filters: NFTFilter) => {
  // dummy logic or fetch from chain
  return [
    {
      token_id: 'batch123',
      medicineName: 'Crocin',
      status: 'valid',
    },
    {
      token_id: 'batch456',
      medicineName: 'Paracetamol',
      status: 'expired',
    },
  ].filter((nft) => {
    if (filters.batchId && nft.token_id !== filters.batchId) return false;
    if (filters.medicineName && nft.medicineName !== filters.medicineName) return false;
    if (filters.status && nft.status !== filters.status) return false;
    return true;
  });
};
