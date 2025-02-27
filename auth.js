import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Google from "next-auth/providers/google";
import db from "@/db";

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  console.log("AUTH_GOOGLE_ID:", process.env.AUTH_GOOGLE_ID);
  return {
    adapter: DrizzleAdapter(db),
    providers: [
      Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
      }),
    ],
  };
});
