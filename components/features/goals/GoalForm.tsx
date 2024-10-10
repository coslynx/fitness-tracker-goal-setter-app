import React, { useState, useEffect } from 'react';
import { useGoals } from '@lib/hooks/useGoals';
import { Goal } from '@types/goal';
import { useUser } from '@lib/hooks/useUser';
import { useTheme } from 'next-themes';
import { GoalFormProps } from '@types/goalForm';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { useForm } from 'react-hook-form';
import { createGoal } from '@services/goalService';
import { Modal } from '@components/ui/Modal';

/**
 * @file components/features/goals/GoalForm.tsx
 * @author CosLynx
 * @description Implements a form for creating new goals within the Fitness Tracker and Goal Setter App.
 * @version 1.0.0
 * @date 2023-10-27
 *
 * This component provides a structured form for users to define new fitness goals. It utilizes React for UI interaction,
 * Tailwind CSS for styling, and handles form submission to the backend API. The component interacts with the
 * `useGoals` hook for managing goal state and the `createGoal` service for creating new goals.
 *
 * The `GoalForm` is designed to be user-friendly and integrates seamlessly with the MVP's goal management flow.
 * It features input validation to ensure data quality and robust error handling to manage potential failures.
 *
 * @see https://reactjs.org/docs/forms.html
 * @see https://tailwindcss.com/docs/forms
 * @see https://www.w3.org/WAI/standards-guidelines/wcag/
 */

const GoalForm: React.FC<GoalFormProps> = ({ onCreateGoal, onClose, goal }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Goal>({
    defaultValues: goal || {
      title: '',
      description: '',
      userId: 1,
      progress: [],
    },
  });
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (goal) {
      reset({
        title: goal.title,
        description: goal.description,
        userId: goal.userId,
      });
    }
  }, [goal, reset]);

  const onSubmit = async (data: Goal) => {
    setIsSubmitting(true);
    try {
      const response = await createGoal(data);
      onCreateGoal && onCreateGoal(response.data);
      onClose && onClose();
    } catch (error) {
      console.error('Error creating goal:', error);
      // Handle error appropriately, display an error message or log the error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">
        {goal ? 'Edit Goal' : 'Create a New Goal'}
      </h2>
      <Input
        type="text"
        label="Title"
        placeholder="Enter goal title"
        {...register('title', { required: 'Title is required' })}
        error={errors.title?.message}
      />
      <Input
        type="text"
        label="Description"
        placeholder="Enter goal description"
        {...register('description', { required: 'Description is required' })}
        error={errors.description?.message}
      />
      <Button type="submit" loading={isSubmitting}>
        {goal ? 'Save Goal' : 'Create Goal'}
      </Button>
    </form>
  );
};

export default GoalForm;