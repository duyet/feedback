import NextAuth from 'next-auth';
// @ts-expect-error -- next-auth v4 module resolution with bundler moduleResolution
import { Provider } from 'next-auth/providers';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';

import { prisma } from '../../../lib/prisma';

const email: Provider[] = process.env.EMAIL_SERVER
  ? [
      EmailProvider({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
      }),
    ]
  : [];

const github: Provider[] = process.env.GITHUB_ID
  ? [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET || '',
      }),
    ]
  : [];

const google: Provider[] = process.env.GOOGLE_ID
  ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET || '',
      }),
    ]
  : [];

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  adapter: PrismaAdapter(prisma),

  // https://next-auth.js.org/configuration/providers
  providers: [...github, ...google, ...email],

  callbacks: {
    async session({ session, user }) {
      session.userId = user.id;
      return session;
    },
  },

  // Enable debug messages only in development
  debug: process.env.NODE_ENV === 'development',
});
