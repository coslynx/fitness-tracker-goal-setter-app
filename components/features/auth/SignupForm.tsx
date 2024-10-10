import React, { useState, useEffect } from 'react';
import { useUser } from '@lib/hooks/useUser';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { SignupFormProps } from '@types/signupForm';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { createUser } from '@services/userService';

/**
 * @file components/features/auth/SignupForm.tsx
 * @author CosLynx
 * @description Implements the signup form for new user registration within the Fitness Tracker and Goal Setter App.
 * @version 1.0.0
 * @date 2023-10-27
 *
 * This component provides a structured form for users to create new accounts. It utilizes React for UI interaction,
 * Tailwind CSS for styling, and handles form submission to the backend API. The component interacts with the
 * `useUser` hook for authentication state management and the `createUser` service for user creation.
 *
 * The `SignupForm` is designed to be user-friendly and integrates seamlessly with the MVP's authentication flow.
 * It features input validation to ensure data quality and robust error handling to manage potential failures.
 *
 * @see https://reactjs.org/docs/forms.html
 * @see https://tailwindcss.com/docs/forms
 * @see https://www.w3.org/WAI/standards-guidelines/wcag/
 */

const SignupForm: React.FC<SignupFormProps> = ({ onClose }) => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user, login } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      onClose && onClose();
    }
  }, [user, onClose]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await createUser(data);
      login(response.data);
      onClose && onClose();
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error appropriately, display an error message or log the error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
      <Input
        type="email"
        label="Email"
        placeholder="john.doe@example.com"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address',
          },
        })}
        error={errors.email?.message}
      />
      <Input
        type="password"
        label="Password"
        placeholder="Password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
          },
        })}
        error={errors.password?.message}
      />
      <Button type="submit" loading={isSubmitting}>
        Create Account
      </Button>
      {/* Add other signup fields as needed */}
    </form>
  );
};

export default SignupForm;