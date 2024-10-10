import React from 'react';
import { Goal } from '@types/goal';
import { useTheme } from 'next-themes';
import { Button } from '@components/ui/Button';
import { Modal } from '@components/ui/Modal';
import { GoalForm } from '@components/features/goals/GoalForm';
import { useGoals } from '@lib/hooks/useGoals';
import { deleteGoal } from '@services/goalService';
import { updateGoal } from '@services/goalService';
import { useState } from 'react';

interface GoalCardProps extends Goal {
  onUpdateGoal: (goal: Goal) => void;
  onDeleteGoal: (goalId: number) => void;
  onEditGoal: () => void;
}

const GoalCard: React.FC<GoalCardProps> = ({
  id,
  title,
  description,
  userId,
  progress,
  onUpdateGoal,
  onDeleteGoal,
  onEditGoal,
}) => {
  const { theme } = useTheme();
  const { data: goals, isLoading: goalsLoading, fetchGoals } = useGoals();
  const [showModal, setShowModal] = useState(false);

  const handleEditGoal = () => {
    onEditGoal();
  };

  const handleDeleteGoal = async () => {
    if (confirm(`Are you sure you want to delete the goal "${title}"?`)) {
      try {
        await deleteGoal(id);
        fetchGoals();
      } catch (error) {
        console.error('Error deleting goal:', error);
      }
    }
  };

  const handleUpdateGoal = async (updatedGoal: Goal) => {
    try {
      await updateGoal(updatedGoal);
      onUpdateGoal(updatedGoal);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg ${
        theme === 'light' ? 'bg-white' : 'bg-gray-800'
      }`}
    >
      <h2 className={`text-xl font-bold text-gray-900 dark:text-gray-200 mb-2`}>
        {title}
      </h2>
      <p className={`text-gray-700 text-base mb-2`}>{description}</p>
      <div className="flex items-center justify-between">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {progress}%
        </span>
        <div className="flex items-center">
          <Button variant="primary" onClick={handleEditGoal}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleDeleteGoal}>
            Delete
          </Button>
        </div>
      </div>
      <Modal isOpen={showModal} onClose={handleCloseModal} title="Edit Goal">
        <GoalForm goal={goals?.find((g) => g.id === id)} onUpdateGoal={handleUpdateGoal} onClose={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default GoalCard;