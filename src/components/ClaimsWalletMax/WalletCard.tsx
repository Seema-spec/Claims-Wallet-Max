import React from 'react';
import { ClaimsWalletCardPlus } from '../ClaimsWalletCardPlus';
import { useWallet } from '@/lib/walletProvider';


interface WalletCardProps {
  onRefresh: () => void;
}

export const WalletCard = ({ onRefresh }: WalletCardProps) => {
  const { balance } = useWallet();
  console.log(balance,"balance");
  
  return (
    <div className="max-w-5xl mx-auto mb-10">
      <ClaimsWalletCardPlus balance={balance} onRefresh={onRefresh} />
    </div>
  );
};
