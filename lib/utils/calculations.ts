import { Goal } from '@types/goal';
import { ProgressEntry } from '@types/progress';

/**
 * @file lib/utils/calculations.ts
 * @author CosLynx
 * @description Provides utility functions for performing calculations related to fitness goals and progress within the Fitness Tracker and Goal Setter App.
 * @version 1.0.0
 * @date 2023-10-27
 *
 * This file implements essential calculation logic for the MVP, ensuring accurate and efficient data processing. It leverages TypeScript for type safety and includes robust error handling and performance optimizations.
 *
 * The `calculations.ts` file plays a crucial role in the MVP's data processing pipeline. It provides functions for calculating progress percentages, determining goal completion status, and potentially performing other calculations related to fitness metrics. 
 *
 * @see https://www.typescriptlang.org/docs/handbook/basic-types.html
 * @see https://www.w3.org/WAI/standards-guidelines/wcag/
 */

/**
 * @description Calculates the progress percentage for a given goal.
 *
 * This function determines the current progress towards a goal based on the provided progress entries. It uses the latest progress entry's value to calculate the percentage.
 *
 * @param {Goal} goal - The goal for which to calculate progress.
 * @returns {number} - The progress percentage (0-100).
 */
export const calculateGoalProgress = (goal: Goal): number => {
  if (!goal || !goal.progress || goal.progress.length === 0) {
    return 0;
  }

  const latestProgressEntry = goal.progress.reduce((prev, curr) => (curr.date > prev.date ? curr : prev), goal.progress[0]);
  const progressPercentage = (latestProgressEntry.value / goal.target) * 100;

  return Math.round(progressPercentage);
};

/**
 * @description Determines if a goal is completed based on its progress.
 *
 * This function checks if the goal's progress has reached or exceeded the goal's target value.
 *
 * @param {Goal} goal - The goal to check for completion.
 * @returns {boolean} - True if the goal is completed, false otherwise.
 */
export const isGoalCompleted = (goal: Goal): boolean => {
  if (!goal || !goal.progress || goal.progress.length === 0) {
    return false;
  }

  const latestProgressEntry = goal.progress.reduce((prev, curr) => (curr.date > prev.date ? curr : prev), goal.progress[0]);

  return latestProgressEntry.value >= goal.target;
};

/**
 * @description Calculates the average progress made for a goal.
 * 
 * This function computes the average progress value across all progress entries for a given goal. 
 * 
 * @param {Goal} goal - The goal for which to calculate average progress.
 * @returns {number} - The average progress value, or 0 if no progress entries exist.
 */
export const calculateAverageProgress = (goal: Goal): number => {
  if (!goal || !goal.progress || goal.progress.length === 0) {
    return 0;
  }

  const totalProgressValue = goal.progress.reduce((sum, entry) => sum + entry.value, 0);
  return totalProgressValue / goal.progress.length;
};

/**
 * @description Calculates the time remaining until a goal's deadline.
 * 
 * This function determines the time difference between the current date and the goal's deadline.
 * 
 * @param {Goal} goal - The goal for which to calculate time remaining.
 * @returns {number} - The number of days remaining until the deadline.
 */
export const calculateTimeRemaining = (goal: Goal): number => {
  if (!goal || !goal.deadline) {
    return 0;
  }

  const today = new Date();
  const deadline = new Date(goal.deadline);
  const timeDifference = deadline.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return daysRemaining;
};

/**
 * @description Calculates the total progress made for a user across all their goals.
 * 
 * This function sums the progress values for all progress entries across all goals associated with the user. 
 *
 * @param {Goal[]} goals - An array of goals for the user.
 * @returns {number} - The total progress value for the user.
 */
export const calculateTotalProgress = (goals: Goal[]): number => {
  if (!goals || goals.length === 0) {
    return 0;
  }

  return goals.reduce((totalProgress, goal) => {
    return totalProgress + goal.progress.reduce((sum, entry) => sum + entry.value, 0);
  }, 0);
};

/**
 * @description Calculates the progress percentage for a user's overall fitness journey.
 * 
 * This function determines the overall progress based on the total progress made across all goals and the total target values for all goals. 
 *
 * @param {Goal[]} goals - An array of goals for the user.
 * @returns {number} - The overall progress percentage. 
 */
export const calculateOverallProgressPercentage = (goals: Goal[]): number => {
  if (!goals || goals.length === 0) {
    return 0;
  }

  const totalProgress = calculateTotalProgress(goals);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);

  return (totalProgress / totalTarget) * 100;
};

/**
 * @description Calculates the average progress percentage across all goals for a user.
 * 
 * This function determines the average progress across all completed goals, considering their individual progress percentages.
 * 
 * @param {Goal[]} goals - An array of goals for the user.
 * @returns {number} - The average progress percentage across all completed goals.
 */
export const calculateAverageProgressPercentage = (goals: Goal[]): number => {
  if (!goals || goals.length === 0) {
    return 0;
  }

  const completedGoals = goals.filter((goal) => isGoalCompleted(goal));
  const averageProgress = completedGoals.reduce((total, goal) => total + calculateGoalProgress(goal), 0);
  return averageProgress / completedGoals.length;
};

/**
 * @description Calculates the number of completed goals for a user.
 * 
 * This function counts the number of goals that have been marked as completed based on the `isGoalCompleted` function. 
 *
 * @param {Goal[]} goals - An array of goals for the user.
 * @returns {number} - The number of completed goals.
 */
export const countCompletedGoals = (goals: Goal[]): number => {
  if (!goals || goals.length === 0) {
    return 0;
  }
  return goals.filter((goal) => isGoalCompleted(goal)).length;
};

/**
 * @description Calculates the time elapsed since a progress entry was made.
 * 
 * This function determines the time difference between the current date and the date of the provided progress entry.
 *
 * @param {ProgressEntry} progressEntry - The progress entry for which to calculate elapsed time.
 * @returns {number} - The number of days elapsed since the progress entry was made. 
 */
export const calculateTimeElapsed = (progressEntry: ProgressEntry): number => {
  if (!progressEntry || !progressEntry.date) {
    return 0;
  }

  const today = new Date();
  const progressEntryDate = new Date(progressEntry.date);
  const timeDifference = today.getTime() - progressEntryDate.getTime();
  const daysElapsed = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return daysElapsed;
};