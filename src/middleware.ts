import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Define which routes require authentication
        const { pathname } = req.nextUrl;
        
        // Public routes that don't require authentication
        const publicRoutes = [
          "/",
          "/login",
          "/register",
          "/services",
          "/pricing",
          "/about",
          "/contact",
        ];
        
        if (publicRoutes.includes(pathname)) {
          return true;
        }
        
        // Protected routes require a valid token
        if (token) {
          // Role-based access control
          if (pathname.startsWith("/admin") && token.role !== "ADMIN") {
            return false;
          }
          if (pathname.startsWith("/rider") && token.role !== "RIDER") {
            return false;
          }
          return true;
        }
        
        return false;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};