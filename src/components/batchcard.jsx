// src/components/BatchCard.jsx
import { useState, useEffect } from "react";
import { queryNFTInfo } from "../utils/chain";

export function BatchCard({ tokenId }) {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    (async () => {
      // 1. Query on-chain NFT info
      const res = await queryNFTInfo(tokenId);
      const { token_uri, extension } = res.info;
      const owner = res.access.owner;

      // 2. Fetch JSON metadata from IPFS
      const url = token_uri.replace(
        "ipfs://",
        "https://gateway.pinata.cloud/ipfs/"
      );
      const data = await fetch(url).then(r => r.json());

      // 3. Merge and store
      setMeta({ owner, ...data, extension });
    })();
  }, [tokenId]);

  if (!meta) return <p>Loading NFT…</p>;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">
      <h2 className="font-bold text-xl">{meta.name}</h2>
      <img
        src={meta.image.replace(
          "ipfs://",
          "https://gateway.pinata.cloud/ipfs/"
        )}
        alt={meta.name}
        className="w-full h-48 object-cover mt-2"
      />
      <p className="mt-2 text-gray-700">{meta.description}</p>
      <ul className="mt-4 list-disc list-inside">
        {meta.attributes?.map(a => (
          <li key={a.trait_type}>
            <strong>{a.trait_type}:</strong> {a.value}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-gray-500">
        <strong>Owner:</strong> {meta.owner}
      </p>
    </div>
  );
}
