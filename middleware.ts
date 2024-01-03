import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// export { default } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Only subscribed users can access to this route
    if (
      req.nextUrl.pathname === "/users/news" &&
      req.nextauth.token?.role !== "subscribed"
    ) {
      return NextResponse.rewrite(new URL("/users/denied", req.url));
    }
  },
  // If users are loggend in can access to this route
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/users/news"],
};
