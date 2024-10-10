import { useState, useEffect } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useUser } from '@lib/hooks/useUser';
import { useGoals } from '@lib/hooks/useGoals';
import { useProgress } from '@lib/hooks/useProgress';
import { useSettings } from '@lib/hooks/useSettings';
import { getUserGoals } from '@services/goalService';
import { getUserProgress } from '@services/progressService';
import { getUserSettings } from '@services/userService';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import Sidebar from '@components/layout/Sidebar';
import { ThemeProvider } from 'next-themes';
import { ThemeContext } from '@context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { user } = useUser();
  const { data: session } = useSession();
  const { data: goals, isLoading: goalsLoading, fetchGoals } = useGoals();
  const { data: progress, isLoading: progressLoading, fetchProgress } = useProgress();
  const { data: settings, isLoading: settingsLoading, fetchSettings } = useSettings();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const fetchUser = async () => {
      if (user && session) {
        fetchGoals();
        fetchProgress();
        fetchSettings();
      }
    };

    fetchUser();
  }, [user, session, fetchGoals, fetchProgress, fetchSettings]);

  if (goalsLoading || progressLoading || settingsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <SessionProvider session={session}>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1 w-0 overflow-hidden">
              <Header />
              <main className="flex flex-1 overflow-auto bg-gray-100 dark:bg-gray-800">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </SessionProvider>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export default Layout;