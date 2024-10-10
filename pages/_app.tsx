import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { Session } from 'next-auth/react/types';
import type { AppProps } from 'next/app';
import { useUser } from '@lib/hooks/useUser';
import { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: ${(props) => props.theme === 'light' ? '#f2f2f2' : '#121212'};
    color: ${(props) => props.theme === 'light' ? '#121212' : '#f2f2f2'};
    transition: background-color 0.3s, color 0.3s;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate a loading delay

    return () => clearTimeout(timeoutId);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* Render a loading spinner while the app is initializing. */}
        <div className="spinner" />
      </div>
    );
  }

  return (
    <>
      <GlobalStyle />
      <ThemeProvider attribute="class" defaultTheme="light">
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;