'use client'

import { useState } from 'react';

interface WalletState {
  balance: number;
  isTransferring: boolean;
}

interface UseWalletReturn {
  balance: number;
  isTransferring: boolean;
  transfer: (amount: number) => Promise<boolean>;
  refresh: () => Promise<number>;
}

interface UseWalletProps {
  balance?: number;
}

export function useWallet(initial: UseWalletProps = { balance: 4750 }): UseWalletReturn {
  const [balance, setBalance] = useState<number>(initial.balance ?? 0);
  const [isTransferring, setIsTransferring] = useState<boolean>(false);

  const transfer = (amount: number): Promise<boolean> => {
    setIsTransferring(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setBalance((b) => +(b - amount).toFixed(2));
        setIsTransferring(false);
        resolve(true);
      }, 1200);
    });
  };

  const refresh = (): Promise<number> => {
    // Placeholder for fetching refreshed balance from API
    // Currently just returns the current balance
    return Promise.resolve(balance);
  };

  return { balance, isTransferring, transfer, refresh };
}
