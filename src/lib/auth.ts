import NextAuth, { type NextAuthConfig } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/encryption";

type GitHubProfile = {
  id?: number | string;
  login?: string;
  avatar_url?: string;
};

export const authConfig = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "database"
  },
  pages: {
    signIn: "/auth/signin"
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: "read:user user:email"
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github" && user.id) {
        const githubProfile = profile as GitHubProfile | undefined;

        await prisma.user.update({
          where: { id: user.id },
          data: {
            githubId: String(githubProfile?.id ?? account.providerAccountId),
            username: githubProfile?.login ?? user.name ?? null,
            avatarUrl: githubProfile?.avatar_url ?? user.image ?? null,
            image: githubProfile?.avatar_url ?? user.image ?? null,
            accessToken: account.access_token
              ? encrypt(account.access_token)
              : undefined
          }
        });
      }

      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role ?? "BUYER";
        session.user.username = user.username;
        session.user.avatarUrl = user.avatarUrl ?? user.image ?? null;
      }

      return session;
    }
  }
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
