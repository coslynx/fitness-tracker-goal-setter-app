import React from 'react';
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
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

interface ProgressChartProps {
  goalId: number;
  progressEntries: ProgressEntry[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ goalId, progressEntries }) => {
  const { theme } = useTheme();
  const data = {
    labels: progressEntries.map((entry) => entry.date.toLocaleDateString()),
    datasets: [
      {
        label: 'Progress',
        data: progressEntries.map((entry) => entry.value),
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

  return (
    <div className="h-64 w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default ProgressChart;