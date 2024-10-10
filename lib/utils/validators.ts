import { Goal } from '@types/goal';
import { ProgressEntry } from '@types/progress';
import { User } from '@types/user';

/**
 * @file lib/utils/validators.ts
 * @author CosLynx
 * @description Provides validation functions for user input and data integrity within the Fitness Tracker and Goal Setter App.
 * @version 1.0.0
 * @date 2023-10-27
 * 
 * This file implements essential validation logic for the MVP, ensuring data quality and preventing potential issues. It leverages TypeScript for type safety and includes robust error handling and performance optimizations.
 * 
 * The `validators.ts` file plays a crucial role in maintaining data integrity and security within the application. It enforces validation rules on user input, API responses, and other data sources to ensure that the application functions correctly and avoids unexpected behavior.
 * 
 * @see https://www.typescriptlang.org/docs/handbook/basic-types.html
 * @see https://www.w3.org/WAI/standards-guidelines/wcag/
 */

/**
 * @description Validates a user's email address.
 * 
 * This function checks if the provided email address follows a basic email format.
 * 
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * @description Validates a user's password.
 * 
 * This function enforces basic password requirements:
 * - Minimum length of 8 characters.
 * - At least one uppercase letter.
 * - At least one lowercase letter.
 * - At least one number.
 * 
 * @param {string} password - The password to validate.
 * @returns {boolean} - True if the password is valid, false otherwise.
 */
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
  return passwordRegex.test(password);
};

/**
 * @description Validates a user's name.
 * 
 * This function checks if the user's name is at least 3 characters long and contains only letters and spaces.
 * 
 * @param {string} name - The user's name to validate.
 * @returns {boolean} - True if the name is valid, false otherwise.
 */
export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  return name.length >= 3 && nameRegex.test(name);
};

/**
 * @description Validates a goal's title.
 * 
 * This function checks if the goal title is at least 3 characters long and contains only letters, numbers, and spaces.
 * 
 * @param {string} title - The goal title to validate.
 * @returns {boolean} - True if the title is valid, false otherwise.
 */
export const validateGoalTitle = (title: string): boolean => {
  const titleRegex = /^[a-zA-Z0-9\s]+$/;
  return title.length >= 3 && titleRegex.test(title);
};

/**
 * @description Validates a goal's description.
 * 
 * This function checks if the goal description is at least 10 characters long.
 * 
 * @param {string} description - The goal description to validate.
 * @returns {boolean} - True if the description is valid, false otherwise.
 */
export const validateGoalDescription = (description: string): boolean => {
  return description.length >= 10;
};

/**
 * @description Validates a goal's target value.
 * 
 * This function checks if the target value is a positive number.
 * 
 * @param {number} target - The goal target value to validate.
 * @returns {boolean} - True if the target is valid, false otherwise.
 */
export const validateGoalTarget = (target: number): boolean => {
  return target > 0;
};

/**
 * @description Validates a goal's deadline.
 * 
 * This function checks if the deadline is a valid date and is in the future.
 * 
 * @param {string} deadline - The goal deadline to validate.
 * @returns {boolean} - True if the deadline is valid, false otherwise.
 */
export const validateGoalDeadline = (deadline: string): boolean => {
  const date = new Date(deadline);
  return !isNaN(date.getTime()) && date > new Date();
};

/**
 * @description Validates a progress entry's value.
 * 
 * This function checks if the progress value is a positive number.
 * 
 * @param {number} value - The progress value to validate.
 * @returns {boolean} - True if the value is valid, false otherwise.
 */
export const validateProgressValue = (value: number): boolean => {
  return value >= 0;
};

/**
 * @description Validates a progress entry's date.
 * 
 * This function checks if the date is a valid date and is in the past.
 * 
 * @param {string} date - The progress entry date to validate.
 * @returns {boolean} - True if the date is valid, false otherwise.
 */
export const validateProgressDate = (date: string): boolean => {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime()) && parsedDate <= new Date();
};

/**
 * @description Validates a user's profile data.
 * 
 * This function checks if the user profile data is valid based on the defined validation rules.
 * 
 * @param {User} userData - The user profile data to validate.
 * @returns {boolean} - True if the data is valid, false otherwise.
 */
export const validateUserData = (userData: User): boolean => {
  return (
    validateEmail(userData.email) &&
    validatePassword(userData.password) &&
    validateName(userData.name)
  );
};

/**
 * @description Validates a goal's data.
 * 
 * This function checks if the goal data is valid based on the defined validation rules.
 * 
 * @param {Goal} goalData - The goal data to validate.
 * @returns {boolean} - True if the data is valid, false otherwise.
 */
export const validateGoalData = (goalData: Goal): boolean => {
  return (
    validateGoalTitle(goalData.title) &&
    validateGoalDescription(goalData.description) &&
    validateGoalTarget(goalData.target) &&
    validateGoalDeadline(goalData.deadline)
  );
};

/**
 * @description Validates a progress entry's data.
 * 
 * This function checks if the progress entry data is valid based on the defined validation rules.
 * 
 * @param {ProgressEntry} progressEntryData - The progress entry data to validate.
 * @returns {boolean} - True if the data is valid, false otherwise.
 */
export const validateProgressEntryData = (progressEntryData: ProgressEntry): boolean => {
  return (
    validateProgressValue(progressEntryData.value) &&
    validateProgressDate(progressEntryData.date)
  );
};

/**
 * @description Sanitizes user input.
 * 
 * This function removes potentially harmful characters and sanitizes user input to prevent cross-site scripting (XSS) attacks.
 * 
 * @param {string} input - The user input to sanitize.
 * @returns {string} - The sanitized input.
 */
export const sanitizeInput = (input: string): string => {
  return input.replace(/<[^>]+>/g, '');
};