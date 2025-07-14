import pinataSDK from '@pinata/sdk';
import * as fs from 'fs';
import path from "path"
import { PINATA_API_KEY, PINATA_SECRET_API_KEY } from '../config/env';

// ✅ Just call the constructor directly — no need for type assertion!
const pinata = new pinataSDK(PINATA_API_KEY, PINATA_SECRET_API_KEY);

export const uploadMetadataToIPFS = async (metadata: object): Promise<string> => {
  try {
    const result = await pinata.pinJSONToIPFS(metadata);
    return `ipfs://${result.IpfsHash}`;
  } catch (error) {
    console.error('IPFS Metadata Upload Error:', error);
    throw new Error(`Failed to upload metadata to IPFS: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const uploadImageToIPFS = async (filePath: string): Promise<string> => {
  try {

    const absolutePath = path.resolve(filePath);
    console.log("Uploading image from path: ", absolutePath);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`File not found at path ${absolutePath}`);
    }


    const readableStream = fs.createReadStream(filePath);
    readableStream.on("error", console.error)
    const result = await pinata.pinFileToIPFS(readableStream);
    return `ipfs://${result.IpfsHash}`;
  } catch (error) {
    console.error('IPFS Image Upload Error:', error);
    throw new Error(`Failed to upload image to IPFS: ${error instanceof Error ? error.message : String(error)}`);
  }
};
