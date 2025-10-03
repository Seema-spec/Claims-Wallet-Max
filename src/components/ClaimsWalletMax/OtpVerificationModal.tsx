'use client'

import React, { useState, useEffect } from 'react';
import { KeyRound, X } from 'lucide-react';
import { Label } from '../common/Label';
import { Button } from '../common/Button';

interface OTPVerificationModalProps {
  open: boolean;
  onClose: () => void;
  onVerified?: () => void;
}

export const OTPVerificationModal: React.FC<OTPVerificationModalProps> = ({ open, onClose, onVerified }) => {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    if (!open) {
      setOtp('');
      setOtpError('');
      setAcceptedTerms(false);
    }
  }, [open]);

  const verify = () => {
    if (otp.length !== 6) {
      setOtpError('Please enter a 6-digit code');
      return;
    }
    if (otp === '123456') {
      onVerified?.();
      onClose?.();
    } else {
      setOtpError('Invalid code');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <KeyRound className="h-6 w-6 text-blue-600" />
            <Label as="h3" className="text-lg font-bold">Verify Identity</Label>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <X className="h-5 w-5" />
          </button>
        </div>

        <Label className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Enter the 6-digit verification code sent to your phone.
        </Label>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="Enter code"
          className="w-full text-center px-4 py-2 text-2xl tracking-wider rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 mb-2"
        />
        {otpError && <div className="text-sm text-red-600 dark:text-red-400 mb-2">{otpError}</div>}

        <div className="flex items-center gap-2 mb-4">
          <input
            id="terms-debug"
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="terms-debug" className="text-sm text-gray-600 dark:text-gray-400">
            I accept the Cardholder Terms (non-production test checkbox)
          </label>
        </div>

        <div className="flex gap-2">
          <Button onClick={verify} disabled={!acceptedTerms} className={`${!acceptedTerms ? 'opacity-60 cursor-not-allowed' : ''}`}>Verify</Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};