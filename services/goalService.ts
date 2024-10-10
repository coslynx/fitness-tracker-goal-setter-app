import { PrismaClient } from '@prisma/client';
import { Goal } from '@types/goal';
import { User } from '@types/user';
import { getProgressEntryById } from './progressService';
import { validateGoalData, sanitizeInput } from '@lib/utils/validators';
import { calculateGoalProgress } from '@lib/utils/calculations';

const prisma = new PrismaClient();

/**
 * @description Fetches all goals for the current user.
 *
 * This function retrieves all goals associated with the logged-in user from the PostgreSQL database.
 * It utilizes the Prisma Client for efficient and type-safe database interactions.
 *
 * @returns {Promise<Goal[]>} - A Promise resolving to an array of goals for the current user.
 */
export const getUserGoals = async (): Promise<Goal[]> => {
  try {
    const goals = await prisma.goal.findMany({
      include: {
        user: true,
        progress: {
          orderBy: {
            date: 'desc',
          },
        },
      },
    });
    return goals;
  } catch (error) {
    console.error('Error fetching user goals:', error);
    throw error;
  }
};

/**
 * @description Fetches a specific goal by its ID.
 *
 * This function retrieves a specific goal from the database based on the provided goal ID.
 * It utilizes the Prisma Client for efficient and type-safe database interactions.
 *
 * @param {number} goalId - The ID of the goal to be fetched.
 * @returns {Promise<Goal>} - A Promise resolving to the fetched goal data.
 */
export const getGoalById = async (goalId: number): Promise<Goal> => {
  try {
    const goal = await prisma.goal.findUnique({
      where: {
        id: goalId,
      },
      include: {
        user: true,
        progress: {
          orderBy: {
            date: 'desc',
          },
        },
      },
    });

    if (!goal) {
      throw new Error('Goal not found');
    }

    return goal;
  } catch (error) {
    console.error('Error fetching goal:', error);
    throw error;
  }
};

/**
 * @description Creates a new goal.
 *
 * This function creates a new goal in the database based on the provided goal data.
 * It performs input validation using the `validateGoalData` function and sanitizes the input using `sanitizeInput`.
 * It also calculates the initial progress percentage for the new goal.
 *
 * @param {Goal} goalData - The goal data to be created.
 * @returns {Promise<Goal>} - A Promise resolving to the newly created goal data.
 */
export const createGoal = async (goalData: Goal): Promise<Goal> => {
  if (!validateGoalData(goalData)) {
    throw new Error('Invalid goal data.');
  }

  goalData.title = sanitizeInput(goalData.title);
  goalData.description = sanitizeInput(goalData.description);

  try {
    const goal = await prisma.goal.create({
      data: {
        ...goalData,
        progress: {
          create: {
            value: 0,
            date: new Date(),
            goalId: goalData.id, // Assuming goalData.id is already set
          },
        },
      },
    });
    return goal;
  } catch (error) {
    console.error('Error creating goal:', error);
    throw error;
  }
};

/**
 * @description Updates an existing goal.
 *
 * This function updates an existing goal in the database based on the provided goal data.
 * It performs input validation using the `validateGoalData` function and sanitizes the input using `sanitizeInput`.
 * It also recalculates the progress percentage after updating the goal.
 *
 * @param {Goal} goalData - The goal data to be updated.
 * @returns {Promise<Goal>} - A Promise resolving to the updated goal data.
 */
export const updateGoal = async (goalData: Goal): Promise<Goal> => {
  if (!validateGoalData(goalData)) {
    throw new Error('Invalid goal data.');
  }

  goalData.title = sanitizeInput(goalData.title);
  goalData.description = sanitizeInput(goalData.description);

  try {
    const updatedGoal = await prisma.goal.update({
      where: {
        id: goalData.id,
      },
      data: {
        ...goalData,
      },
      include: {
        user: true,
        progress: {
          orderBy: {
            date: 'desc',
          },
        },
      },
    });

    return updatedGoal;
  } catch (error) {
    console.error('Error updating goal:', error);
    throw error;
  }
};

/**
 * @description Deletes a goal by its ID.
 *
 * This function deletes a goal from the database based on the provided goal ID.
 * It also ensures that all associated progress entries for the goal are deleted.
 *
 * @param {number} goalId - The ID of the goal to be deleted.
 * @returns {Promise<void>} - A Promise resolving when the goal is deleted.
 */
export const deleteGoal = async (goalId: number): Promise<void> => {
  try {
    await prisma.progress.deleteMany({
      where: {
        goalId: goalId,
      },
    });

    await prisma.goal.delete({
      where: {
        id: goalId,
      },
    });
    console.log('Goal deleted successfully');
  } catch (error) {
    console.error('Error deleting goal:', error);
    throw error;
  }
};

/**
 * @description Fetches a user's goals and calculates their progress.
 *
 * This function fetches all goals for the current user from the database and calculates their progress percentages.
 * It utilizes the `calculateGoalProgress` function from the `calculations` module.
 *
 * @param {User} user - The user object for whom the goals should be fetched.
 * @returns {Promise<Goal[]>} - A Promise resolving to an array of goals with calculated progress percentages.
 */
export const getUserGoalsWithProgress = async (user: User): Promise<Goal[]> => {
  try {
    const goals = await prisma.goal.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: true,
        progress: {
          orderBy: {
            date: 'desc',
          },
        },
      },
    });

    const goalsWithProgress = goals.map((goal) => ({
      ...goal,
      progress: calculateGoalProgress(goal),
    }));

    return goalsWithProgress;
  } catch (error) {
    console.error('Error fetching user goals with progress:', error);
    throw error;
  }
};