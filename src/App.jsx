import React from "react";
import { BatchCard } from "./components/BatchCard";
import MintForm from "./components/MintForm"; // ✅ Add this line

function App() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">🧬 MedVerify NFT Viewer</h1>

      {/* ✅ Mint Form Section */}
      <div className="mb-10">
        <MintForm />
      </div>

      {/* ✅ Existing Batch Display */}
      <BatchCard tokenId="batch-001" /> {/* Replace this with real tokenId */}
    </div>
  );
}

export default App;
