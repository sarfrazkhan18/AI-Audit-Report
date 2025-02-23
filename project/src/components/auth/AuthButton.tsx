import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { SocialProvider } from '../../utils/auth/authProviders';

interface AuthButtonProps {
  provider: SocialProvider;
  icon: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  provider,
  icon: Icon,
  onClick,
  disabled
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Icon className="w-5 h-5" />
    </motion.button>
  );
};