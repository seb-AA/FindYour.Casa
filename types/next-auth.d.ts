// types/next-auth.d.ts

import NextAuth, { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}
