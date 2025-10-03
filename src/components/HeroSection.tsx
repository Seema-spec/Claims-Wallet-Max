import React from "react";
import { Label } from "./common/Label";
import { Button } from "./common/Button";


interface HeroSectionProps {
  onRefresh: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onRefresh }) => {
  return (
    <div className="max-w-4xl mx-auto text-center mb-14">
      <div className="mb-8 flex justify-center">
        <img
          src="/Juice-2024-Logo-2000x800.png"
          alt="Juice Financial"
          className="h-16"
        />
      </div>
      <Label
        as="h1"
        className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
      >
        Claims Wallet Max
      </Label>
      <Label className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        Access your funds instantly and choose how you want to receive your payment. Enhanced features with maximum flexibility.
      </Label>

      <div className="mt-6 flex justify-center">
        <Button onClick={onRefresh} className="mr-2">
          Refresh Wallet
        </Button>
        <Button variant="ghost">Help</Button>
      </div>
    </div>
  );
};

export default HeroSection;