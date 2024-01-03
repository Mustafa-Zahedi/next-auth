import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      profile(profile) {
        // console.log("profile: ", profile);
        let userRole = "github_user";
        if (profile.email === "malestani21@gmail.com") {
          userRole = "subscribed";
        }
        return { ...profile, role: userRole, id: profile.id + "" };
      },
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      profile(profile) {
        // console.log("google profile: ", profile);
        let userRole = "google_user";
        if (profile.email === "malestani21@gmail.com") {
          userRole = "subscribed";
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
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          name: "email",
          type: "text",
          label: "Email",
          placeholder: "Email",
        },
        password: {
          name: "password",
          type: "password",
          label: "Password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        // console.log("credentials: ", credentials);
        try {
          // Add logic here to look up the user from the credentials provided
          // Get users data from database and check if credentials are valid
          if (credentials?.email === "malestani21@gmail.com") {
            return {
              id: "1",
              name: "Malestani",
              email: "malestani21@gmail.com",
              role: "subscribed",
            };
          }
          if (credentials?.email === "ali@daktilo.me") {
            return {
              id: "2",
              name: "Ali",
              email: "ali@daktilo.me",
              role: "member",
            };
          }

          return null;
        } catch (error) {
          console.log(
            "An error happend while trying to authorize using credentials: ",
            error
          );

          return null;
        }
      },
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
