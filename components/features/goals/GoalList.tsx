import { useState, useEffect } from 'react';
import { useGoals } from '@lib/hooks/useGoals';
import { Goal } from '@types/goal';
import { useUser } from '@lib/hooks/useUser';
import { useTheme } from 'next-themes';
import { GoalCard } from '@components/features/goals/GoalCard';
import { useRouter } from 'next/navigation';
import { deleteGoal } from '@services/goalService';
import { updateGoal } from '@services/goalService';
import { Modal } from '@components/ui/Modal';
import { GoalForm } from '@components/features/goals/GoalForm';

interface GoalListProps {
  onUpdateGoal: (goal: Goal) => void;
  onDeleteGoal: (goalId: number) => void;
}

const GoalList: React.FC<GoalListProps> = ({ onUpdateGoal, onDeleteGoal }) => {
  const { user } = useUser();
  const { data: goals, isLoading: goalsLoading, fetchGoals } = useGoals();
  const router = useRouter();
  const { theme } = useTheme();
  const [isEditingGoal, setIsEditingGoal] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user) {
      fetchGoals();
    }
  }, [user, fetchGoals]);

  const handleEditGoal = (goalId: number) => {
    setIsEditingGoal(goalId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setIsEditingGoal(null);
    setShowModal(false);
  };

  if (goalsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals &&
          goals.map((goal: Goal) => (
            <li key={goal.id}>
              <GoalCard
                goal={goal}
                onUpdateGoal={onUpdateGoal}
                onDeleteGoal={onDeleteGoal}
                onEditGoal={() => handleEditGoal(goal.id)}
              />
            </li>
          ))}
      </ul>

      <Modal isOpen={showModal} onClose={handleCloseModal} title="Edit Goal">
        {isEditingGoal && (
          <GoalForm
            goal={goals?.find((g: Goal) => g.id === isEditingGoal)}
            onUpdateGoal={onUpdateGoal}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default GoalList;