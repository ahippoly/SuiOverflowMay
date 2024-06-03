import {
  ConnectButton,
  useCurrentAccount,
  useSignTransactionBlock,
} from "@mysten/dapp-kit";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { MIST_PER_SUI } from "@mysten/sui.js/utils";
import { useState } from "react";

function MakeTransaction() {
  const { mutate: signTransactionBlock } = useSignTransactionBlock();
  const [signature, setSignature] = useState("");
  const [transactionBytes, setTransactionBytes] = useState("");
  const [digest, setDigest] = useState("");

  const currentAccount = useCurrentAccount();

  const txb = new TransactionBlock();
  const [coin] = txb.splitCoins(txb.gas, [MIST_PER_SUI * 1n]);
  txb.transferObjects(
    [coin],
    "0xb5b76de7d9a9132a1c11209fc9fd2075f662ff91ee3dce450d8fb05c81ae2867",
  );
  txb.setSender(currentAccount?.address || "");

  const executeTransaction = () => {
    const client = new SuiClient({
      url: getFullnodeUrl("devnet"),
    });

    client
      .executeTransactionBlock({
        signature,
        transactionBlock: transactionBytes,
      })
      .then((result) => {
        setDigest(result.digest);
        console.log("executed transaction", result);
      });
  };

  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        gap: "40px",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <ConnectButton />
      {currentAccount && (
        <>
          <div>
            <span>Send Token</span>
            <div style={{ display: "flex", gap: 10 }}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <p>To </p>
                <p>Amount </p>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <input type="text" />
                <input type="text" />
              </div>
            </div>
          </div>
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
                      setTransactionBytes(result.transactionBlockBytes);
                      setSignature(result.signature);
                    },
                  },
                );
              }}
            >
              Sign transaction
            </button>
          </div>
          <p style={{ wordBreak: "break-word" }}>Signature: {signature}</p>
          <button
            onClick={() => {
              executeTransaction();
            }}
          >
            Execute transaction
          </button>
          {digest && <p>Digest: {digest}</p>}
        </>
      )}
    </div>
  );
}

export default MakeTransaction;
