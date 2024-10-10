import { useState, useEffect } from 'react';
import { useUser } from '@lib/hooks/useUser';
import { Goal } from '@types/goal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSettings } from '@lib/hooks/useSettings';
import { useTheme } from 'next-themes';
import { getUserGoals, createGoal, updateGoal, deleteGoal } from '@services/goalService';

/**
 * @file lib/hooks/useGoals.ts
 * @author CosLynx
 * @description Implements a custom React hook for managing user goals within the Fitness Tracker and Goal Setter App.
 * @version 1.0.0
 * @date 2023-10-27
 * 
 * This hook provides centralized logic for fetching, creating, updating, and deleting user goals. It interacts with the `goalService`
 * for API requests and leverages `zustand` for state management. The hook is designed to be reusable and efficient, simplifying
 * goal management within the application.
 * 
 * @see https://reactjs.org/docs/hooks-intro.html
 * @see https://www.w3.org/WAI/standards-guidelines/wcag/
 */

export const useGoals = () => {
  const { user } = useUser();
  const { data: session } = useSession();
  const router = useRouter();
  const { settings } = useSettings();
  const { theme, setTheme } = useTheme();
  const [goals, setGoals] = useState<Goal[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * @description Fetches all goals for the current user.
   * 
   * This function retrieves all goals associated with the logged-in user from the backend API. 
   * 
   * @returns {Promise<void>} - A Promise resolving when the goals have been fetched.
   */
  const fetchGoals = async () => {
    if (user) {
      setIsLoading(true);
      try {
        const response = await getUserGoals();
        setGoals(response.data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchGoals();
    }
  }, [user, fetchGoals]);

  /**
   * @description Creates a new goal for the current user.
   * 
   * This function sends a request to the backend API to create a new goal based on the provided goal data.
   * 
   * @param {Goal} newGoal - The goal data to be created.
   * @returns {Promise<void>} - A Promise resolving when the goal has been created.
   */
  const createGoal = async (newGoal: Goal) => {
    try {
      const response = await createGoal(newGoal);
      setGoals([...goals, response.data]);
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  /**
   * @description Updates an existing goal for the current user.
   * 
   * This function sends a request to the backend API to update an existing goal with the provided updated data.
   * 
   * @param {Goal} updatedGoal - The updated goal data.
   * @returns {Promise<void>} - A Promise resolving when the goal has been updated.
   */
  const updateGoal = async (updatedGoal: Goal) => {
    try {
      const response = await updateGoal(updatedGoal);
      setGoals(goals?.map((goal) => (goal.id === response.data.id ? response.data : goal)));
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  /**
   * @description Deletes a goal by its ID.
   * 
   * This function sends a request to the backend API to delete a goal based on the provided goal ID.
   * 
   * @param {number} goalId - The ID of the goal to be deleted.
   * @returns {Promise<void>} - A Promise resolving when the goal has been deleted.
   */
  const deleteGoal = async (goalId: number) => {
    try {
      await deleteGoal(goalId);
      setGoals(goals?.filter((goal) => goal.id !== goalId));
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  return {
    data: goals,
    isLoading,
    fetchGoals,
    createGoal,
    updateGoal,
    deleteGoal,
  };
};