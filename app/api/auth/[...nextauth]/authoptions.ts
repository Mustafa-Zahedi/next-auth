import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      profile(profile) {
        console.log("profile: ", profile);
        let userRole = "github_user";
        if (profile.email === "malestani21@gmail.com") {
          userRole = "admin";
        }
        return { ...profile, role: userRole, id: profile.id + "" };
      },
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("google profile: ", profile);
        let userRole = "google_user";
        if (profile.email === "malestani21@gmail.com") {
          userRole = "admin";
        }
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }: any) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) token.role = user.role;
      return token;
    },
  },
};
