import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', color = 'gray' }) => {
  const spinnerClasses = `animate-spin rounded-full h-${
    size === 'small' ? 4 : size === 'medium' ? 8 : 12
  } w-${size === 'small' ? 4 : size === 'medium' ? 8 : 12} border-4 border-t-transparent border-${color}-500`;

  return (
    <div className={spinnerClasses} />
  );
};

export default Spinner;