# React + Vite
# 🧬 MedVerify - Decentralized Medicine Authentication

**MedVerify** is a decentralized Web3 platform that leverages blockchain technology and NFTs to verify the authenticity and traceability of pharmaceutical medicines. Using CW721 NFTs on the Archway blockchain and metadata hosted on IPFS, each medicine batch is uniquely registered and trackable across the supply chain.
https://med-varify.vercel.app/
<img width="1077" height="557" alt="image" src="https://github.com/user-attachments/assets/30b06909-1c7a-4ea2-9986-c828b50dc1ba" />


---

## 🚀 Features

- 🔐 **NFT Batch Tracking:** Each medicine batch is minted as a CW721 NFT.
- 📦 **Supply Chain Traceability:** Transparent records from manufacturer to end-user.
- 🧾 **QR Code Verification:** Scan QR on packaging to instantly verify product authenticity.
- 🧠 **Smart Contracts on Archway:** Immutable, secure and decentralized logic.
- 🌐 **Frontend in Next.js + TailwindCSS:** Smooth and responsive user interface.
- 🧪 **Admin Panel:** Role-based access for Manufacturers, Distributors, Pharmacies, and Regulators.
- 📁 **IPFS Integration:** Tamper-proof metadata storage.

---

## 🛠️ Tech Stack

| Layer         | Technology                         |
|---------------|-------------------------------------|
| Blockchain    | Archway + CosmWasm (CW721 ADO)     |
| Frontend      | Next.js + TailwindCSS + Vercel     |
| Wallet        | Archway Wallet (Leap, Keplr)        |
| Metadata Host | IPFS (via Pinata or web3.storage)  |
| QR Handling   | `qrcode.react` / `react-qr-reader` |
| Smart Contract| Rust CW721 (Andromeda ADO-based)   |

---

## 📦 Project Structure

```bash
medverify/
│
├── contracts/                # CosmWasm CW721 smart contract (NFT ADO)
├── metadata/                 # Example NFT metadata files (JSON for IPFS)
├── medverify-frontend/      # React + Next.js frontend app
│   ├── pages/
│   ├── components/
│   ├── hooks/
│   ├── styles/
│   └── utils/
├── public/                  # Static files (QR codes, logos)
├── README.md

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
