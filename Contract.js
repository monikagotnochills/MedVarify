// contract.js

// Contract configuration
const CONTRACT_ADDRESS = "archway1s6qek7pq47nqj8j4pyudhtl2m8rf0sxxutlqzl"; // Replace with your actual contract address
const NETWORK = "constantine-3";
const RPC_ENDPOINT = "https://rpc.constantine.archway.tech";
const GAS_PRICE = "0.05aconst";

// DOM Elements
const verifyBtn = document.getElementById('verifyBtn');
const verifyInput = document.getElementById('verifyInput');
const verificationResult = document.getElementById('verificationResult');
const mintBtn = document.getElementById('mintBtn');
const adminWalletConnect = document.getElementById('adminWalletConnect');

// Keplr Wallet Connection
async function connectWallet() {
    if (!window.keplr) {
        showToast('Please install Keplr wallet extension!', 'error');
        return null;
    }

    try {
        await window.keplr.enable(NETWORK);
        const offlineSigner = window.keplr.getOfflineSigner(NETWORK);
        const accounts = await offlineSigner.getAccounts();
        
        return {
            address: accounts[0].address,
            offlineSigner
        };
    } catch (error) {
        console.error('Wallet connection failed:', error);
        showToast('Wallet connection failed', 'error');
        return null;
    }
}

// Initialize Archway Client
async function initArchwayClient() {
    const { SigningArchwayClient } = await import('@archwayhq/archway.js');
    return await SigningArchwayClient.connectWithSigner(
        RPC_ENDPOINT,
        window.wallet.offlineSigner,
        { gasPrice: GAS_PRICE }
    );
}

// Verify Medicine
async function verifyMedicine() {
    const tokenId = verifyInput.value.trim();
    if (!tokenId) {
        showToast('Please enter a Token ID or Batch Number', 'error');
        return;
    }

    try {
        const client = await initArchwayClient();
        const result = await client.queryContractSmart(CONTRACT_ADDRESS, {
            nft_info: { token_id: tokenId }
        });

        // Update UI with verification results
        updateVerificationUI(result);
        verificationResult.classList.remove('hidden');
        showToast('Medicine verified successfully!', 'success');
    } catch (error) {
        console.error('Verification failed:', error);
        showToast('Verification failed: Medicine not found', 'error');
    }
}

// Mint New Medicine NFT
async function mintMedicine() {
    if (!window.wallet) {
        showToast('Please connect wallet first', 'error');
        return;
    }

    // Get form values
    const medicineName = document.querySelector('[name="medicineName"]').value;
    const batchId = document.querySelector('[name="batchId"]').value;
    const manufactureDate = document.querySelector('[name="manufactureDate"]').value;
    const expiryDate = document.querySelector('[name="expiryDate"]').value;
    const description = document.querySelector('[name="description"]').value;

    try {
        const client = await initArchwayClient();
        
        // Create metadata
        const metadata = {
            name: medicineName,
            description,
            properties: {
                batch_id: batchId,
                manufacture_date: manufactureDate,
                expiry_date: expiryDate
            }
        };

        // Upload metadata to IPFS (pseudo-code)
        const tokenUri = await uploadToIPFS(metadata);

        // Execute mint transaction
        const mintMsg = {
            mint: {
                token_id: batchId,
                owner: window.wallet.address,
                token_uri: tokenUri,
                extension: {
                    batch_id: batchId,
                    manufacture_date: manufactureDate,
                    expiry_date: expiryDate
                }
            }
        };

        const result = await client.execute(
            window.wallet.address,
            CONTRACT_ADDRESS,
            mintMsg,
            "auto"
        );

        showToast('Medicine NFT minted successfully!', 'success');
        console.log('Mint result:', result);
    } catch (error) {
        console.error('Minting failed:', error);
        showToast('Minting failed: ' + error.message, 'error');
    }
}

// Update Verification UI
function updateVerificationUI(data) {
    document.querySelector('#verificationResult .medicine-name').textContent = data.extension.name;
    document.querySelector('#verificationResult .batch-id').textContent = data.extension.batch_id;
    document.querySelector('#verificationResult .manufacturer').textContent = data.extension.manufacturer;
    document.querySelector('#verificationResult .manufacture-date').textContent = data.extension.manufacture_date;
    document.querySelector('#verificationResult .expiry-date').textContent = data.extension.expiry_date;
    document.querySelector('#verificationResult .owner-address').textContent = data.owner;
    
    // Update status based on expiry date
    const expiryDate = new Date(data.extension.expiry_date);
    const today = new Date();
    const statusElement = document.querySelector('#verificationResult .status');
    
    if (expiryDate < today) {
        statusElement.textContent = 'Expired';
        statusElement.className = 'px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded';
    } else if ((expiryDate - today) / (1000 * 60 * 60 * 24) < 30) {
        statusElement.textContent = 'Expiring Soon';
        statusElement.className = 'px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded';
    } else {
        statusElement.textContent = 'Valid';
        statusElement.className = 'px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Wallet Connection
    document.getElementById('walletConnect').addEventListener('click', async () => {
        window.wallet = await connectWallet();
        if (window.wallet) {
            const walletBtn = document.getElementById('walletConnect');
            walletBtn.innerHTML = `<i class="fas fa-wallet"></i> <span>${truncateAddress(window.wallet.address)}</span>`;
            walletBtn.classList.add('connected');
        }
    });

    // Admin Wallet Connection
    adminWalletConnect.addEventListener('click', async () => {
        window.wallet = await connectWallet();
        if (window.wallet) {
            document.getElementById('walletConnectSection').classList.add('hidden');
            document.getElementById('adminPanelContent').classList.remove('hidden');
            showToast('Admin wallet connected!', 'success');
        }
    });

    // Verify Button
    verifyBtn.addEventListener('click', verifyMedicine);

    // Mint Button
    mintBtn.addEventListener('click', mintMedicine);
});

// Helper Functions
function truncateAddress(address, start = 6, end = 4) {
    return `${address.substring(0, start)}...${address.substring(address.length - end)}`;
}

// IPFS Upload (Mock implementation)
async function uploadToIPFS(data) {
    // In a real implementation, you would use something like:
    // const client = makeStorageClient()
    // const cid = await client.put([new File([JSON.stringify(data)], 'metadata.json')])
    // return `ipfs://${cid}/metadata.json`;
    
    return "ipfs://QmX9z4f8s2j5k7h6g5f4d3s2a1q9w8e7r6t5y4u3i2o1p/metadata.json";
}