import pinataSDK from '@pinata/sdk';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY!, 
  process.env.PINATA_SECRET_API_KEY!
);

export const uploadImageToIPFS = async (filePath: string): Promise<string> => {
  try {
    const readableStream = fs.createReadStream(filePath);
    const result = await pinata.pinFileToIPFS(readableStream);
    return `ipfs://${result.IpfsHash}`;
  } catch (error) {
    console.error('Image Upload Error:', error);
    throw new Error('Image upload failed');
  }
};

export const uploadMetadataToIPFS = async (metadata: object): Promise<string> => {
  try {
    const result = await pinata.pinJSONToIPFS(metadata);
    return `ipfs://${result.IpfsHash}`;
  } catch (error) {
    console.error('Metadata Upload Error:', error);
    throw new Error('Metadata upload failed');
  }
};
