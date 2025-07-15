import { ArchClient, ArchWallet } from "@andromedaprotocol/arch3.js";

const RPC = import.meta.env.VITE_ARCHWAY_RPC;
export const client = new ArchClient(RPC);

/**
 * Connects to Keplr via ArchWallet.
 * @returns {Promise<{ wallet: ArchWallet, address: string }>}
 */
export async function connectWallet() {
  const wallet = new ArchWallet();
  await wallet.connect();
  const address = await wallet.getAddress();
  return { wallet, address };
}

/**
 * Queries NFT info (metadata URI + owner) from CW721.
 */
export async function queryNFTInfo(tokenId) {
  const contract = import.meta.env.VITE_CW721_ADDR;
  return client.queryContractSmart(contract, {
    nft_info: { token_id: tokenId }
  });
}

/**
 * Mint a new NFT (if you need in-app minting).
 */
export async function mintNFT(wallet, payload) {
  const contract = import.meta.env.VITE_CW721_ADDR;
  return wallet.execute(contract, { mint: payload });
}

/**
 * Transfer an existing NFT.
 */
export async function transferNFT(wallet, tokenId, recipient) {
  const contract = import.meta.env.VITE_CW721_ADDR;
  return wallet.execute(contract, {
    transfer_nft: { token_id: tokenId, recipient }
  });
}
