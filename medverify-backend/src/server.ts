import app from './app';
import { PORT } from './config/env';

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`=================================`);
  console.log(`Environment Variables:`);
  console.log(`- ARCHWAY_RPC_URL: ${process.env.ARCHWAY_RPC_URL}`);
  console.log(`- CONTRACT_ADDRESS: ${process.env.CONTRACT_ADDRESS}`);
  console.log(`- PINATA_API_KEY: ${process.env.PINATA_API_KEY ? '***' : 'NOT SET'}`);
  console.log(`=================================`);
});