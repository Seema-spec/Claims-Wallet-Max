'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Clock, Landmark, MailCheck, ArrowRight } from 'lucide-react';
import { PaymentTransferModal } from './PaymentTransferModal';
import { FeatureCards } from './FeatureCards';
import { useWallet } from '@/lib/walletProvider';

const paymentMethods = [
  {
    id: 'virtual-card',
    name: 'Virtual Card',
    description: 'Instant access to funds with Mastercard',
    icon: CreditCard,
    timeframe: 'Instant',
    color: 'from-blue-600 to-indigo-600',
    type: 'Virtual Card',
  },
  {
    id: 'direct-card',
    name: 'Direct to Visa/Mastercard',
    description: 'Send money to your existing credit or debit card',
    icon: CreditCard,
    timeframe: '10-30 minutes',
    color: 'from-green-600 to-emerald-600',
    type: 'card',
  },
  {
    id: 'ach',
    name: 'ACH Bank',
    description: 'Transfer directly to your bank account',
    icon: Landmark,
    timeframe: '1-3 business days',
    color: 'from-purple-600 to-violet-600',
    type: 'ach',
  },
  {
    id: 'check',
    name: 'eCheck',
    description: 'Traditional check sent to your mailing address',
    icon: MailCheck,
    timeframe: '5-7 business days',
    color: 'from-amber-600 to-orange-600',
    type: 'echeck',
  },
];

export const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState<typeof paymentMethods[0] | null>(null);
  const { balance, isTransferring, transfer, setTransactions } = useWallet();

  const handleSelectPaymentMethod = (methodId: string) => {
    const method = paymentMethods.find((m) => m.id === methodId);
    if (method) setSelectedMethod(method);
  };

  // ✅ fix: receive a Transaction, not just amount
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const handleTransactionComplete = (tx:any) => {
    setTransactions((prev) => [tx, ...prev]); // ✅ always update here
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div className="max-w-5xl mx-auto mb-16" variants={containerVariants} initial="hidden" animate="visible">
      <h2 className="text-2xl font-bold mb-8 text-center">Select Payment Method</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <FeatureCards />
        {paymentMethods.slice(1).map((method) => (
          <motion.div key={method.id} variants={cardVariants}>
            <button
              onClick={() => handleSelectPaymentMethod(method.id)}
              className="w-full h-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 flex flex-col text-left gap-4 relative overflow-hidden group"
            >
              <div className="flex items-center gap-3 mb-1">
                <div
                  className={`p-2 rounded-full bg-${method.id === 'direct-card' ? 'green' : method.id === 'ach' ? 'purple' : 'amber'}-50 
                  dark:bg-${method.id === 'direct-card' ? 'green' : method.id === 'ach' ? 'purple' : 'amber'}-900/30 
                  text-${method.id === 'direct-card' ? 'green' : method.id === 'ach' ? 'purple' : 'amber'}-600 
                  dark:text-${method.id === 'direct-card' ? 'green' : method.id === 'ach' ? 'purple' : 'amber'}-400`}
                >
                  <method.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold">{method.name}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{method.description}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {method.timeframe}
                </span>
                <span className="text-blue-600 flex items-center text-sm">
                  <span>Select</span>
                  <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </div>

              <div className="absolute inset-0 bg-gray-600/5 dark:bg-gray-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>
        ))}

  
        {selectedMethod && (
          <PaymentTransferModal
            open={!!selectedMethod}
            onClose={() => setSelectedMethod(null)}
            paymentMethodName={selectedMethod.name}
            transferType={selectedMethod.type as 'echeck' | 'card' | 'ach' | 'Virtual Card'}
            onComplete={handleTransactionComplete}
          />
        )}
      </div>
    </motion.div>
  );
};
