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
  const progressId = req.query.id as string;

  if (req.method === 'GET') {
    try {
      const progressEntry = await prisma.progress.findUnique({
        where: {
          id: parseInt(progressId),
          goal: {
            user: {
              id: userId,
            },
          },
        },
      });

      if (!progressEntry) {
        return res.status(404).json({ message: 'Progress entry not found' });
      }

      res.status(200).json(progressEntry);
    } catch (error) {
      console.error('Error fetching progress entry:', error);
      res.status(500).json({ message: 'Failed to fetch progress entry' });
    }
  } else if (req.method === 'PUT') {
    const updatedProgressEntry: ProgressEntry = req.body;

    try {
      const progressEntry = await prisma.progress.update({
        where: {
          id: parseInt(progressId),
          goal: {
            user: {
              id: userId,
            },
          },
        },
        data: {
          ...updatedProgressEntry,
        },
      });

      res.status(200).json(progressEntry);
    } catch (error) {
      console.error('Error updating progress entry:', error);
      res.status(500).json({ message: 'Failed to update progress entry' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const progressEntry = await prisma.progress.delete({
        where: {
          id: parseInt(progressId),
          goal: {
            user: {
              id: userId,
            },
          },
        },
      });

      res.status(200).json(progressEntry);
    } catch (error) {
      console.error('Error deleting progress entry:', error);
      res.status(500).json({ message: 'Failed to delete progress entry' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}