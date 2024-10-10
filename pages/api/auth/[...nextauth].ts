import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john.doe@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const user = await prisma.user.findUnique({ where: { email: credentials.email } });

        if (user && user.password === credentials.password) {
          return user;
        }

        throw new Error('Invalid email or password');
      },
    }),
    // ... other authentication providers (e.g., Google, Facebook) if required.
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    // ... other pages (e.g., sign up, error) if required.
  },
  debug: true,
});