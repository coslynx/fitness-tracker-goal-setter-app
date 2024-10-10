import { Goal } from '@types/goal';
import { ProgressEntry } from '@types/progress';
import { User } from '@types/user';
import { calculateGoalProgress } from './calculations';
import { formatDate } from './formatters';
import { formatNumber } from './formatters';

/**
 * @file lib/utils/formatters.ts
 * @author CosLynx
 * @description Provides utility functions for formatting data within the Fitness Tracker and Goal Setter App.
 * @version 1.0.0
 * @date 2023-10-27
 * 
 * This file implements essential formatting logic for the MVP, ensuring data is presented in a user-friendly and consistent manner. 
 * 
 * @see https://www.typescriptlang.org/docs/handbook/basic-types.html
 * @see https://www.w3.org/WAI/standards-guidelines/wcag/
 */

/**
 * @description Formats a date to a user-friendly string.
 * 
 * This function converts a Date object to a localized string representation. It uses the default locale and formatting options.
 * 
 * @param {Date} date - The Date object to format.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};

/**
 * @description Formats a number to a string with two decimal places.
 * 
 * This function rounds a number to two decimal places and converts it to a string. 
 * 
 * @param {number} number - The number to format.
 * @returns {string} - The formatted number string.
 */
export const formatNumber = (number: number): string => {
  return number.toFixed(2);
};

/**
 * @description Formats a goal's progress percentage.
 * 
 * This function calculates and formats the progress percentage for a given goal based on the provided progress data. 
 * 
 * @param {Goal} goal - The goal for which to calculate the progress percentage.
 * @returns {string} - The formatted progress percentage string.
 */
export const formatGoalProgress = (goal: Goal): string => {
  const progressPercentage = calculateGoalProgress(goal);
  return `${progressPercentage}%`;
};

/**
 * @description Formats a user's progress data for display.
 * 
 * This function takes the user's progress data and formats it for presentation in a user-friendly manner.
 * 
 * @param {ProgressEntry[]} progressEntries - An array of progress entries for the user.
 * @returns {string} - The formatted progress string.
 */
export const formatProgressData = (progressEntries: ProgressEntry[]): string => {
  if (!progressEntries || progressEntries.length === 0) {
    return 'No progress data available';
  }
  
  return progressEntries.map((entry) => {
    const formattedDate = formatDate(entry.date);
    const formattedValue = formatNumber(entry.value);
    return `On ${formattedDate}, you made progress of ${formattedValue}`;
  }).join('\n');
};

/**
 * @description Formats a user's profile information for display.
 * 
 * This function takes user profile data and formats it for presentation in a user-friendly manner.
 * 
 * @param {User} user - The user's profile data.
 * @returns {string} - The formatted user profile string.
 */
export const formatUserProfile = (user: User): string => {
  const { name, email } = user;
  return `Name: ${name}\nEmail: ${email}`;
};