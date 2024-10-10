import React, { useState, useEffect } from 'react';
import { SelectProps } from '@types/select';
import { useTheme } from 'next-themes';

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  disabled,
  placeholder,
}) => {
  const { theme } = useTheme();
  const [selectedValue, setSelectedValue] = useState<string | number | null>(
    value || null,
  );

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor="select"
          className={`block mb-2 text-gray-700 dark:text-gray-300 font-bold ${
            theme === 'light' ? 'text-gray-800' : 'text-gray-200'
          }`}
        >
          {label}
        </label>
      )}
      <select
        id="select"
        value={selectedValue}
        onChange={handleChange}
        className={`appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}
        disabled={disabled}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div
        className={`absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none ${
          theme === 'light' ? 'text-gray-700' : 'text-gray-300'
        }`}
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};

export default Select;