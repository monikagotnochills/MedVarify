import { uploadImageToIPFS, uploadMetadataToIPFS } from './uploadToIPFS';


const main = async () => {
  const imagePath = './uploads/medicine.jpg'; // 👈 make sure this image exists

  const imageCID = await uploadImageToIPFS(imagePath);
  console.log('✅ Uploaded Image to IPFS:', imageCID);

  const metadata = {
    name: 'Paracetamol A123',
    description: 'This is a test NFT for MedVerify batch A123.',
    image: imageCID,
    batch_no: 'A123',
    manufacturer: 'MediLife',
    expiry_date: '2026-01-01'
  };

  const metadataCID = await uploadMetadataToIPFS(metadata);
  console.log('✅ Uploaded Metadata to IPFS:', metadataCID);
};

main();
