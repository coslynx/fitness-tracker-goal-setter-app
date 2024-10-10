import { useUser } from '@lib/hooks/useUser';
import { useGoals } from '@lib/hooks/useGoals';
import { useProgress } from '@lib/hooks/useProgress';
import { useSettings } from '@lib/hooks/useSettings';
import { getUserGoals } from '@services/goalService';
import { getUserProgress } from '@services/progressService';
import { getUserSettings } from '@services/userService';
import { DashboardStats } from '@components/features/dashboard/DashboardStats';
import { RecentActivity } from '@components/features/dashboard/RecentActivity';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const DashboardPage = () => {
  const { user } = useUser();
  const { data: goals, isLoading: goalsLoading, fetchGoals } = useGoals();
  const { data: progress, isLoading: progressLoading, fetchProgress } = useProgress();
  const { data: settings, isLoading: settingsLoading, fetchSettings } = useSettings();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (user) {
      fetchGoals();
      fetchProgress();
      fetchSettings();
    }
  }, [user, fetchGoals, fetchProgress, fetchSettings]);

  if (goalsLoading || progressLoading || settingsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardStats goals={goals} progress={progress} settings={settings} />
        <RecentActivity goals={goals} progress={progress} />
        {/* Add more dashboard components here */}
      </div>

      <div className="mt-8">
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;