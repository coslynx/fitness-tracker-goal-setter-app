import { useState, useEffect } from 'react';
import { useUser } from '@lib/hooks/useUser';
import { useGoals } from '@lib/hooks/useGoals';
import { getUserGoals, createGoal, updateGoal, deleteGoal } from '@services/goalService';
import { Goal } from '@types/goal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSettings } from '@lib/hooks/useSettings';
import { useTheme } from 'next-themes';
import { GoalForm } from '@components/features/goals/GoalForm';
import { GoalList } from '@components/features/goals/GoalList';
import { GoalCard } from '@components/features/goals/GoalCard';

const GoalsPage = () => {
  const { user } = useUser();
  const { data: session } = useSession();
  const router = useRouter();
  const { data: goals, isLoading: goalsLoading, fetchGoals } = useGoals();
  const { settings } = useSettings();
  const { theme, setTheme } = useTheme();
  const [isCreatingGoal, setIsCreatingGoal] = useState(false);

  useEffect(() => {
    if (user) {
      fetchGoals();
    }
  }, [user, fetchGoals]);

  const handleCreateGoal = async (newGoal: Goal) => {
    setIsCreatingGoal(true);
    try {
      await createGoal(newGoal);
      fetchGoals();
      setIsCreatingGoal(false);
    } catch (error) {
      console.error('Error creating goal:', error);
      setIsCreatingGoal(false);
    }
  };

  const handleUpdateGoal = async (updatedGoal: Goal) => {
    try {
      await updateGoal(updatedGoal);
      fetchGoals();
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const handleDeleteGoal = async (goalId: number) => {
    try {
      await deleteGoal(goalId);
      fetchGoals();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  if (goalsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Goals</h1>

      {/* Display a goal creation form if the user is logged in */}
      {session && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Create a New Goal</h2>
          <GoalForm onCreateGoal={handleCreateGoal} isCreatingGoal={isCreatingGoal} />
        </div>
      )}

      {/* Display a list of goals if there are any */}
      {goals && goals.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Goals</h2>
          <GoalList goals={goals} onUpdateGoal={handleUpdateGoal} onDeleteGoal={handleDeleteGoal} />
        </div>
      )}

      {/* Display a message if the user has no goals */}
      {goals && goals.length === 0 && (
        <div className="mb-8">
          <p className="text-gray-500">You have no goals yet. Create your first goal to get started.</p>
        </div>
      )}

      {/* Display the theme switcher */}
      <div className="mt-8">
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default GoalsPage;