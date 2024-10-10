import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { ProgressEntry } from '@types/progress';
import { Goal } from '@types/goal';
import { useUser } from '@lib/hooks/useUser';
import { useGoals } from '@lib/hooks/useGoals';
import { getProgressEntries } from '@services/progressService';
import { useSession } from 'next-auth/react';
import { Card } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { Modal } from '@components/ui/Modal';
import { useForm } from 'react-hook-form';
import { createProgressEntry, updateProgressEntry } from '@services/progressService';
import { useRouter } from 'next/navigation';

interface ProgressLogProps {
  goalId: number;
  progressEntries: ProgressEntry[];
  onCreateProgressEntry: (newEntry: ProgressEntry) => void;
  onUpdateProgressEntry: (updatedEntry: ProgressEntry) => void;
}

const ProgressLog: React.FC<ProgressLogProps> = ({
  goalId,
  progressEntries,
  onCreateProgressEntry,
  onUpdateProgressEntry,
}) => {
  const { user } = useUser();
  const { data: session } = useSession();
  const router = useRouter();
  const { theme } = useTheme();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProgressEntry>({
    defaultValues: {
      value: 0,
      date: new Date(),
      goalId,
    },
  });
  const [isCreatingEntry, setIsCreatingEntry] = useState(false);
  const [isEditingEntry, setIsEditingEntry] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleCreateEntry = async (newEntry: ProgressEntry) => {
    setIsCreatingEntry(true);
    try {
      await createProgressEntry(newEntry);
      onCreateProgressEntry(newEntry);
      setIsCreatingEntry(false);
    } catch (error) {
      console.error('Error creating progress entry:', error);
      setIsCreatingEntry(false);
    }
  };

  const handleUpdateEntry = async (updatedEntry: ProgressEntry) => {
    setIsEditingEntry(null);
    setShowModal(false);
    try {
      await updateProgressEntry(updatedEntry);
      onUpdateProgressEntry(updatedEntry);
    } catch (error) {
      console.error('Error updating progress entry:', error);
    }
  };

  const handleEditEntry = (entryId: number) => {
    const entry = progressEntries.find((entry) => entry.id === entryId);
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

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">Progress Log</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {progressEntries.map((entry: ProgressEntry) => (
          <li key={entry.id}>
            <Card
              title={`Progress: ${entry.value}`}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg"
            >
              <p className="text-gray-700 text-base mb-2">
                Date: {entry.date.toLocaleDateString()}
              </p>
              <div className="flex items-center justify-between">
                <Button variant="primary" onClick={() => handleEditEntry(entry.id)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteEntry(entry.id)}>
                  Delete
                </Button>
              </div>
            </Card>
          </li>
        ))}
      </ul>
      {/* Display the progress entry creation form */}
      {session && (
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
      )}
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
  );
};

export default ProgressLog;