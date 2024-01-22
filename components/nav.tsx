import Link from "next/link";
import { getServerSession } from "next-auth";
import { Flex, List } from "@mantine/core";

import { authOptions } from "../app/api/auth/[...nextauth]/authoptions";

export default async function Navigation() {
  const session = await getServerSession(authOptions);
  console.log("session: ", session);

  return (
    <Flex>
      {[
        { title: "Home", url: "/" },
        { title: "Subscribed", url: "/users/news" },
        { title: "Members", url: "/users/member" },
        { title: "Client", url: "/users/client-member" },
        { title: "Public", url: "/users" },
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
  );
}
