'use client'

import React, { useState } from 'react';
import { Header } from '../layout/Header';
import { HeroSection } from './HeroSection';
import { WalletCard } from './WalletCard';
import { PaymentMethods } from './PaymentMethods';
import { RecentTransactions } from './RecentTransaction';
import { PageHelpButton } from './PageHelpButton';
import { HelpSidebarBase } from './HelpSidebarBase';
import { ChatBubble } from './ChatBubble';
import { OTPVerificationModal } from './OtpVerificationModal';
import { PaymentTransferModal } from './PaymentTransferModal';
import { claimsWalletPlusHelp } from '../data/claimsWalletPlusHelp';
import { FooterSection } from './FooterCards';
import { Footer } from '../layout/Footer';
import { useWallet } from '@/lib/walletProvider';


export function ClaimsWalletMax() {
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    const { transactions, setTransactions } = useWallet();
    const toggleHelpSidebar = () => setIsHelpOpen(!isHelpOpen);


    const handleNewTransaction = (tx: any) => {
        setTransactions((prev) => [tx, ...prev]); 
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F7F9FF] dark:bg-gray-950">
            <Header />
            <main className="flex-grow pt-24">
                <HeroSection />
                <WalletCard onRefresh={() => setShowTransferModal(true)} />
                <PaymentMethods onSelect={() => setShowTransferModal(true)} />
                <RecentTransactions transactions={transactions} />
                <FooterSection />
                <Footer />
            </main>

            <div className="fixed top-20 right-4 z-40">
                <PageHelpButton
                    onClick={toggleHelpSidebar}
                    isOpen={isHelpOpen}
                />
            </div>

            <HelpSidebarBase
                isOpen={isHelpOpen}
                onClose={toggleHelpSidebar}
                content={claimsWalletPlusHelp}
            />
            <ChatBubble />

            <OTPVerificationModal open={showOTPModal} onClose={() => setShowOTPModal(false)} />
            <PaymentTransferModal
                open={showTransferModal}
                onClose={() => setShowTransferModal(false)}
                paymentMethodName="eCheck"
                transferType="echeck"
                onComplete={handleNewTransaction}
            />
        </div>
    );
}
