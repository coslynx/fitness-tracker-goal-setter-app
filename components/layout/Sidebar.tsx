import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useUser } from '@lib/hooks/useUser';
import { useRouter } from 'next/navigation';
import { useGoals } from '@lib/hooks/useGoals';
import { useProgress } from '@lib/hooks/useProgress';
import { useSettings } from '@lib/hooks/useSettings';
import { Link } from 'next/link';
import { ThemeContext } from '@context/ThemeContext';
import { useContext } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { data: session } = useSession();
  const { user } = useUser();
  const router = useRouter();
  const { data: goals, isLoading: goalsLoading, fetchGoals } = useGoals();
  const { data: progress, isLoading: progressLoading, fetchProgress } = useProgress();
  const { data: settings, isLoading: settingsLoading, fetchSettings } = useSettings();
  const { theme, setTheme } = useContext(ThemeContext);
  const [showUserSummary, setShowUserSummary] = useState(false);

  useEffect(() => {
    if (user && session) {
      fetchGoals();
      fetchProgress();
      fetchSettings();
    }
  }, [user, session, fetchGoals, fetchProgress, fetchSettings]);

  const toggleUserSummary = () => {
    setShowUserSummary(!showUserSummary);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex flex-col items-center w-64 transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 shadow-md ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col items-center justify-between min-h-screen w-full px-6 py-8">
        {/* App Logo */}
        <Link href="/" className="flex items-center mb-8">
          <img
            src="/logo.svg"
            alt="Fitness Tracker App Logo"
            className="h-12 w-12 rounded-full"
          />
          <span className="ml-4 font-bold text-xl text-gray-800 dark:text-gray-200">
            Fitness Tracker
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col items-start w-full">
          <ul className="flex flex-col items-start w-full space-y-4">
            <li>
              <Link
                href="/"
                className="flex items-center px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7-7-7"
                  />
                </svg>
                <span className="ml-2 font-medium">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/goals"
                className="flex items-center px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="ml-2 font-medium">Goals</span>
              </Link>
            </li>
            <li>
              <Link
                href="/progress"
                className="flex items-center px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="ml-2 font-medium">Progress</span>
              </Link>
            </li>
            <li>
              <Link
                href="/community"
                className="flex items-center px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="ml-2 font-medium">Community</span>
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.571 1.069 21.75 21.75 0 01-2.571 1.07 1.724 1.724 0 00-2.571 1.069c-1.756.426-1.756 2.924 0 3.35a1.724 1.724 0 001.069 2.571 21.75 21.75 0 011.07 2.571 1.724 1.724 0 001.069 2.571c.426 1.756 2.924 1.756 3.35 0a1.724 1.724 0 002.571-1.069 21.75 21.75 0 012.571-1.07 1.724 1.724 0 002.571-1.069c1.756-.426 1.756-2.924 0-3.35a1.724 1.724 0 00-1.069-2.571 21.75 21.75 0 01-1.07-2.571 1.724 1.724 0 00-1.069-2.571c-.426-1.756-2.924-1.756-3.35 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 12.001 9 9 0 0120.354 15.354z"
                  />
                </svg>
                <span className="ml-2 font-medium">Settings</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Summary Section */}
        {user && (
          <div className="flex flex-col items-center mt-8">
            <button
              onClick={toggleUserSummary}
              className="flex items-center px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src="/user-profile.png"
                alt="User Profile Avatar"
                className="h-10 w-10 rounded-full"
              />
              <span className="ml-4 font-medium">
                {user.name}
                {showUserSummary ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                )}
              </span>
            </button>

            {showUserSummary && (
              <div className="mt-4 space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Total Goals:</span>{' '}
                  {goals?.length || 0}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Progress Made:</span>{' '}
                  {progress?.length || 0} entries
                </p>
                {/* Add more user summary details as needed */}
              </div>
            )}
          </div>
        )}

        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="fixed bottom-4 left-4 px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 12.001 9 9 0 0120.354 15.354z"
            />
          </svg>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;