'use client'

import React from 'react';
import { Shield, Globe, Clock } from 'lucide-react';

interface FooterCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FooterCard: React.FC<FooterCardProps> = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
    <div className="inline-flex p-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

export const FooterSection: React.FC = () => {
  const footer = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure Access',
      description: 'Bank-grade security protecting your virtual card details',
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Global Acceptance',
      description: 'Use your virtual card anywhere Mastercard is accepted',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Real-time Updates',
      description: 'Track transactions and balance updates instantly',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        {footer.map((feature, index) => (
          <FooterCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};
