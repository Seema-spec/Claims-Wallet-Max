'use client';

import { CreditCard, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { PaymentTransferModal } from './PaymentTransferModal';
import { useWallet } from '../hooks/useWalllet';

export function FeatureCards() {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const { balance, isTransferring } = useWallet();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <>
      <motion.div
        className="md:col-span-2"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <button
          onClick={() => setShowTransferModal(true)}
          className="w-full bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-600/50 dark:border-blue-500/30 flex md:flex-row flex-col items-center text-left gap-6 relative overflow-hidden group"
        >
          {/* Card visual */}
          <div className="w-[200px] h-[120px] rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex-shrink-0 shadow-lg relative">
            <div className="absolute top-2 left-2">
              <img
                src="https://juiceclaims.com/Juice-2024-Logo-2000x800.png"
                alt="Juice Financial"
                className="h-6"
              />
            </div>
            <div className="absolute bottom-2 right-2">
              <img
                src="https://www.mastercard.com/content/dam/public/mastercardcom/na/us/en/homepage/Home/mc-logo-52.svg"
                alt="Mastercard"
                className="h-6"
              />
            </div>
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white/70">
              **** 4444
            </div>
          </div>

          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Virtual Mastercard</h3>
              <div className="ml-auto">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  INSTANT
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Get instant access to your funds with a virtual Mastercard that can be used anywhere online or added to your mobile wallet.
            </p>
            <div className="flex items-center text-blue-600">
              <span className="font-medium">Select Virtual Card</span>
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          <div className="absolute inset-0 bg-blue-600/5 dark:bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </motion.div>

      {/* ✅ Transfer Modal */}
      <PaymentTransferModal
        open={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        paymentMethodName="Virtual Card"
        transferType="Virtual Card" // ✅ must be 'card', 'echeck', or 'ach'
      />
    </>
  );
}
