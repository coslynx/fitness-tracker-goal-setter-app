import { createTheme } from '@mui/material/styles';

// Theme customization based on user preferences
const theme = createTheme({
  palette: {
    mode: 'light', // Use dark mode if user prefers dark theme, otherwise light theme
    primary: {
      main: '#007bff', // Primary color
    },
    secondary: {
      main: '#673AB7', // Secondary color
    },
    error: {
      main: '#f44336', // Error color
    },
    background: {
      default: '#f5f5f5', // Default background color
      paper: '#fff', // Paper background color
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ],
    fontSize: 16, // Default font size
  },
  // Add more custom styles based on the MVP's design system
});

export default theme;