import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;
  const id = parseInt(req.query.id as string, 10);

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Failed to fetch user' });
    }
  } else if (req.method === 'PUT') {
    const { name, email, password, ...otherData } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          password,
          ...otherData,
        },
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Failed to update user' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id,
        },
      });

      res.status(200).json(deletedUser);
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Failed to delete user' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}