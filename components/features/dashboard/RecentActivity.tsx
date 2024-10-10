import React from 'react';
import { useUser } from '@lib/hooks/useUser';
import { useGoals } from '@lib/hooks/useGoals';
import { useProgress } from '@lib/hooks/useProgress';
import { useTheme } from 'next-themes';
import { Goal } from '@types/goal';
import { ProgressEntry } from '@types/progress';
import { Card } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { Modal } from '@components/ui/Modal';
import { useForm } from 'react-hook-form';
import { createProgressEntry, updateProgressEntry } from '@services/progressService';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface RecentActivityProps {
  goals: Goal[];
  progress: ProgressEntry[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ goals, progress }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const [isCreatingEntry, setIsCreatingEntry] = useState(false);
  const [isEditingEntry, setIsEditingEntry] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProgressEntry>({
    defaultValues: {
      value: 0,
      date: new Date(),
      goalId: 1, // Default goal ID, should be dynamically set
    },
  });

  const handleCreateEntry = async (newEntry: ProgressEntry) => {
    setIsCreatingEntry(true);
    try {
      await createProgressEntry(newEntry);
      // Update progress state or trigger a refresh
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
      // Update progress state or trigger a refresh
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

  return (
    <Card title="Recent Activity" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Logic to determine and display recent activity items: */}
        {/*  - New goals created by the user */}
        {/*  - Recent progress updates for any goal */}
        {/*  - Potentially, recent interactions (likes, comments) within the community */}
        {progress.slice(0, 3).map((entry: ProgressEntry) => (
          <li key={entry.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg">
            <p className="text-gray-700 text-base mb-2">
              Progress: {entry.value}
            </p>
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
    </Card>
  );
};

export default RecentActivity;