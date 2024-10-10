import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { getSubscriptionData } from '@/services/subscriptionService';
import { User } from '@types/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user: User = session.user;

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (req.method === 'POST') {
    const signature = req.headers['stripe-signature'];

    if (!signature) {
      return res.status(400).json({ message: 'Missing Stripe signature' });
    }

    const event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);

    switch (event.type) {
      case 'customer.subscription.created':
        const subscriptionData = event.data.object as Stripe.Subscription;
        await handleSubscriptionCreated(subscriptionData, user);
        break;
      case 'customer.subscription.updated':
        const updatedSubscriptionData = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(updatedSubscriptionData, user);
        break;
      case 'customer.subscription.deleted':
        const deletedSubscriptionData = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(deletedSubscriptionData, user);
        break;
      // Handle other Stripe events here as needed
      default:
        console.log('Unhandled Stripe event:', event.type);
        return res.status(200);
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function handleSubscriptionCreated(subscriptionData: Stripe.Subscription, user: User) {
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        subscriptionId: subscriptionData.id,
      },
    });
    await getSubscriptionData(user.id); // Refresh subscription data
    console.log('Subscription created successfully:', subscriptionData.id);
  } catch (error) {
    console.error('Error handling subscription creation:', error);
  }
}

async function handleSubscriptionUpdated(subscriptionData: Stripe.Subscription, user: User) {
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        subscriptionId: subscriptionData.id,
      },
    });
    await getSubscriptionData(user.id); // Refresh subscription data
    console.log('Subscription updated successfully:', subscriptionData.id);
  } catch (error) {
    console.error('Error handling subscription update:', error);
  }
}

async function handleSubscriptionDeleted(subscriptionData: Stripe.Subscription, user: User) {
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        subscriptionId: null,
      },
    });
    await getSubscriptionData(user.id); // Refresh subscription data
    console.log('Subscription deleted successfully:', subscriptionData.id);
  } catch (error) {
    console.error('Error handling subscription deletion:', error);
  }
}