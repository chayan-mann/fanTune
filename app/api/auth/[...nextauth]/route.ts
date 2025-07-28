import { prismaClient } from "@/app/lib/db";
import NextAuth, { type AuthOptions } from "next-auth"; 
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { adapter } from "next/dist/server/web/adapter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions : AuthOptions = {

  adapter : PrismaAdapter(prismaClient),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  session : {
    strategy : "jwt",
  },

  callbacks: {
    // This callback adds the user ID from the JWT to the session object
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }: { token: any; user?: { id?: string } }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },

  secret: process.env.NEXTAUTH_SECRET ?? "secret",
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };