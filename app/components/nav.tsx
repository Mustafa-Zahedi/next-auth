import Link from "next/link";
import { getServerSession } from "next-auth";
import { Flex, List } from "@mantine/core";

import { authOptions } from "../api/auth/[...nextauth]/authoptions";

export default async function Navigation() {
  const session = await getServerSession(authOptions);
  console.log("session: ", session);

  return (
    // <SessionProvider session={session}>
    <Flex>
      {[
        { title: "Add New User", url: "/users/create" },
        { title: "members", url: "/users/member" },
        { title: "client", url: "/users/client-member" },
        { title: "public", url: "/users" },
        // { title: "denied", url: "/users/denied" },
      ].map((path) => (
        <List p={"md"} key={path.title}>
          <Link href={path.url}>{path.title}</Link>
        </List>
      ))}
      <List p={"md"}>
        {session ? (
          // Signed in as {session?.user?.email} <br />
          <Link href={"/api/auth/signout?callbackUrl=/"}>Sign out</Link>
        ) : (
          <Link href={"/api/auth/signin"}>Sign in</Link>
        )}
      </List>
    </Flex>
    // </SessionProvider>
  );
}
