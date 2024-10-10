import { useState, useEffect } from 'react';
import { useUser } from '@lib/hooks/useUser';
import { useGoals } from '@lib/hooks/useGoals';
import { getUserGoals } from '@services/goalService';
import { getProgressEntries, createProgressEntry, updateProgressEntry } from '@services/progressService';
import { ProgressEntry } from '@types/progress';
import { Goal } from '@types/goal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSettings } from '@lib/hooks/useSettings';
import { useTheme } from 'next-themes';
import { ProgressChart } from '@components/features/progress/ProgressChart';
import { ProgressLog } from '@components/features/progress/ProgressLog';

const ProgressPage = () => {
  const { user } = useUser();
  const { data: session } = useSession();
  const router = useRouter();
  const { data: goals, isLoading: goalsLoading } = useGoals();
  const { settings } = useSettings();
  const { theme, setTheme } = useTheme();
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);

  useEffect(() => {
    const fetchProgressEntries = async () => {
      try {
        const entries = await getProgressEntries();
        setProgressEntries(entries);
      } catch (error) {
        console.error('Error fetching progress entries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgressEntries();
  }, []);

  const handleCreateProgressEntry = async (newEntry: ProgressEntry) => {
    try {
      const response = await createProgressEntry(newEntry);
      setProgressEntries([response.data, ...progressEntries]);
    } catch (error) {
      console.error('Error creating progress entry:', error);
    }
  };

  const handleUpdateProgressEntry = async (updatedEntry: ProgressEntry) => {
    try {
      const response = await updateProgressEntry(updatedEntry);
      setProgressEntries(progressEntries.map((entry) => (entry.id === response.data.id ? response.data : entry)));
    } catch (error) {
      console.error('Error updating progress entry:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Progress</h1>

      {/* Display a list of goals to choose from */}
      {goals && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Select a Goal</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.map((goal: Goal) => (
              <li
                key={goal.id}
                className={`bg-white rounded-lg shadow-md p-4 cursor-pointer ${selectedGoalId === goal.id ? 'bg-gray-100' : ''}`}
                onClick={() => setSelectedGoalId(goal.id)}
              >
                <h3 className="text-gray-900 font-bold text-xl mb-2">{goal.title}</h3>
                <p className="text-gray-700 text-base mb-2">{goal.description}</p>
                {/* Display progress percentage based on goal.id */}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display progress chart and log for selected goal */}
      {selectedGoalId && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-4">Progress Chart</h2>
            {/* Render the progress chart based on selectedGoalId and progressEntries */}
            <ProgressChart goalId={selectedGoalId} progressEntries={progressEntries} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Progress Log</h2>
            {/* Render the progress log based on selectedGoalId and progressEntries */}
            <ProgressLog
              goalId={selectedGoalId}
              progressEntries={progressEntries}
              onCreateProgressEntry={handleCreateProgressEntry}
              onUpdateProgressEntry={handleUpdateProgressEntry}
            />
          </div>
        </div>
      )}

      {/* Display the theme switcher */}\n      <div className=\"mt-8\">\n        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>\n          Toggle Theme\n        </button>\n      </div>\n    </div>\n  );\n};\n\nexport default ProgressPage;