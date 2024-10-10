import { useSession } from 'next-auth/react';
import { useUser } from '@lib/hooks/useUser';
import { Link } from 'next/link';
import { useState, useEffect } from 'react';
import { ThemeContext } from '@context/ThemeContext';
import { useContext } from 'react';

interface HeaderProps {
  isOpen: boolean;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ isOpen, onToggleSidebar }) => {
  const { data: session } = useSession();
  const { user } = useUser();
  const { theme, setTheme } = useContext(ThemeContext);

  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <Link href="/" className="flex items-center">
          <img
            src="/logo.svg"
            alt="Fitness Tracker Logo"
            className="h-8 w-8 rounded-full"
          />
          <span className="ml-2 font-bold text-xl text-gray-800 dark:text-gray-200">
            Fitness Tracker
          </span>
        </Link>
      </div>

      <div className="flex items-center">
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
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
        {session ? (
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            >
              <img
                src={user?.image ?? '/user-profile.png'}
                alt="User Profile Picture"
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">
                {user?.name}
              </span>
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-md">
                <ul className="py-2">
                  <li>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => session?.user?.id && session.user.id} // Replace with proper logout logic
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/auth/login"
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;