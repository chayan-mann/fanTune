import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
  },
  {
    callbacks: {
      // This callback determines if the user is authorized.
      // `!!token` converts the token object (or null) to a boolean.
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    '/dashboard', 
    '/rooms',     
    '/rooms/:path*', 
  ],
}
