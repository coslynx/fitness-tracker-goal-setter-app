import { ProgressEntry } from '@types/progress';

/**
 * @file types/progress.ts
 * @author CosLynx
 * @description Defines the ProgressEntry interface for the Fitness Tracker and Goal Setter App.
 * @version 1.0.0
 * @date 2023-10-27
 * 
 * This file defines the TypeScript interface for the `ProgressEntry` object. It serves as the foundation for representing 
 * progress data associated with user goals throughout the application. The `ProgressEntry` interface includes properties like
 * `id`, `value`, `date`, and `goalId`, reflecting essential data points for tracking progress towards specific goals.
 * 
 * This interface is utilized within various components, services, and API routes to ensure type safety and 
 * consistent data handling across the application. The `ProgressEntry` interface is designed to be extensible, accommodating 
 * potential additions of progress data properties in future iterations of the MVP. 
 * 
 * @see https://www.typescriptlang.org/docs/handbook/interfaces.html
 */

export interface ProgressEntry {
  id: number;
  value: number;
  date: Date;
  goalId: number;
  // Add more progress data properties here as needed
}