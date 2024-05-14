import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
 

// const FULLNODE_URL = 'https://fullnode.devnet.sui.io'; // replace with the RPC URL you want to use
// const suiClient = new SuiClient({ url: FULLNODE_URL });

// use getFullnodeUrl to define Devnet RPC location
const rpcUrl = getFullnodeUrl('devnet');
 
// create a client connected to devnet
const client = new SuiClient({ url: rpcUrl });


export const getCurrentEpoch = async () => {
  return await client.getLatestSuiSystemState();
}