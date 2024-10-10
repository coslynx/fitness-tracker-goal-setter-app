import React, { useState, useEffect } from 'react';
import { ModalProps } from '@types/modal';
import { useTheme } from 'next-themes';

const Modal: React.FC<ModalProps> = ({
  isOpen = false,
  onClose,
  title,
  children,
  className,
}) => {
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setShowModal(false);
    onClose && onClose();
  };

  if (!showModal) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 ${className}`}
    >
      <div
        className={`relative w-full max-w-lg mx-auto rounded-lg shadow-lg bg-white dark:bg-gray-800 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}
      >
        <div className="p-6 text-center">
          {title && (
            <h2
              className={`text-xl font-bold text-gray-900 dark:text-gray-200 mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-gray-200'}`}
            >
              {title}
            </h2>
          )}
          <div className="flex items-center justify-end mb-4">
            <button
              onClick={handleClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;