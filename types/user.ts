import { User } from '@types/user';

/**
 * @file types/user.ts
 * @author CosLynx
 * @description Defines the user data type for the Fitness Tracker and Goal Setter App.
 * @version 1.0.0
 * @date 2023-10-27
 * 
 * This file defines the TypeScript interface for the `User` object. It serves as the foundation for representing 
 * user information throughout the application. The `User` interface includes properties like `id`, `name`, `email`, 
 * `password`, `createdAt`, `updatedAt`, `goals`, and `progress`, reflecting essential user data for the MVP.
 * 
 * This interface is utilized within various components, services, and API routes to ensure type safety and 
 * consistent data handling across the application. The `User` interface is designed to be extensible, accommodating 
 * potential additions of user data properties in future iterations of the MVP. 
 * 
 * @see https://www.typescriptlang.org/docs/handbook/interfaces.html
 */

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  goals?: Goal[];
  progress?: ProgressEntry[];
  subscriptionId?: string;
  // Add more user data properties here as needed
}

export interface Goal {
  id: number;
  title: string;
  description: string;
  userId: number;
  target: number;
  deadline: Date;
  progress: ProgressEntry[];
  // Add more goal data properties here as needed
}

export interface ProgressEntry {
  id: number;
  value: number;
  date: Date;
  goalId: number;
  // Add more progress data properties here as needed
}

// ... other types as needed