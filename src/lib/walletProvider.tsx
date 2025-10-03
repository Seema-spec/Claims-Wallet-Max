'use client';

import React, { createContext, useContext, useState } from 'react';

interface Transaction {
  date: string;
  description: string;
  amount: string;
  status: string;
  method: string;
}

interface WalletContextType {
  balance: number;
  isTransferring: boolean;
  transactions: Transaction[];
  transfer: (amount: number, method?: string) => Promise<boolean>;
  refresh: () => Promise<number>;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [balance, setBalance] = useState<number>(4750);
  const [isTransferring, setIsTransferring] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { date: '2024-03-15', description: 'Home Depot Purchase', amount: '$250.00', status: 'Completed', method: 'Virtual Card' },
    { date: '2024-03-14', description: 'Lowes Hardware', amount: '$175.50', status: 'Completed', method: 'Virtual Card' },
    { date: '2024-03-13', description: 'Claim Payment', amount: '$5,000.00', status: 'Completed', method: 'Deposit' },
  ]);

const transfer = (amount: number, method: string): Promise<boolean> => {
  setIsTransferring(true);
  return new Promise((resolve) => {
    setTimeout(() => {
      setBalance((b) => +(b - amount).toFixed(2));
      setTransactions((prev) => [
        {
          date: new Date().toISOString().split('T')[0],
          description: `Transfer to ${method}`,
          amount: method === 'Virtual Card' 
            ? `$${amount.toFixed(2)}`   // ✅ no minus for virtual card
            : `$${amount.toFixed(2)}`,
          status: 'Completed',
          method,
        },
        ...prev,
      ]);
      setIsTransferring(false);
      resolve(true);
    }, 1200);
  });
};
  const refresh = (): Promise<number> => Promise.resolve(balance);

  return (
    <WalletContext.Provider
      value={{
        balance,
        isTransferring,
        transactions,
        transfer,
        refresh,
        setTransactions,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within a WalletProvider');
  return ctx;
};
