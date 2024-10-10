import axios, { AxiosError, AxiosResponse } from 'axios';
import { User } from '@types/user';
import { Goal } from '@types/goal';
import { ProgressEntry } from '@types/progress';
import { CommunityPost } from '@types/community';

const API_BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

/**
 * @file lib/api/client.ts
 * @author CosLynx
 * @description Provides a centralized API client for interacting with the Fitness Tracker and Goal Setter App's backend services.
 * @version 1.0.0
 * @date 2023-10-27
 * 
 * This API client serves as a single point of access for all API requests, enabling consistent interaction with the backend. It utilizes the Axios library for HTTP requests and implements error handling, logging, and other essential features for reliable communication.
 * 
 * The client is designed to be modular and extensible, allowing for easy addition of new API endpoints and functionality. It follows best practices for API interaction, including robust error handling, secure data transmission, and performance optimizations.
 * 
 * @see https://axios-http.com/docs/api_intro
 */

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError) => {
    // Handle errors based on response status
    if (error.response) {
      // Request made and server responded with a status code
      // that falls out of the range of 2xx
      // (e.g., 400, 500)
      if (error.response.status === 401) {
        // Unauthorized, handle token expiration or invalid token
        // Redirect to login page or show an error message
      } else {
        // Other errors, log and handle appropriately
        console.error('API request error:', error.response.data);
      }
    } else if (error.request) {
      // The request was made but no response was received
      // (e.g., network error)
      console.error('API request error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API request error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * @description Fetches the current user session.
 * 
 * @returns {Promise<User | null>} - A Promise resolving to the current user data or null if not logged in.
 */
export const getUserSession = (): Promise<User | null> => {
  return apiClient.get('/api/auth/session')
    .then((response: AxiosResponse<User>) => response)
    .catch((error: AxiosError) => {
      console.error('Error fetching user session:', error);
      return null;
    });
};

/**
 * @description Creates a new user account.
 * 
 * @param {User} userData - The user data to be created.
 * @returns {Promise<User>} - A Promise resolving to the newly created user data.
 */
export const createUser = (userData: User): Promise<User> => {
  return apiClient.post('/api/auth/register', userData)
    .then((response: AxiosResponse<User>) => response)
    .catch((error: AxiosError) => {
      console.error('Error creating user:', error);
      throw error;
    });
};

/**
 * @description Logs in an existing user.
 * 
 * @param {User} loginData - The user login credentials (email and password).
 * @returns {Promise<User>} - A Promise resolving to the logged-in user data.
 */
export const loginUser = (loginData: User): Promise<User> => {
  return apiClient.post('/api/auth/login', loginData)
    .then((response: AxiosResponse<User>) => response)
    .catch((error: AxiosError) => {
      console.error('Error logging in user:', error);
      throw error;
    });
};

/**
 * @description Fetches all goals for the current user.
 * 
 * @returns {Promise<Goal[]>} - A Promise resolving to an array of goals for the current user.
 */
export const getUserGoals = (): Promise<Goal[]> => {
  return apiClient.get('/api/goals')
    .then((response: AxiosResponse<Goal[]>) => response)
    .catch((error: AxiosError) => {
      console.error('Error fetching user goals:', error);
      throw error;
    });
};

/**
 * @description Fetches a specific goal by its ID.
 * 
 * @param {number} goalId - The ID of the goal to be fetched.
 * @returns {Promise<Goal>} - A Promise resolving to the fetched goal data.
 */
export const getGoalById = (goalId: number): Promise<Goal> => {
  return apiClient.get(`/api/goals/${goalId}`)
    .then((response: AxiosResponse<Goal>) => response)
    .catch((error: AxiosError) => {
      console.error('Error fetching goal:', error);
      throw error;
    });
};

/**
 * @description Creates a new goal.
 * 
 * @param {Goal} goalData - The goal data to be created.
 * @returns {Promise<Goal>} - A Promise resolving to the newly created goal data.
 */
export const createGoal = (goalData: Goal): Promise<Goal> => {
  return apiClient.post('/api/goals', goalData)
    .then((response: AxiosResponse<Goal>) => response)
    .catch((error: AxiosError) => {
      console.error('Error creating goal:', error);
      throw error;
    });
};

/**
 * @description Updates an existing goal.
 * 
 * @param {Goal} goalData - The goal data to be updated.
 * @returns {Promise<Goal>} - A Promise resolving to the updated goal data.
 */
export const updateGoal = (goalData: Goal): Promise<Goal> => {
  return apiClient.put(`/api/goals/${goalData.id}`, goalData)
    .then((response: AxiosResponse<Goal>) => response)
    .catch((error: AxiosError) => {
      console.error('Error updating goal:', error);
      throw error;
    });
};

/**
 * @description Deletes a goal by its ID.
 * 
 * @param {number} goalId - The ID of the goal to be deleted.
 * @returns {Promise<void>} - A Promise resolving when the goal is deleted.
 */
export const deleteGoal = (goalId: number): Promise<void> => {
  return apiClient.delete(`/api/goals/${goalId}`)
    .then(() => {
      console.log('Goal deleted successfully');
    })
    .catch((error: AxiosError) => {
      console.error('Error deleting goal:', error);
      throw error;
    });
};

/**
 * @description Fetches all progress entries for the current user.
 * 
 * @returns {Promise<ProgressEntry[]>} - A Promise resolving to an array of progress entries.
 */
export const getUserProgress = (): Promise<ProgressEntry[]> => {
  return apiClient.get('/api/progress')
    .then((response: AxiosResponse<ProgressEntry[]>) => response)
    .catch((error: AxiosError) => {
      console.error('Error fetching user progress:', error);
      throw error;
    });
};

/**
 * @description Fetches a specific progress entry by its ID.
 * 
 * @param {number} progressId - The ID of the progress entry to be fetched.
 * @returns {Promise<ProgressEntry>} - A Promise resolving to the fetched progress entry data.
 */
export const getProgressEntryById = (progressId: number): Promise<ProgressEntry> => {
  return apiClient.get(`/api/progress/${progressId}`)
    .then((response: AxiosResponse<ProgressEntry>) => response)
    .catch((error: AxiosError) => {
      console.error('Error fetching progress entry:', error);
      throw error;
    });
};

/**
 * @description Creates a new progress entry.
 * 
 * @param {ProgressEntry} progressData - The progress entry data to be created.
 * @returns {Promise<ProgressEntry>} - A Promise resolving to the newly created progress entry data.
 */
export const createProgressEntry = (progressData: ProgressEntry): Promise<ProgressEntry> => {
  return apiClient.post('/api/progress', progressData)
    .then((response: AxiosResponse<ProgressEntry>) => response)
    .catch((error: AxiosError) => {
      console.error('Error creating progress entry:', error);
      throw error;
    });
};

/**
 * @description Updates an existing progress entry.
 * 
 * @param {ProgressEntry} progressData - The progress entry data to be updated.
 * @returns {Promise<ProgressEntry>} - A Promise resolving to the updated progress entry data.
 */
export const updateProgressEntry = (progressData: ProgressEntry): Promise<ProgressEntry> => {
  return apiClient.put(`/api/progress/${progressData.id}`, progressData)
    .then((response: AxiosResponse<ProgressEntry>) => response)
    .catch((error: AxiosError) => {
      console.error('Error updating progress entry:', error);
      throw error;
    });
};

/**
 * @description Deletes a progress entry by its ID.
 * 
 * @param {number} progressId - The ID of the progress entry to be deleted.
 * @returns {Promise<void>} - A Promise resolving when the progress entry is deleted.
 */
export const deleteProgressEntry = (progressId: number): Promise<void> => {
  return apiClient.delete(`/api/progress/${progressId}`)
    .then(() => {
      console.log('Progress entry deleted successfully');
    })
    .catch((error: AxiosError) => {
      console.error('Error deleting progress entry:', error);
      throw error;
    });
};

/**
 * @description Fetches all community posts.
 * 
 * @returns {Promise<CommunityPost[]>} - A Promise resolving to an array of community posts.
 */
export const getCommunityPosts = (): Promise<CommunityPost[]> => {
  return apiClient.get('/api/community')
    .then((response: AxiosResponse<CommunityPost[]>) => response)
    .catch((error: AxiosError) => {
      console.error('Error fetching community posts:', error);
      throw error;
    });
};

/**
 * @description Creates a new community post.
 * 
 * @param {string} postContent - The content of the new community post.
 * @returns {Promise<CommunityPost>} - A Promise resolving to the newly created community post data.
 */
export const createCommunityPost = (postContent: string): Promise<CommunityPost> => {
  return apiClient.post('/api/community', { content: postContent })
    .then((response: AxiosResponse<CommunityPost>) => response)
    .catch((error: AxiosError) => {
      console.error('Error creating community post:', error);
      throw error;
    });
};

/**
 * @description Fetches a specific user by their ID.
 * 
 * @param {number} userId - The ID of the user to be fetched.
 * @returns {Promise<User>} - A Promise resolving to the fetched user data.
 */
export const getUserById = (userId: number): Promise<User> => {
  return apiClient.get(`/api/users/${userId}`)
    .then((response: AxiosResponse<User>) => response)
    .catch((error: AxiosError) => {
      console.error('Error fetching user:', error);
      throw error;
    });
};

/**
 * @description Updates an existing user's profile.
 * 
 * @param {User} userData - The user data to be updated.
 * @returns {Promise<User>} - A Promise resolving to the updated user data.
 */
export const updateUser = (userData: User): Promise<User> => {
  return apiClient.put(`/api/users/${userData.id}`, userData)
    .then((response: AxiosResponse<User>) => response)
    .catch((error: AxiosError) => {
      console.error('Error updating user:', error);
      throw error;
    });
};

/**
 * @description Deletes a user by their ID.
 * 
 * @param {number} userId - The ID of the user to be deleted.
 * @returns {Promise<void>} - A Promise resolving when the user is deleted.
 */
export const deleteUser = (userId: number): Promise<void> => {
  return apiClient.delete(`/api/users/${userId}`)
    .then(() => {
      console.log('User deleted successfully');
    })
    .catch((error: AxiosError) => {
      console.error('Error deleting user:', error);
      throw error;
    });
};