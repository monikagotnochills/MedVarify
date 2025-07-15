// services/blockchain.service.ts
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

import * as dotenv from "dotenv";
dotenv.config();

export interface NFTFilter {
  batchId?: string;
  medicineName?: string;
  status?: "valid" | "expired";
}

// ✅ Dummy filter function for now
export const getAllNFTs = async (filters: NFTFilter) => {
  return [
    {
      token_id: "batch123",
      medicineName: "Crocin",
      status: "valid",
    },
    {
      token_id: "batch456",
      medicineName: "Paracetamol",
      status: "expired",
    },
  ].filter((nft) => {
    if (filters.batchId && nft.token_id !== filters.batchId) return false;
    if (filters.medicineName && nft.medicineName !== filters.medicineName)
      return false;
    if (filters.status && nft.status !== filters.status) return false;
    return true;
  });
};

// ✅ Proper mintNFT function
export const mintNFT = async (
  tokenId: string,
  owner: string,
  tokenUri: string
) => {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
    process.env.ADMIN_WALLET_MNEMONIC!.replace(/"/g, ""),
    { prefix: "archway" }
  );

  const gasPrice = GasPrice.fromString("0.05aarch");

  const client = await SigningCosmWasmClient.connectWithSigner(
    process.env.ARCHWAY_RPC_URL!,
    wallet,
    { gasPrice }
  );

  const [account] = await wallet.getAccounts();

  const result = await client.execute(
    account.address,
    process.env.CONTRACT_ADDRESS!,
    {
      mint: {
        token_id: tokenId,
        owner: owner,
        token_uri: tokenUri,
      },
    },
    "auto"
  );

  return result;
};
