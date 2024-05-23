'use client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import {
  generateNonce,
  generateRandomness,
  getExtendedEphemeralPublicKey,
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
      ephemeralPrivateKey: ephemeralKeyPair.export().privateKey,
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
  }, []);

  for (const provider in OauthTypes) {
    if (typeof provider === 'number') continue;
    if (!zkLoginInfoByProvider[provider as OauthTypes]) {
      prepareZkLogin(provider as OauthTypes);
    }
  }

  return {
    ...zkLoginInfoByProvider,
    prepareZkLogin,
    getZkProof,
  };
};
