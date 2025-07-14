import { 
  uploadMetadataToIPFS, 
  uploadImageToIPFS 
} from './ipfs.service';
import { mintNFT } from './blockchain.service';
import { TOKEN_METADATA_SCHEMA } from '../config/constants';
import * as fs from 'fs';
import * as path from 'path';

interface MulterFile {
  path: string;
  originalname: string;
  mimetype: string;
}

export const mintMedicineNFT = async (
  medicineName: string,
  batchId: string,
  description: string,
  expiryDate: string,
  imageFile: MulterFile
) => {
  try {
    console.log('Starting NFT minting process...');
    console.log('Image file path:', imageFile.path);
    
    // Upload image to IPFS
    console.log('Uploading image to IPFS...');
    const imageUri = await uploadImageToIPFS(imageFile.path);
    console.log('Image uploaded to IPFS:', imageUri);
    
    // Create metadata
    const metadata = {
      ...TOKEN_METADATA_SCHEMA,
      name: medicineName,
      description,
      batch_id: batchId,
      expiry_date: expiryDate,
      image: imageUri,
      minted_at: new Date().toISOString(),
    };
    
    // Upload metadata to IPFS
    console.log('Uploading metadata to IPFS...');
    const tokenUri = await uploadMetadataToIPFS(metadata);
    console.log('Metadata uploaded to IPFS:', tokenUri);
    
    // Mint NFT (recipient should be manufacturer's wallet)
    const recipient = ''; // Should be passed from frontend
    console.log(`Minting NFT for recipient: ${recipient}`);
    const txHash = await mintNFT(recipient, batchId, tokenUri);
    console.log('NFT minted successfully. Transaction hash:', txHash);
    
    return {
      token_id: batchId,
      token_uri: tokenUri,
      minted_tx_hash: txHash,
    };
  } catch (error) {
    console.error('Minting Error:', error);
    throw new Error(`Minting failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  } finally {
    // Clean up uploaded file
    if (imageFile.path && fs.existsSync(imageFile.path)) {
      try {
        console.log('Cleaning up temporary file:', imageFile.path);
        fs.unlinkSync(imageFile.path);
      } catch (cleanupError) {
        console.error('Error cleaning up file:', cleanupError);
      }
    }
  }
};