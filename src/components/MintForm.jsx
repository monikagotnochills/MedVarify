import React, { useState } from "react";
import axios from "axios";

const MintForm = () => {
  const [tokenId, setTokenId] = useState("");
  const [owner, setOwner] = useState("");
  const [tokenUri, setTokenUri] = useState("");
  const [response, setResponse] = useState(null);

  const handleMint = async () => {
    try {
      const res = await axios.post("http://localhost:5000/mint", {
        token_id: tokenId,
        owner,
        token_uri: tokenUri,
      });
      setResponse(res.data);
    } catch (error) {
      setResponse({ success: false, error: error.toString() });
    }
  };

  return (
    <div className="p-4 rounded-xl shadow bg-white w-full max-w-lg mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">🧬 Mint a Medicine Batch NFT</h2>
      <input
        type="text"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
        className="w-full border mb-2 p-2"
      />
      <input
        type="text"
        placeholder="Owner Address"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        className="w-full border mb-2 p-2"
      />
      <input
        type="text"
        placeholder="Token URI (ipfs://...)"
        value={tokenUri}
        onChange={(e) => setTokenUri(e.target.value)}
        className="w-full border mb-4 p-2"
      />
      <button onClick={handleMint} className="bg-green-600 text-white px-4 py-2 rounded-lg">
        Mint NFT
      </button>

      {response && (
        <div className="mt-4">
          {response.success ? (
            <p className="text-green-600">✅ Minted! Tx Hash: {response.result.transactionHash}</p>
          ) : (
            <p className="text-red-600">❌ Error: {response.error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MintForm;
