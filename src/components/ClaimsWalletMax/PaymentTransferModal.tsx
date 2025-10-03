'use client';

import { useState, useEffect } from 'react';
import { Wallet, DollarSign, Check, X, CreditCard } from 'lucide-react';
import { Label } from '../common/Label';
import { Button } from '../common/Button';
import { useWallet } from '@/lib/walletProvider';

interface PaymentTransferModalProps {
  open: boolean;
  onClose: () => void;
  paymentMethodName?: string;
  transferType?: 'echeck' | 'card' | 'ach' | 'Virtual Card';
}

export function PaymentTransferModal({
  open,
  onClose,
  paymentMethodName = 'eCheck',
  transferType = 'echeck',
}: PaymentTransferModalProps) {
  const { balance, isTransferring, transfer } = useWallet();

  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState(false);

  // eCheck-specific
  const [address, setAddress] = useState('');

  // Card-specific
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [zip, setZip] = useState('');

  // ACH-specific
  const [bankName, setBankName] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  // Virtual card-specific
  const [cardAlias, setCardAlias] = useState('');
  const [cardLimit, setCardLimit] = useState('');

  useEffect(() => {
    if (!open) {
      setAmount('');
      setSuccess(false);
      setAddress('');
      setCardNumber('');
      setExpiry('');
      setZip('');
      setBankName('');
      setRoutingNumber('');
      setAccountNumber('');
      setCardAlias('');
      setCardLimit('');
    }
  }, [open]);

  // ✅ Validation
  const validate = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0 || amt > balance || isTransferring) return false;

    switch (transferType) {
      case 'echeck':
        return address.trim().length > 5;

      case 'card':
        return (
          cardNumber.trim().length >= 12 &&
          expiry.trim().length >= 4 &&
          zip.trim().length >= 4
        );

      case 'ach':
        return (
          bankName.trim().length > 2 &&
          routingNumber.trim().length === 9 &&
          accountNumber.trim().length >= 6
        );

      case 'Virtual Card':
        return cardAlias.trim().length > 2 && parseFloat(cardLimit) > 0;

      default:
        return false;
    }
  };

  const doTransfer = async () => {
    if (!validate()) return;
    const ok = await transfer(parseFloat(amount), paymentMethodName);
    if (ok) {
      setSuccess(true);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-white border border-blue-600 rounded-md p-1">
              {transferType === 'Virtual Card' ? (
                <CreditCard className="h-5 w-5 text-blue-600" />
              ) : (
                <Wallet className="h-5 w-5 text-blue-600" />
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {success
                ? 'Transfer Successful'
                : isTransferring
                ? `Transferring to ${paymentMethodName}...`
                : `Transfer to ${paymentMethodName}`}
            </h3>
          </div>
          {!isTransferring && !success && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {!success ? (
          <>
            {/* Balance Display */}
            <div className="bg-blue-50 rounded-lg p-4 mb-5 flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-sm text-gray-500">Available Balance</div>
                <div className="text-2xl font-bold text-gray-900">
                  ${balance.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <Label className="block text-sm font-medium mb-1">Transfer Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-7 pr-4 py-3 rounded-md border border-gray-200 outline-none text-lg"
                />
              </div>
            </div>

            {/* Dynamic Form Fields */}
            {transferType === 'echeck' && (
              <div className="mb-4">
                <Label className="block text-sm font-medium mb-1">Mailing Address</Label>
                <textarea
                  placeholder="Enter your mailing address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-md border border-gray-200 outline-none pl-3 pt-2 pb-12"
                />
              </div>
            )}

            {transferType === 'card' && (
              <>
                <div className="mb-4">
                  <Label className="block text-sm font-medium mb-1">Card Number</Label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card number"
                    className="w-full rounded-md border border-gray-200 outline-none p-3"
                  />
                </div>
                <div className="flex gap-3 mb-4">
                  <div className="flex-1">
                    <Label className="block text-sm font-medium mb-1">Expiration Date</Label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full rounded-md border border-gray-200 outline-none p-3"
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="block text-sm font-medium mb-1">Zip Code</Label>
                    <input
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="Billing zip code"
                      className="w-full rounded-md border border-gray-200 outline-none p-3"
                    />
                  </div>
                </div>
              </>
            )}

            {transferType === 'ach' && (
              <>
                <div className="mb-4">
                  <Label className="block text-sm font-medium mb-1">Bank Name</Label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="Enter bank name"
                    className="w-full rounded-md border border-gray-200 outline-none p-3"
                  />
                </div>
                <div className="flex gap-3 mb-4">
                  <div className="flex-1">
                    <Label className="block text-sm font-medium mb-1">Routing Number</Label>
                    <input
                      type="text"
                      maxLength={9}
                      value={routingNumber}
                      onChange={(e) => setRoutingNumber(e.target.value)}
                      placeholder="9 digits"
                      className="w-full rounded-md border border-gray-200 outline-none p-3"
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="block text-sm font-medium mb-1">Account Number</Label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="Account number"
                      className="w-full rounded-md border border-gray-200 outline-none p-3"
                    />
                  </div>
                </div>
              </>
            )}

            {transferType === 'Virtual Card' && (
              <>
                <div className="mb-4">
                  <Label className="block text-sm font-medium mb-1">Card Alias</Label>
                  <input
                    type="text"
                    value={cardAlias}
                    onChange={(e) => setCardAlias(e.target.value)}
                    placeholder="Nickname for this virtual card"
                    className="w-full rounded-md border border-gray-200 outline-none p-3"
                  />
                </div>
                <div className="mb-4">
                  <Label className="block text-sm font-medium mb-1">Card Limit</Label>
                  <input
                    type="number"
                    value={cardLimit}
                    onChange={(e) => setCardLimit(e.target.value)}
                    placeholder="Set spending limit"
                    className="w-full rounded-md border border-gray-200 outline-none p-3"
                  />
                </div>
              </>
            )}

            {/* Info Text */}
            <div className="text-sm text-gray-500 mb-6 space-y-1">
              {transferType === 'card' && (
                <div className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>Typically takes 10–30 minutes</span>
                </div>
              )}
              {transferType === 'echeck' && (
                <div className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>Delivery time: 5–7 business days</span>
                </div>
              )}
              {transferType === 'ach' && (
                <div className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>Processing time: 1–3 business days</span>
                </div>
              )}
              {transferType === 'Virtual Card' && (
                <>
                  <div className="flex items-center gap-2">
                    <span>⏱️</span>
                    <span>Available immediately</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🔒</span>
                    <span>Secure, encrypted transfer</span>
                  </div>
                </>
              )}
            </div>

            {/* Action Button */}
            <div>
              <Button
                onClick={doTransfer}
                disabled={!validate()}
                className={`w-full ${!validate() ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {transferType === 'Virtual Card'
                  ? 'Generate Virtual Card →'
                  : 'Transfer Funds →'}
              </Button>
            </div>
          </>
        ) : (
          <div className="py-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <Label as="h4" className="text-lg font-bold">
              Transfer Successful!
            </Label>
            <Label className="text-sm text-gray-600 dark:text-gray-400">
              {transferType === 'Virtual Card'
                ? `Virtual Card "${cardAlias}" created with a limit of $${parseFloat(
                    cardLimit || '0'
                  ).toFixed(2)}`
                : `$${parseFloat(amount).toFixed(2)} has been sent to your ${paymentMethodName.toLowerCase()}.`}
            </Label>
            <div className="mt-4">
              <Button
                onClick={() => {
                  onClose();
                  setSuccess(false);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
