'use client';

import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import {
  generateNonce,
  generateRandomness,
  getExtendedEphemeralPublicKey,
} from '@mysten/zklogin';
import { useContext } from 'react';

import { getCurrentEpoch } from '@/lib/sui-related/utils';
import {
  restoreAccountPreparation,
  saveAccountPreparation,
} from '@/lib/sui-related/zkLoginClient';

import { DEFAULT_MAX_EPOCH } from '@/constant/config';
import { SelectedZkAccountContext } from '@/contexts/selectedZkAccountContext';
import { UseZkLoginStateContext } from '@/contexts/useZkLoginStateContext';
import { ZkLoginAccountsContext } from '@/contexts/zkLoginInfoContext';
// export const completeZkLoginFlowAfterOauth = async () => {};

export const useZkLogin = () => {
  const { zkLoginAccounts, setZkLoginAccounts } = useContext(
    ZkLoginAccountsContext
  );

  const { selectedZkAccount, setSelectedZkAccount } = useContext(
    SelectedZkAccountContext
  );

  const { useZkLoginState, setUseZkLoginState } = useContext(
    UseZkLoginStateContext
  );

  const removeAccount = (account: ZkLoginFullAccount) => {
    setZkLoginAccounts((prev) =>
      prev.filter((a) => a.address !== account.address)
    );
  };

  const skipSecondAccountCreation = async () => {
    setUseZkLoginState((prev) => ({
      ...prev,
      hasSkippedSecondAccountCreation: true,
    }));
  };

  // TODO: send token with active account

  return {
    zkLoginAccounts,
    setZkLoginAccounts,
    selectedZkAccount,
    setSelectedZkAccount,
    removeAccount,
    useZkLoginState,
    setUseZkLoginState,
    skipSecondAccountCreation,
  };
};
