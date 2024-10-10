import React, { useState, useEffect } from 'react';
import { useUser } from '@lib/hooks/useUser';
import { useGoals } from '@lib/hooks/useGoals';
import { useProgress } from '@lib/hooks/useProgress';
import { getUserGoals } from '@services/goalService';
import { getUserProgress } from '@services/progressService';
import { User } from '@types/user';
import { Goal } from '@types/goal';
import { ProgressEntry } from '@types/progress';
import { useTheme } from 'next-themes';
import { Card } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { Modal } from '@components/ui/Modal';
import { useForm } from 'react-hook-form';
import { createProgressEntry, updateProgressEntry } from '@services/progressService';
import { useRouter } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const { data: goals, isLoading: goalsLoading, fetchGoals } = useGoals();
  const { data: progress, isLoading: progressLoading, fetchProgress } = useProgress();

  useEffect(() => {
    if (user) {
      fetchGoals();
      fetchProgress();
    }
  }, [user, fetchGoals, fetchProgress]);

  if (goalsLoading || progressLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner" />
      </div>
    );
  }

  const handleCreateProgressEntry = async (newEntry: ProgressEntry) => {
    try {
      const response = await createProgressEntry(newEntry);
      // Update progress state or trigger a refresh
      fetchProgress();
    } catch (error) {
      console.error('Error creating progress entry:', error);
    }
  };

  const handleUpdateEntry = async (updatedEntry: ProgressEntry) => {
    try {
      await updateProgressEntry(updatedEntry);
      // Update progress state or trigger a refresh
      fetchProgress();
    } catch (error) {
      console.error('Error updating progress entry:', error);
    }
  };

  const handleEditEntry = (entryId: number) => {
    const entry = progress.find((entry) => entry.id === entryId);
    if (entry) {
      reset({
        value: entry.value,
        date: entry.date,
        goalId: entry.goalId,
      });
      setIsEditingEntry(entryId);
      setShowModal(true);
    }
  };

  const handleDeleteEntry = async (entryId: number) => {
    if (confirm('Are you sure you want to delete this progress entry?')) {
      try {
        // Implement logic to delete the entry from the backend API
        // Update progressEntries state
      } catch (error) {
        console.error('Error deleting progress entry:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsEditingEntry(null);
    setShowModal(false);
  };

  const data = {
    labels: progress.map((entry) => entry.date.toLocaleDateString()),
    datasets: [
      {
        label: 'Progress',
        data: progress.map((entry) => entry.value),
        fill: false,
        borderColor: theme === 'light' ? '#333' : '#fff',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProgressEntry>({
    defaultValues: {
      value: 0,
      date: new Date(),
      goalId: 1, // Default goal ID, should be dynamically set
    },
  });

  const [isCreatingEntry, setIsCreatingEntry] = useState(false);
  const [isEditingEntry, setIsEditingEntry] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">User Profile: {user.name}</h1>

      <Card title="User Details" className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center">
            <img
              src={user.image ?? '/user-profile.png'}
              alt="User Profile Picture"
              className="h-24 w-24 rounded-full"
            />
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mt-2">
              {user.name}
            </h2>
            <p className="text-gray-700 text-base mt-1">{user.email}</p>
          </div>
          <div className="flex flex-col items-start justify-center">
            {/* Display user settings link */}
            <Link
              href="/settings"
              className="text-blue-500 hover:text-blue-700 font-medium cursor-pointer mt-4"
            >
              Edit Profile Settings
            </Link>
          </div>
        </div>
      </Card>

      {/* Display goals for the current user */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4">Goals</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal: Goal) => (
            <li key={goal.id}>
              <Card title={goal.title} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg">
                <p className="text-gray-700 text-base mb-2">{goal.description}</p>
                {/* Display goal progress */}}
              </Card>
            </li>
          ))}
        </ul>
      </div>

      {/* Display progress data for the user */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4">Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-4">Progress Chart</h2>
            {/* Render the progress chart based on user's progressEntries */}
            <div className="h-64 w-full">
              <Line data={data} options={options} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Progress Log</h2>
            {/* Render the progress log based on user's progressEntries */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {progress.map((entry: ProgressEntry) => (
                <li key={entry.id}>
                  <Card
                    title={`Progress: ${entry.value}`}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg"
                  >
                    <p className="text-gray-700 text-base mb-2">
                      Date: {entry.date.toLocaleDateString()}
                    </p>
                    {/* Display edit/delete buttons for each progress entry */}
                  </Card>
                </li>
              ))}
            </ul>
            {/* Display the progress entry creation form */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Log New Progress</h2>
              <form onSubmit={handleSubmit(handleCreateEntry)} className="flex flex-col gap-4">
                <Input
                  type="number"
                  label="Progress Value"
                  placeholder="Enter progress value"
                  {...register('value', { required: 'Progress value is required' })}
                  error={errors.value?.message}
                />
                <Input
                  type="date"
                  label="Date"
                  placeholder="Select date"
                  {...register('date', { required: 'Date is required' })}
                  error={errors.date?.message}
                />
                <Button type="submit" loading={isCreatingEntry}>
                  Log Progress
                </Button>
              </form>
            </div>
            {/* Display the modal for editing a progress entry */}
            <Modal isOpen={showModal} onClose={handleCloseModal} title="Edit Progress Entry">
              <form onSubmit={handleSubmit(handleUpdateEntry)} className="flex flex-col gap-4">
                <Input
                  type="number"
                  label="Progress Value"
                  placeholder="Enter progress value"
                  {...register('value', { required: 'Progress value is required' })}
                  error={errors.value?.message}
                />
                <Input
                  type="date"
                  label="Date"
                  placeholder="Select date"
                  {...register('date', { required: 'Date is required' })}
                  error={errors.date?.message}
                />
                <Button type="submit" loading={isCreatingEntry}>
                  Save Changes
                </Button>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;