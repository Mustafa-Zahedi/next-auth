import { authOptions } from "@/app/api/auth/[...nextauth]/authoptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Member = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/users/member");
  }
  return (
    <div>
      <h2>Member</h2>
      <p>{session.user?.name}</p>
      <p>{session.user?.email}</p>
      <p>{session.user?.role}</p>
    </div>
  );
};

export default Member;
