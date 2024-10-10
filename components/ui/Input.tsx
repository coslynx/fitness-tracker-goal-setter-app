import React, { useState, useEffect, ChangeEvent } from 'react';
import { InputProps } from '@types/input';
import { useTheme } from 'next-themes';

const Input: React.FC<InputProps> = ({
  type = 'text',
  value = '',
  onChange,
  label,
  placeholder,
  disabled,
  required,
  error,
  className,
}) => {
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label
          htmlFor="input"
          className={`block mb-2 text-gray-700 dark:text-gray-300 font-bold ${
            theme === 'light' ? 'text-gray-800' : 'text-gray-200'
          }`}
        >
          {label}
        </label>
      )}
      <input
        id="input"
        type={type}
        value={inputValue}
        onChange={handleChange}
        className={`appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />
      {error && (
        <span className="text-red-500 text-sm mt-1">{error}</span>
      )}
    </div>
  );
};

export default Input;