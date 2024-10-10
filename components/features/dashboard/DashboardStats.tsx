import { useUser } from '@lib/hooks/useUser';
import { useGoals } from '@lib/hooks/useGoals';
import { useProgress } from '@lib/hooks/useProgress';
import { useSettings } from '@lib/hooks/useSettings';
import { Goal } from '@types/goal';
import { ProgressEntry } from '@types/progress';
import { User } from '@types/user';
import { Card } from '@components/ui/Card';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

interface DashboardStatsProps {
  goals: Goal[] | null;
  progress: ProgressEntry[] | null;
  settings: User | null;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ goals, progress, settings }) => {
  const { theme } = useTheme();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  const [totalGoals, setTotalGoals] = useState(0);
  const [completedGoals, setCompletedGoals] = useState(0);
  const [totalProgressEntries, setTotalProgressEntries] = useState(0);

  useEffect(() => {
    if (goals && progress) {
      setTotalGoals(goals.length);
      setCompletedGoals(goals.filter((goal) => goal.progress.length > 0).length);
      setTotalProgressEntries(progress.length);
      setIsLoading(false);
    }
  }, [goals, progress]);

  if (isLoading) {
    return (
      <Card title="Dashboard Stats" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg">
        <div className="spinner" />
      </Card>
    );
  }

  return (
    <Card title="Dashboard Stats" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-2">Total Goals</h2>
          <span className="text-3xl font-bold text-gray-700 dark:text-gray-300">{totalGoals}</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-2">Completed Goals</h2>
          <span className="text-3xl font-bold text-gray-700 dark:text-gray-300">{completedGoals}</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-2">Total Progress Entries</h2>
          <span className="text-3xl font-bold text-gray-700 dark:text-gray-300">{totalProgressEntries}</span>
        </div>
      </div>
    </Card>
  );
};

export default DashboardStats;