import { ProgressEntry } from '@types/progress';
import { PrismaClient } from '@prisma/client';
import { User } from '@types/user';
import { getGoalById } from './goalService';

const prisma = new PrismaClient();

/**
 * @description Fetches all progress entries for the current user.
 *
 * @returns {Promise<ProgressEntry[]>} - A Promise resolving to an array of progress entries.
 */
export const getProgressEntries = async (): Promise<ProgressEntry[]> => {
  try {
    const progressEntries = await prisma.progress.findMany({
      include: {
        goal: {
          include: {
            user: true,
          },
        },
      },
    });
    return progressEntries;
  } catch (error) {
    console.error('Error fetching progress entries:', error);
    throw error;
  }
};

/**
 * @description Fetches a specific progress entry by its ID.
 *
 * @param {number} progressId - The ID of the progress entry to be fetched.
 * @returns {Promise<ProgressEntry>} - A Promise resolving to the fetched progress entry data.
 */
export const getProgressEntryById = async (progressId: number): Promise<ProgressEntry> => {
  try {
    const progressEntry = await prisma.progress.findUnique({
      where: {
        id: progressId,
      },
      include: {
        goal: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!progressEntry) {
      throw new Error('Progress entry not found');
    }

    return progressEntry;
  } catch (error) {
    console.error('Error fetching progress entry:', error);
    throw error;
  }
};

/**
 * @description Creates a new progress entry.
 *
 * @param {ProgressEntry} progressData - The progress entry data to be created.
 * @returns {Promise<ProgressEntry>} - A Promise resolving to the newly created progress entry data.
 */
export const createProgressEntry = async (progressData: ProgressEntry): Promise<ProgressEntry> => {
  try {
    const goal = await getGoalById(progressData.goalId);

    if (!goal) {
      throw new Error('Goal not found');
    }

    const progressEntry = await prisma.progress.create({
      data: {
        ...progressData,
        goal: {
          connect: {
            id: progressData.goalId,
          },
        },
      },
    });
    return progressEntry;
  } catch (error) {
    console.error('Error creating progress entry:', error);
    throw error;
  }
};

/**
 * @description Updates an existing progress entry.
 *
 * @param {ProgressEntry} progressData - The progress entry data to be updated.
 * @returns {Promise<ProgressEntry>} - A Promise resolving to the updated progress entry data.
 */
export const updateProgressEntry = async (progressData: ProgressEntry): Promise<ProgressEntry> => {
  try {
    const progressEntry = await prisma.progress.update({
      where: {
        id: progressData.id,
      },
      data: {
        ...progressData,
      },
    });

    return progressEntry;
  } catch (error) {
    console.error('Error updating progress entry:', error);
    throw error;
  }
};

/**
 * @description Deletes a progress entry by its ID.
 *
 * @param {number} progressId - The ID of the progress entry to be deleted.
 * @returns {Promise<void>} - A Promise resolving when the progress entry is deleted.
 */
export const deleteProgressEntry = async (progressId: number): Promise<void> => {
  try {
    await prisma.progress.delete({
      where: {
        id: progressId,
      },
    });
    console.log('Progress entry deleted successfully');
  } catch (error) {
    console.error('Error deleting progress entry:', error);
    throw error;
  }
};