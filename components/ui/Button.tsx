import React, { useState } from "react";
import { ButtonProps } from "@types/button";
import { useTheme } from "next-themes";

/**
 * @file components/ui/Button.tsx
 * @author CosLynx
 * @description Implements a reusable button component for user interaction within the Fitness Tracker and Goal Setter App.
 * @version 1.0.0
 * @date 2023-10-27
 *
 * This component provides a standardized structure for creating buttons with different styles and functionalities.
 * It utilizes Tailwind CSS for styling and offers options for customization based on the button's purpose and context.
 *
 * The `Button` component is designed to be flexible and reusable, allowing for easy integration into various sections of the application.
 * It's built with accessibility in mind, ensuring that the button is usable by all users.
 *
 * @see https://tailwindcss.com/docs/buttons
 * @see https://www.w3.org/WAI/standards-guidelines/wcag/
 */

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  children,
  onClick,
  disabled = false,
  className,
  loading = false,
}) => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(loading);

  const handleClick = () => {
    if (disabled || isLoading) {
      return;
    }

    setIsLoading(true);
    onClick && onClick();
  };

  const buttonClasses = `inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ${
    theme === "light"
      ? variant === "primary"
        ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
        : variant === "secondary"
        ? "bg-gray-300 hover:bg-gray-400 text-gray-800 focus:ring-gray-300"
        : variant === "danger"
        ? "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
        : ""
      : variant === "primary"
      ? "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400"
      : variant === "secondary"
      ? "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500"
      : variant === "danger"
      ? "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400"
      : ""
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;