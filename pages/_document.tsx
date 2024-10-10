import { Html, Head, Main, NextScript } from 'next/document';
import { DefaultSeo } from 'next-seo';
import { useState } from 'react';
import { ThemeProvider } from 'next-themes';

const Document = () => {
  const [theme, setTheme] = useState('light');

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <DefaultSeo
          title="Fitness Tracker and Goal Setter App"
          description="Track your fitness progress, set goals, and connect with a community."
          openGraph={{
            type: 'website',
            locale: 'en_US',
            url: 'https://your-app-url.com',
            site_name: 'Fitness Tracker and Goal Setter App',
            description: 'Track your fitness progress, set goals, and connect with a community.',
            images: [
              {
                url: 'https://your-app-url.com/og-image.jpg',
                alt: 'Fitness Tracker and Goal Setter App Logo',
              },
            ],
          }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles/globals.css" />
      </Head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" onChange={handleThemeChange}>
          <Main />
        </ThemeProvider>
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;