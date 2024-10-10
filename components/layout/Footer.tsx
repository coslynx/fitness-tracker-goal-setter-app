import { useTheme } from 'next-themes';
import { Link } from 'next/link';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-4 text-center`}
    >
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; 2023 Fitness Tracker. All rights reserved.
        </p>
        <div className="mt-2 text-sm">
          <Link
            href="/terms"
            className="hover:underline"
          >
            Terms of Service
          </Link>{' '}
          |{' '}
          <Link
            href="/privacy"
            className="hover:underline"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;