// src/components/WalletConnect.jsx
import { useState } from "react";
import { connectWallet } from "../utils/chain";

export function WalletConnect({ onConnected }) {
  const [addr, setAddr] = useState("");

  const handleConnect = async () => {
    const { wallet, address } = await connectWallet();
    setAddr(address);
    onConnected(wallet, address);
  };

  return addr ? (
    <p>🟢 Connected: {addr}</p>
  ) : (
    <button onClick={handleConnect} className="btn">
      Connect Keplr Wallet
    </button>
  );
}
