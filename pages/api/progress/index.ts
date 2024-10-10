import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@lib/prisma';
import { getSession } from 'next-auth/react';
import { ProgressEntry } from '@types/progress';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;

  if (req.method === 'GET') {
    try {
      const progressEntries = await prisma.progress.findMany({
        where: {
          goal: {
            user: {
              id: userId,
            },
          },
        },
      });

      res.status(200).json(progressEntries);
    } catch (error) {
      console.error('Error fetching progress entries:', error);
      res.status(500).json({ message: 'Failed to fetch progress entries' });
    }
  } else if (req.method === 'POST') {
    const newProgressEntry: ProgressEntry = req.body;

    try {
      const progressEntry = await prisma.progress.create({
        data: {
          ...newProgressEntry,
          goal: {
            connect: {
              id: newProgressEntry.goalId,
            },
          },
        },
      });

      res.status(201).json(progressEntry);
    } catch (error) {
      console.error('Error creating progress entry:', error);
      res.status(500).json({ message: 'Failed to create progress entry' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}