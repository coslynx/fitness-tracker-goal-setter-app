/**
 * @file next.config.js
 * @author CosLynx
 * @description Configures Next.js for the Fitness Tracker and Goal Setter App.
 * @version 1.0.0
 * @date 2023-10-27
 *
 * This file defines the Next.js configuration for the fitness tracker application,
 * ensuring optimal performance, deployment, and custom settings.
 *
 * It utilizes various libraries and configurations to enhance the development
 * and production environment, including:
 * - `reactStrictMode`: Enables strict mode for enhanced code quality and error detection.
 * - `swcMinify`: Optimizes build size and loading speed using SWC.
 * - `images`: Configures allowed domains for image loading, ensuring security and performance.
 * - `rewrites`: Defines custom routing rules, enabling server-side rendering and API routing.
 * - `webpack`: Customizes the Webpack configuration, allowing for fine-grained control over the build process.
 * - `experimental`: Enables experimental Next.js features, allowing for exploration of new capabilities.
 *
 * @see https://nextjs.org/docs/app/building-your-application/configuration
 */

// Import the necessary module for configuring Next.js.
// This module provides access to the Next.js configuration API,
// allowing for customization of various aspects of the application.
// The version used (14.2.15) is compatible with the existing project setup.
const nextConfig = {
  // Enables strict mode for enhanced code quality and error detection.
  // This option enforces best practices and helps identify potential issues
  // during development. The default value is false, but it's highly recommended
  // to enable it in production environments for a more robust application.
  reactStrictMode: true,

  // Optimizes build size and loading speed using SWC.
  // SWC is a high-performance JavaScript and TypeScript compiler that
  // significantly improves the build process and reduces bundle size,
  // resulting in faster loading times for the application. The default
  // value is false, but it's recommended to enable it for performance
  // optimization.
  swcMinify: true,

  // Configures allowed domains for image loading, ensuring security and performance.
  // This option specifies the domains from which images can be loaded,
  // preventing unauthorized image loading and potentially improving
  // performance through caching mechanisms. The `domains` array should
  // include the origins of the image sources, such as 'example.com'. 
  images: {
    domains: ['example.com'],
  },

  // Defines custom routing rules, enabling server-side rendering and API routing.
  // This option allows for customizing how URLs are handled in the application.
  // It enables features like server-side rendering for better SEO and performance,
  // and API routing for creating API endpoints within the application.
  rewrites() {
    return [
      // This rule rewrites all requests to `/api/*` to the corresponding API endpoints.
      // It allows for creating API routes within the application, enabling communication
      // between the frontend and backend.
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },

  // Customizes the Webpack configuration, allowing for fine-grained control over the build process.
  // This option provides a way to modify Webpack's configuration, enabling advanced
  // customization of the build process. It allows for optimizing the build, including
  // configuration for loaders, plugins, and other Webpack settings.
  webpack(config) {
    // Modify the Webpack configuration as needed. 
    // This example demonstrates adding a custom plugin. 
    config.plugins.push(new MyCustomPlugin()); 
    return config; 
  },

  // Enables experimental Next.js features, allowing for exploration of new capabilities.
  // This option provides access to experimental features that are not yet officially
  // released. Use this option with caution, as experimental features may change
  // or be removed in future releases.
  experimental: {
    // Enable features like the App Router or other experimental features here.
    appDir: true, // Enables the App Router for Next.js 14.
  },
};

// Export the Next.js configuration object. 
// This object contains the configuration settings for the application.
// It's used by Next.js to build and run the application.
module.exports = nextConfig;