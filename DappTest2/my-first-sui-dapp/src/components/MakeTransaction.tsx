import {
  ConnectButton,
  useCurrentAccount,
  useSignTransactionBlock,
} from "@mysten/dapp-kit";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { MIST_PER_SUI } from "@mysten/sui.js/utils";
import { useState } from "react";

function MakeTransaction() {
  const { mutate: signTransactionBlock } = useSignTransactionBlock();
  const [signature, setSignature] = useState("");
  const currentAccount = useCurrentAccount();

  const txb = new TransactionBlock();
  const [coin] = txb.splitCoins(txb.gas, [MIST_PER_SUI * 1n]);
  txb.transferObjects(
    [coin],
    "0xb5b76de7d9a9132a1c11209fc9fd2075f662ff91ee3dce450d8fb05c81ae2867",
  );
  txb.setSender(currentAccount?.address || "");

  return (
    <div style={{ padding: 20 }}>
      <ConnectButton />
      {currentAccount && (
        <>
          <div>
            <button
              onClick={() => {
                signTransactionBlock(
                  {
                    transactionBlock: txb,
                    chain: "sui:devnet",
                  },
                  {
                    onSuccess: (result) => {
                      console.log("signed transaction block", result);
                      setSignature(result.signature);
                    },
                  },
                );
              }}
            >
              Sign empty transaction block
            </button>
          </div>
          <div>Signature: {signature}</div>
        </>
      )}
    </div>
  );
}

export default MakeTransaction;
