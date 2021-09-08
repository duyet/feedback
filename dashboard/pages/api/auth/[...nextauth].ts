import NextAuth from "next-auth";
import GithubProdider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "../../../lib/prisma";

// TODO: waiting for upgrades to next version
// https://github.com/nextauthjs/adapters/tree/main/packages/prisma
const adapter = PrismaAdapter(prisma);
adapter;

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  adapter,

  // https://next-auth.js.org/configuration/providers
  providers: [
    GithubProdider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      session.userId = user.id;
      return session;
    },
  },

  // Enable debug messages in the console if you are having problems
  debug: true,
});
