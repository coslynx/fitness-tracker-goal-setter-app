import { User } from '@types/user';
import { createUser, loginUser, updateUser, getUserById, deleteUser } from '@lib/api/client';
import { validateEmail, validatePassword, validateName, sanitizeInput } from '@lib/utils/validators';
import { getSubscriptionData } from './subscriptionService';

/**
 * @file services/userService.ts
 * @author CosLynx
 * @description Provides services for managing user data and authentication within the Fitness Tracker and Goal Setter App.
 * @version 1.0.0
 * @date 2023-10-27
 *
 * This service acts as a centralized hub for all user-related operations, including:
 *  - User registration
 *  - User login
 *  - User profile management (update, fetch)
 *  - User deletion
 *  - (If using Stripe) User subscription management (fetch, update, cancel)
 *
 * It integrates with the backend API (`lib/api/client.ts`) for data persistence, the `validators.ts` module for input validation, and
 * other services (e.g., `subscriptionService.ts`) as required. The service adheres to established coding standards,
 * utilizes appropriate design patterns for maintainability, and implements robust error handling and security best practices. 
 *
 * @see https://next-auth.js.org/getting-started/client
 * @see https://www.w3.org/WAI/standards-guidelines/wcag/
 */

/**
 * @description Creates a new user account.
 *
 * This function interacts with the backend API (`createUser`) to create a new user account. It performs input validation on the user data
 * before sending it to the API.
 *
 * @param {User} userData - The user data to be created.
 * @returns {Promise<User>} - A Promise resolving to the newly created user data.
 */
export const createUser = async (userData: User): Promise<User> => {
  if (!validateEmail(userData.email)) {
    throw new Error('Invalid email address.');
  }
  if (!validatePassword(userData.password)) {
    throw new Error('Invalid password.');
  }
  if (!validateName(userData.name)) {
    throw new Error('Invalid name.');
  }
  userData.name = sanitizeInput(userData.name);
  userData.email = sanitizeInput(userData.email);
  return createUser(userData);
};

/**
 * @description Logs in an existing user.
 *
 * This function interacts with the backend API (`loginUser`) to authenticate a user with provided credentials. It performs input validation
 * before sending the data to the API.
 *
 * @param {User} loginData - The user login credentials (email and password).
 * @returns {Promise<User>} - A Promise resolving to the logged-in user data.
 */
export const loginUser = async (loginData: User): Promise<User> => {
  if (!validateEmail(loginData.email)) {
    throw new Error('Invalid email address.');
  }
  if (!validatePassword(loginData.password)) {
    throw new Error('Invalid password.');
  }
  return loginUser(loginData);
};

/**
 * @description Updates an existing user's profile.
 *
 * This function interacts with the backend API (`updateUser`) to update a user's profile information. It performs input validation on the
 * provided user data before sending it to the API.
 *
 * @param {User} userData - The user data to be updated.
 * @returns {Promise<User>} - A Promise resolving to the updated user data.
 */
export const updateUserProfile = async (userData: User): Promise<User> => {
  if (!validateEmail(userData.email)) {
    throw new Error('Invalid email address.');
  }
  if (userData.password && !validatePassword(userData.password)) {
    throw new Error('Invalid password.');
  }
  if (!validateName(userData.name)) {
    throw new Error('Invalid name.');
  }
  userData.name = sanitizeInput(userData.name);
  userData.email = sanitizeInput(userData.email);
  return updateUser(userData);
};

/**
 * @description Fetches a user's profile data by their ID.
 *
 * This function interacts with the backend API (`getUserById`) to retrieve a user's profile information based on their ID.
 *
 * @param {number} userId - The ID of the user to be fetched.
 * @returns {Promise<User>} - A Promise resolving to the fetched user data.
 */
export const getUserProfileById = async (userId: number): Promise<User> => {
  return getUserById(userId);
};

/**
 * @description Deletes a user by their ID.
 *
 * This function interacts with the backend API (`deleteUser`) to delete a user account based on their ID.
 *
 * @param {number} userId - The ID of the user to be deleted.
 * @returns {Promise<void>} - A Promise resolving when the user is deleted.
 */
export const deleteUser = async (userId: number): Promise<void> => {
  return deleteUser(userId);
};

/**
 * @description Fetches a user's subscription data.
 *
 * This function fetches the subscription data for the user, including subscription status, plan details, and billing information.
 *
 * @param {number} userId - The ID of the user whose subscription data should be fetched.
 * @returns {Promise<void>} - A Promise resolving when the subscription data is fetched.
 */
export const getUserSubscriptionData = async (userId: number): Promise<void> => {
  return getSubscriptionData(userId);
};