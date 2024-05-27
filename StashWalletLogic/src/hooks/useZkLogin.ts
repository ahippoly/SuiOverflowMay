'use client';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import {
  decodeSuiPrivateKey,
  SerializedSignature,
} from '@mysten/sui.js/cryptography';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { MultiSigPublicKey } from '@mysten/sui.js/multisig';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { MIST_PER_SUI } from '@mysten/sui.js/utils';
import { ZkLoginPublicIdentifier } from '@mysten/sui.js/zklogin';
import {
  genAddressSeed,
  generateNonce,
  generateRandomness,
  getExtendedEphemeralPublicKey,
  getZkLoginSignature,
} from '@mysten/zklogin';
import { jwtDecode } from 'jwt-decode';
import queryString from 'query-string';
import { useContext } from 'react';

import { getCurrentEpoch } from '@/lib/sui-related/utils';
import {
  buildMultiSigWallet,
  fullAccountToFetchedAccount,
  makeZkLoginFullAccountFromPreparation,
  restoreAccountPreparation,
  restoreAccountsFromFetchedAccounts,
  restoreFullAccounts,
  saveAccountPreparation,
  saveFullAccountsWithOldsOnes,
} from '@/lib/sui-related/zkLogin';

import {
  addAccount,
  registerNewUser,
  signIn,
} from '@/backend/userAccountHandling';
import { DEFAULT_MAX_EPOCH } from '@/constant/config';
import { ZkLoginAccountsContext } from '@/contexts/zkLoginInfoContext';
// export const completeZkLoginFlowAfterOauth = async () => {};

const getAndResetUrlToken = () => {
  const tokenInUrl = queryString.parse(location.hash);
  if (!tokenInUrl?.id_token) throw new Error('id_token not found');
  const token = tokenInUrl.id_token as string;
  window.location.hash = '';
  return token;
};

export const useZkLogin = () => {
  const {
    zkLoginAccounts: zkLoginInfoByAccounts,
    setZkLoginAccounts: setZkLoginInfoByAccounts,
  } = useContext(ZkLoginAccountsContext);

  const prepareOauthConnection = async () => {
    const ephemeralKeyPair = new Ed25519Keypair();
    const randomness = generateRandomness();
    const maxEpoch =
      Number((await getCurrentEpoch()).epoch) + DEFAULT_MAX_EPOCH;

    const extendedEphemeralPublicKey = getExtendedEphemeralPublicKey(
      ephemeralKeyPair.getPublicKey()
    );

    const nonce = await generateNonce(
      ephemeralKeyPair.getPublicKey(),
      maxEpoch,
      randomness
    );

    const newZkLoginInfo: ZkLoginAccountPreparation = {
      ephemeralPrivateKey: ephemeralKeyPair.getSecretKey(),
      ephemeralPublicKey: ephemeralKeyPair.getPublicKey().toBase64(),
      ephemeralExtendedPublicKey: extendedEphemeralPublicKey,
      randomness,
      nonce,
      maxEpoch: maxEpoch.toString(),
    };

    saveAccountPreparation(newZkLoginInfo);

    return newZkLoginInfo;
  };

  const createMultiSigSignature = async (
    multisigAccount: MultiSigAccount,
    transactionBlock: TransactionBlock
  ) => {
    const multisigPublicKey = await buildMultiSigWallet(
      multisigAccount.components,
      1
    );
    const multisigAddress = multisigPublicKey.toSuiAddress();

    // generate signatures from zkAccounts

    const signature = multisigPublicKey.combinePartialSignatures([]);

    return signature;
  };

  const createMultiSigWallet = async (
    zkLogins: ZkLoginFetchedAccount[],
    threshold: number
  ) => {
    const publicZkKeys = zkLogins.map(
      (account) => new ZkLoginPublicIdentifier(account.publicIdentifier)
    );

    const multiSigPublicKey = MultiSigPublicKey.fromPublicKeys({
      threshold: threshold,
      publicKeys: publicZkKeys.map((zkKey) => ({
        publicKey: zkKey,
        weight: 1,
      })),
    });

    const multisigAddress = multiSigPublicKey.toSuiAddress();
    console.log('🚀 ~ createMultiSigWal ~ multisigAddress:', multisigAddress);

    return multiSigPublicKey;
    // const txb = new TransactionBlock();
    // // Transfer 1 SUI to 0xfa0f...8a36.
    // const [coin] = txb.splitCoins(txb.gas, [MIST_PER_SUI * 1n]);
    // txb.transferObjects(
    //   [coin],
    //   '0xb5b76de7d9a9132a1c11209fc9fd2075f662ff91ee3dce450d8fb05c81ae2867'
    // );
    // txb.setSender(multisigAddress);
    // console.log('2');

    // const googleSig = await createZkLoginSignature(OauthTypes.google, txb);
    // if (!googleSig) return;

    // const multisig = multiSigPublicKey.combinePartialSignatures([
    //   googleSig.signature,
    // ]);

    // const client = new SuiClient({ url: getFullnodeUrl('devnet') });

    // const res = await client.executeTransactionBlock({
    //   transactionBlock: googleSig.bytes,
    //   signature: multisig,
    // });
  };

  const createZkLoginSignature = async (
    zkAccount: ZkLoginFullAccount,
    transactionBlock: TransactionBlock
  ): Promise<{
    bytes: string;
    signature: SerializedSignature;
  } | null> => {
    const client = new SuiClient({ url: getFullnodeUrl('devnet') });
    const { secretKey } = decodeSuiPrivateKey(zkAccount.ephemeralPrivateKey);
    const ephemeralKeyPair = Ed25519Keypair.fromSecretKey(secretKey);

    const { bytes, signature: userSignature } = await transactionBlock.sign({
      client,
      signer: ephemeralKeyPair,
    });

    const zkLoginSignature: SerializedSignature = getZkLoginSignature({
      inputs: {
        ...zkAccount.zkProof,
        addressSeed: zkAccount.addressSeed,
      },
      maxEpoch: zkAccount.maxEpoch,
      userSignature,
    });

    return {
      bytes,
      signature: zkLoginSignature,
    };
  };

  const signTransaction = async (zkLoginInfo: ZkLoginAccount) => {
    // sign transaction
    if (!zkLoginInfo.persistentInfo.zkLoginAddress) {
      console.error('zkLoginAddress not found');
      return;
    }

    if (!zkLoginInfo.ephemeralInfo.zkProof) {
      console.error('zkProof not found');
      return;
    }

    if (!zkLoginInfo.persistentInfo.jwt) {
      console.error('jwt not found');
      return;
    }

    if (!zkLoginInfo.persistentInfo.userSalt) {
      console.error('userSalt not found');
      return;
    }

    if (!zkLoginInfo.persistentInfo.zkLoginAddress) {
      console.error('zkLoginAddress not found');
      return;
    }

    const rpcUrl = getFullnodeUrl('devnet');
    const client = new SuiClient({ url: rpcUrl });
    const { secretKey } = decodeSuiPrivateKey(
      zkLoginInfo.ephemeralInfo.ephemeralPrivateKey
    );
    const ephemeralKeyPair = Ed25519Keypair.fromSecretKey(secretKey);

    const txb = new TransactionBlock();
    // Transfer 1 SUI to 0xfa0f...8a36.
    const [coin] = txb.splitCoins(txb.gas, [MIST_PER_SUI * 1n]);
    txb.transferObjects(
      [coin],
      '0xb5b76de7d9a9132a1c11209fc9fd2075f662ff91ee3dce450d8fb05c81ae2867'
    );
    txb.setSender(zkLoginInfo.persistentInfo.zkLoginAddress);

    const { bytes, signature: userSignature } = await txb.sign({
      client,
      signer: ephemeralKeyPair,
    });

    const decodedJwt = jwtDecode(zkLoginInfo.persistentInfo.jwt);
    if (!decodedJwt.sub || !decodedJwt.aud) {
      console.error('sub or aud not found in jwt');
      return;
    }

    const addressSeed: string = genAddressSeed(
      BigInt(zkLoginInfo.persistentInfo.userSalt),
      'sub',
      decodedJwt.sub,
      decodedJwt.aud as string
    ).toString();

    const zkLoginSignature: SerializedSignature = getZkLoginSignature({
      inputs: {
        ...zkLoginInfo.ephemeralInfo.zkProof,
        addressSeed,
      },
      maxEpoch: zkLoginInfo.persistentInfo.maxEpoch,
      userSignature,
    });

    const res = await client.executeTransactionBlock({
      transactionBlock: bytes,
      signature: zkLoginSignature,
    });
    console.log('🚀 ~ signTransaction ~ res:', res);
  };

  const handleOauthResponse = async () => {
    const token = getAndResetUrlToken();
    const zkAccountPreparation = restoreAccountPreparation();
    if (!zkAccountPreparation) throw new Error('no account preparation found');

    const storedAccounts = restoreFullAccounts();

    if (storedAccounts.length === 0) {
      const fetchedAccounts = await signIn(token);
      const fetchedZkLoginAccounts: ZkLoginFetchedAccount[] =
        fetchedAccounts.accounts.map((account) => ({
          email: account.email,
          issuer: account.issuer,
          publicIdentifier: account.publicIdentifier,
          salt: account.salt,
          sub: account.sub,
          type: 'zkPartial',
        }));
      if (fetchedAccounts.accounts.length > 0) {
        // restore accounts
        const restoredAccounts = await restoreAccountsFromFetchedAccounts(
          token,
          zkAccountPreparation,
          fetchedZkLoginAccounts
        );
        saveFullAccountsWithOldsOnes(restoredAccounts);
      } else {
        const newAccount = await makeZkLoginFullAccountFromPreparation(
          token,
          zkAccountPreparation
        );
        // register new account
        await registerNewUser(
          jwtDecode(token).sub as string,
          fullAccountToFetchedAccount(newAccount)
        );
        saveFullAccountsWithOldsOnes([newAccount]);
      }
    } else {
      // add account
      const newAccount = await makeZkLoginFullAccountFromPreparation(
        token,
        zkAccountPreparation
      );
      await addAccount(
        storedAccounts[0].jwt,
        fullAccountToFetchedAccount(newAccount)
      );
      saveFullAccountsWithOldsOnes([newAccount]);
    }
  };

  return {
    ...zkLoginInfoByAccounts,
    createMultiSigWallet,
    signTransaction,
    prepareOauthConnection,
    createZkLoginSignature,
    handleOauthResponse,
  };
};
