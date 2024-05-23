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
import {
  toZkLoginPublicIdentifier,
  ZkLoginPublicIdentifier,
} from '@mysten/sui.js/zklogin';
import {
  genAddressSeed,
  generateNonce,
  generateRandomness,
  getExtendedEphemeralPublicKey,
  getZkLoginSignature,
  jwtToAddress,
} from '@mysten/zklogin';
import { jwtDecode } from 'jwt-decode';
import queryString from 'query-string';
import { useContext, useEffect } from 'react';

import { getCurrentEpoch } from '@/lib/sui-related/utils';
import { generateZkProofClient } from '@/lib/sui-related/zkLogin';
import { generateUserSalt } from '@/lib/sui-related/zkLoginServer';

import { ZkLoginInfoContext } from '@/contexts/zkLoginInfoContext';
import { OauthTypes } from '@/enums/OauthTypes.enum';
// export const completeZkLoginFlowAfterOauth = async () => {};

export const useZkLogin = () => {
  const { zkLoginInfoByProvider, setZkLoginInfo } =
    useContext(ZkLoginInfoContext);

  const prepareZkLogin = async (oauthProvider: OauthTypes) => {
    const ephemeralKeyPair = new Ed25519Keypair();
    const randomness = generateRandomness();
    const maxEpoch = Number((await getCurrentEpoch()).epoch) + 10;

    const extendedEphemeralPublicKey = getExtendedEphemeralPublicKey(
      ephemeralKeyPair.getPublicKey()
    );

    const nonce = await generateNonce(
      ephemeralKeyPair.getPublicKey(),
      maxEpoch,
      randomness
    );

    const salt = await generateUserSalt();

    const newZkLoginInfo: ZkLoginInfo = {
      ephemeralPrivateKey: ephemeralKeyPair.getSecretKey(),
      ephemeralPublicKey: ephemeralKeyPair.getPublicKey().toBase64(),
      ephemeralExtendedPublicKey: extendedEphemeralPublicKey,
      randomness,
      userSalt: salt,
      nonce,
      maxEpoch: maxEpoch.toString(),
    };

    setZkLoginInfo((prev) => ({
      ...prev,
      [oauthProvider]: [newZkLoginInfo],
    }));

    return { ...newZkLoginInfo };
  };

  const getZkProof = async (oauthProvider: OauthTypes, jwt: string) => {
    const zkLoginInfo = zkLoginInfoByProvider[oauthProvider][0];

    const zkLoginAddress = jwtToAddress(jwt, zkLoginInfo.userSalt);
    const zkProof = await generateZkProofClient(
      jwt,
      zkLoginInfo.ephemeralExtendedPublicKey,
      zkLoginInfo.userSalt,
      zkLoginInfo.randomness,
      zkLoginInfo.maxEpoch
    );

    setZkLoginInfo((prev) => ({
      ...prev,
      [oauthProvider]: [
        {
          ...zkLoginInfo,
          jwt,
          zkProof,
          zkLoginAddress,
        },
      ],
    }));

    return { zkProof, zkLoginAddress };
  };

  const createMultiSigWallet = async (oauthProviders: OauthTypes[]) => {
    const publicZkKeys = oauthProviders
      .map((provider) => {
        const zkLoginInfo = zkLoginInfoByProvider[provider][0];
        if (!zkLoginInfo.jwt) return null;
        const decodedJwt = jwtDecode(zkLoginInfo.jwt);
        if (!decodedJwt.sub || !decodedJwt.aud || !decodedJwt.iss) return null;
        const addressSeed = genAddressSeed(
          zkLoginInfo.userSalt,
          'sub',
          decodedJwt.sub,
          decodedJwt.aud as string
        );

        const pkZklogin = toZkLoginPublicIdentifier(
          addressSeed,
          decodedJwt.iss
        );
        return pkZklogin;
      })
      .filter((zkKey) => zkKey !== null) as ZkLoginPublicIdentifier[];

    const multiSigPublicKey = MultiSigPublicKey.fromPublicKeys({
      threshold: 1,
      publicKeys: publicZkKeys.map((zkKey) => ({
        publicKey: zkKey,
        weight: 1,
      })),
    });

    const multisigAddress = multiSigPublicKey.toSuiAddress();
    console.log('🚀 ~ createMultiSigWal ~ multisigAddress:', multisigAddress);

    const txb = new TransactionBlock();
    // Transfer 1 SUI to 0xfa0f...8a36.
    const [coin] = txb.splitCoins(txb.gas, [MIST_PER_SUI * 1n]);
    txb.transferObjects(
      [coin],
      '0xb5b76de7d9a9132a1c11209fc9fd2075f662ff91ee3dce450d8fb05c81ae2867'
    );
    txb.setSender(multisigAddress);
    console.log('2');

    const googleSig = await createZkLoginSignature(OauthTypes.google, txb);
    if (!googleSig) return;

    const multisig = multiSigPublicKey.combinePartialSignatures([
      googleSig.signature,
    ]);

    const client = new SuiClient({ url: getFullnodeUrl('devnet') });

    const res = await client.executeTransactionBlock({
      transactionBlock: googleSig.bytes,
      signature: multisig,
    });
  };

  const createZkLoginSignature = async (
    oauthProvider: OauthTypes,
    transactionBlock: TransactionBlock
  ): Promise<{
    bytes: string;
    signature: SerializedSignature;
  } | null> => {
    const zkLoginInfo = zkLoginInfoByProvider[oauthProvider][0];
    if (!zkLoginInfo.jwt) {
      console.error('jwt not found');
      return null;
    }
    if (!zkLoginInfo.zkProof) {
      console.error('zkProof not found');
      return null;
    }

    const decodedJwt = jwtDecode(zkLoginInfo.jwt);
    if (!decodedJwt.sub || !decodedJwt.aud) {
      console.error('sub or aud not found in jwt');
      return null;
    }

    const addressSeed: string = genAddressSeed(
      BigInt(zkLoginInfo.userSalt),
      'sub',
      decodedJwt.sub,
      decodedJwt.aud as string
    ).toString();

    const client = new SuiClient({ url: getFullnodeUrl('devnet') });
    const { secretKey } = decodeSuiPrivateKey(zkLoginInfo.ephemeralPrivateKey);
    const ephemeralKeyPair = Ed25519Keypair.fromSecretKey(secretKey);

    const { bytes, signature: userSignature } = await transactionBlock.sign({
      client,
      signer: ephemeralKeyPair,
    });

    const zkLoginSignature: SerializedSignature = getZkLoginSignature({
      inputs: {
        ...zkLoginInfo.zkProof,
        addressSeed,
      },
      maxEpoch: zkLoginInfo.maxEpoch,
      userSignature,
    });

    return {
      bytes,
      signature: zkLoginSignature,
    };
  };

  const signTransaction = async (oauthProvider: OauthTypes) => {
    const zkLoginInfo = zkLoginInfoByProvider[oauthProvider][0];

    // sign transaction
    if (!zkLoginInfo.zkLoginAddress) {
      console.error('zkLoginAddress not found');
      return;
    }

    if (!zkLoginInfo.zkProof) {
      console.error('zkProof not found');
      return;
    }

    if (!zkLoginInfo.jwt) {
      console.error('jwt not found');
      return;
    }

    const rpcUrl = getFullnodeUrl('devnet');
    const client = new SuiClient({ url: rpcUrl });
    const { secretKey } = decodeSuiPrivateKey(zkLoginInfo.ephemeralPrivateKey);
    const ephemeralKeyPair = Ed25519Keypair.fromSecretKey(secretKey);

    console.log('1');

    const txb = new TransactionBlock();
    // Transfer 1 SUI to 0xfa0f...8a36.
    const [coin] = txb.splitCoins(txb.gas, [MIST_PER_SUI * 1n]);
    txb.transferObjects(
      [coin],
      '0xb5b76de7d9a9132a1c11209fc9fd2075f662ff91ee3dce450d8fb05c81ae2867'
    );
    txb.setSender(zkLoginInfo.zkLoginAddress);
    console.log('2');

    const { bytes, signature: userSignature } = await txb.sign({
      client,
      signer: ephemeralKeyPair,
    });

    console.log('3');

    const decodedJwt = jwtDecode(zkLoginInfo.jwt);
    if (!decodedJwt.sub || !decodedJwt.aud) {
      console.error('sub or aud not found in jwt');
      return;
    }

    console.log('4');

    const addressSeed: string = genAddressSeed(
      BigInt(zkLoginInfo.userSalt),
      'sub',
      decodedJwt.sub,
      decodedJwt.aud as string
    ).toString();

    const zkLoginSignature: SerializedSignature = getZkLoginSignature({
      inputs: {
        ...zkLoginInfo.zkProof,
        addressSeed,
      },
      maxEpoch: zkLoginInfo.maxEpoch,
      userSignature,
    });

    const res = await client.executeTransactionBlock({
      transactionBlock: bytes,
      signature: zkLoginSignature,
    });
    console.log('🚀 ~ signTransaction ~ res:', res);
  };

  const handleOauthResponse = () => {
    const tokenInUrl = queryString.parse(location.hash);
    if (!tokenInUrl?.id_token) return;
    const token = tokenInUrl.id_token as string;

    const decodedToken = jwtDecode(token);
    for (const provider in OauthTypes) {
      if (typeof provider === 'number') continue;
      if (decodedToken?.iss?.includes(provider)) {
        getZkProof(provider as OauthTypes, token);
      }
      break;
    }
    //remove token from url
    history.pushState('', document.title, window.location.pathname);

    console.log('🚀 ~ handleOauthResponse ~ decodedToken:', decodedToken);
  };

  useEffect(() => {
    handleOauthResponse();
    for (const provider in OauthTypes) {
      if (typeof provider === 'number') continue;
      const providerZkLoginInfo = zkLoginInfoByProvider[provider as OauthTypes];
      if (!providerZkLoginInfo || providerZkLoginInfo.length === 0) {
        prepareZkLogin(provider as OauthTypes);
      }
    }
  }, []);

  return {
    ...zkLoginInfoByProvider,
    createMultiSigWallet,
    signTransaction,
    prepareZkLogin,
    getZkProof,
  };
};
