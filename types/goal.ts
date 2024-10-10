import { Goal } from '@types/goal';
import { ProgressEntry } from '@types/progress';
import { User } from '@types/user';

/**
 * @file types/goal.ts
 * @author CosLynx
 * @description Defines the Goal interface for the Fitness Tracker and Goal Setter App.
 * @version 1.0.0
 * @date 2023-10-27
 * 
 * This file defines the TypeScript interface for the `Goal` object. It serves as the foundation for representing 
 * goal data within the application. The `Goal` interface includes properties like `id`, `title`, `description`, 
 * `userId`, `target`, `deadline`, and `progress`, reflecting essential data points for managing user goals.
 * 
 * This interface is utilized within various components, services, and API routes to ensure type safety and 
 * consistent data handling across the application. The `Goal` interface is designed to be extensible, accommodating 
 * potential additions of goal data properties in future iterations of the MVP. 
 * 
 * @see https://www.typescriptlang.org/docs/handbook/interfaces.html
 */

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