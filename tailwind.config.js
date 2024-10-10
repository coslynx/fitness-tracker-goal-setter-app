/**
 * @file tailwind.config.js
 * @author CosLynx
 * @description Configures Tailwind CSS for the Fitness Tracker and Goal Setter App.
 * @version 1.0.0
 * @date 2023-10-27
 * 
 * This file defines the Tailwind CSS configuration for the fitness tracker application,
 * ensuring visual consistency and rapid UI development.  
 * 
 * The configuration includes color palettes, font families, custom breakpoints, 
 * and other essential styles for creating a user-friendly and engaging interface. 
 * 
 * This configuration utilizes the Just-In-Time (JIT) mode for optimized CSS output.
 * 
 * @see https://tailwindcss.com/docs/configuration
 */

//  This import is required for defining the Tailwind CSS configuration.
//  It allows you to use the configuration API of Tailwind CSS, enabling customization.
//  The version used (3.4.13) is compatible with the existing project setup. 
import { defineConfig } from 'tailwindcss';

// This import is required for using the Just-In-Time (JIT) mode of Tailwind CSS.
// It enables Tailwind to generate only the CSS classes that are actually used, 
// resulting in a smaller CSS bundle size and improved performance. 
import { createGlobPatternsForPages } from 'next/dist/shared/lib/page-path/page-path'; 

//  This import is required for using the Autoprefixer plugin for Tailwind CSS.
//  It automatically adds vendor prefixes to CSS rules, ensuring compatibility with 
//  different browsers and devices. The version used (10.4.20) is compatible with the 
//  existing project setup. 
import autoprefixer from 'autoprefixer';

//  This import is required for using the PostCSS plugin for Tailwind CSS.
//  It provides a flexible way to extend the CSS capabilities of Tailwind CSS. The 
//  version used (8.4.47) is compatible with the existing project setup. 
import postcss from 'postcss';

// Define the main configuration object for Tailwind CSS.
// This object is used to customize Tailwind's default settings and add custom styles.
// This configuration includes:
// - content: specifies the files that Tailwind CSS should scan for custom CSS classes.
// - theme:  defines color palettes, font families, and other design elements.
// - plugins: allows for integrating additional Tailwind CSS plugins.
export default defineConfig({
  // This option specifies the files that Tailwind CSS should scan for custom CSS classes. 
  //  It includes pages and components directories, ensuring that all custom styles are 
  //  properly generated.
  // This configuration uses a function from Next.js to create glob patterns, ensuring 
  // that all pages and components are included in the scan. This approach is 
  // particularly useful for large and complex projects. 
  content: createGlobPatternsForPages(process.cwd(), './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'),

  // This option defines the color palettes, font families, and other design elements 
  // used in the application. It allows you to customize the appearance of the UI. 
  // The 'extend' property is used to add custom styles without overriding the default 
  // Tailwind configurations.
  theme: {
    //  This property allows extending the default Tailwind CSS theme by adding custom 
    //  styles. It's a flexible way to override or extend existing styles without 
    //  completely replacing the default theme. 
    extend: {
      // This property defines a custom color palette for the application.
      // It includes a primary color, which is a key color used throughout the UI. 
      // This palette ensures consistent and brand-specific colors in the application. 
      colors: {
        primary: '#007bff', //  Example:  Blue color 
      },

      //  This property allows for defining custom font families for the application.
      //  It specifies the fonts used for headings, body text, and other UI elements,
      //  creating a unique and consistent typography for the application.
      fontFamily: {
        //  Example:  San Francisco font family
        sans: ['"San Francisco"', 'sans-serif'],
      },

      //  This property allows for defining custom breakpoints for the application. 
      //  It specifies the screen sizes at which the application's layout and styling
      //  should change, creating responsive design for different devices. 
      screens: {
        // Example:  Adding a new breakpoint for large desktops 
        'xl-wide': '1440px', 
      },
    },
  },

  //  This option allows for integrating additional Tailwind CSS plugins. 
  //  Plugins provide extended functionality and customization options for Tailwind CSS. 
  //  This configuration includes a plugin for PostCSS, enabling more flexibility in 
  //  styling.
  //  
  //  Autoprefixer is used to automatically add vendor prefixes to CSS rules, ensuring 
  //  compatibility with different browsers and devices.
  plugins: [
    {
      postcss: postcss([
        autoprefixer,
      ]),
    },
  ],
});