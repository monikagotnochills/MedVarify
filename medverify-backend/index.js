require("dotenv").config();
const express = require("express");
const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const { SigningCosmWasmClient, GasPrice } = require("@cosmjs/cosmwasm-stargate");

const app = express();
app.use(express.json());

const {
  ARCHWAY_RPC_URL,
  CHAIN_ID,
  CONTRACT_ADDRESS,
  ADMIN_WALLET_MNEMONIC,
  PORT
} = process.env;

// 🔗 Connect to Archway chain (CosmWasm)
async function connectToChain() {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
    ADMIN_WALLET_MNEMONIC.replace(/"/g, ""),
    { prefix: "archway" }
  );

  const gasPrice = GasPrice.fromString("0.05aarch"); // ✅ Set Archway gas price

  const client = await SigningCosmWasmClient.connectWithSigner(
    ARCHWAY_RPC_URL,
    wallet,
    { gasPrice }
  );

  const [account] = await wallet.getAccounts();
  return { client, wallet, sender: account.address };
}

// 🚀 Mint NFT endpoint
app.post("/mint", async (req, res) => {
  try {
    const { token_id, owner, token_uri } = req.body;
    const { client, sender } = await connectToChain();

    const result = await client.execute(
      sender,
      CONTRACT_ADDRESS,
      {
        mint: {
          token_id,
          owner,
          token_uri,
        },
      },
      "auto", // Let client estimate gas
      "" // Optional memo
    );

    res.json({ success: true, result });
  } catch (error) {
    console.error("Mint error:", error);
    res.status(500).json({ success: false, error: error.toString() });
  }
});

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🧠 MedVerify Backend Working!");
});

// 🚀 Start server
app.listen(PORT || 5000, () => {
  console.log(`✅ Backend listening on port ${PORT}`);
});
