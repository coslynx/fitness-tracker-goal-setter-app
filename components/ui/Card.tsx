import React from 'react';
import { CardProps } from '@types/card';
import { useTheme } from 'next-themes';

/**
 * @file components/ui/Card.tsx
 * @author CosLynx
 * @description Implements a reusable card component for displaying content blocks within the Fitness Tracker and Goal Setter App.
 * @version 1.0.0
 * @date 2023-10-27
 *
 * This component provides a standardized structure for displaying various types of content within the application.
 * It utilizes Tailwind CSS for styling and offers options for customization based on the content being displayed.
 *
 * The `Card` component is designed to be flexible and reusable, allowing for easy integration into different sections of the application.
 * It's built with accessibility in mind, ensuring that the content within the card is accessible to all users.
 *
 * @see https://tailwindcss.com/docs/cards
 * @see https://www.w3.org/WAI/standards-guidelines/wcag/
 */

const Card: React.FC<CardProps> = ({
  title,
  children,
  className,
  shadow = true,
  rounded = true,
  hoverable = true,
  clickable = false,
  onClick,
}) => {
  const { theme } = useTheme();
  const cardClasses = `bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md ${
    theme === 'light' ? 'bg-white' : 'bg-gray-800'
  } ${shadow ? 'shadow-md' : ''} ${rounded ? 'rounded-lg' : ''} ${
    hoverable ? 'hover:shadow-lg' : ''
  } ${className}`;

  return (
    <div
      className={cardClasses}
      onClick={clickable ? onClick : undefined}
      role={clickable ? 'button' : undefined}
    >
      {title && (
        <h2
          className={`text-xl font-bold text-gray-900 dark:text-gray-200 mb-4 ${
            theme === 'light' ? 'text-gray-900' : 'text-gray-200'
          }`}
        >
          {title}
        </h2>
      )}
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

export default Card;