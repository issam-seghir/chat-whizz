import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

//? this is a middleware function that will run on every request
//? it will check if the user is authenticated or not (authorization)
//? and redirect them to the appropriate page

// allowedOrigins for CORS
const allowedOrigins = [process.env.NEXTAUTH_URL];

// CORS options
const corsOptions = {
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// 1. Specify protected and public routes
const protectedRoutes = [
	"/users",
	"/users/:path*", //  target all paths under /users
	"/conversations",
	"/conversations/:path*", //  target all paths under /conversations
];
const authRoutes = ["/"];

export default withAuth(
	async function middleware(req) {

		// Check the origin from the request
		const origin = req.headers.get("origin") ?? "";
		const isAllowedOrigin = allowedOrigins.includes(origin);

		// Handle preflighted requests
		const isPreflight = req.method === "OPTIONS";

		if (isPreflight) {
			const preflightHeaders = {
				...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
				...corsOptions,
			};
			return NextResponse.json({}, { headers: preflightHeaders });
		}
		// Handle simple requests
		const response = NextResponse.next();

		if (isAllowedOrigin) {
			response.headers.set("Access-Control-Allow-Origin", origin);
		}

		Object.entries(corsOptions).forEach(([key, value]) => {
			response.headers.set(key, value);
		});

		// 2. Check if the user is authenticated
		const token = await getToken({ req });
		const isAuth = !!token;

		// // 2. Check if the current route is protected or public
		const path = req.nextUrl.pathname;
		const isProtectedRoute = protectedRoutes.includes(path);
		const isAuthRoutes = authRoutes.includes(path);
		if (isAuthRoutes && isAuth) {
			return NextResponse.redirect(new URL("/users", req.url));
		}

		if (!isAuth && !isAuthRoutes) {

			const from = req.nextUrl.search ? path + req.nextUrl.search : path;
			return NextResponse.redirect(new URL(`/?from=${encodeURIComponent(from)}`, req.url));
		}
		return null;
	},
	{
		callbacks: {
			async authorized() {
				// This is a work-around for handling redirect on auth pages.
				// We return true here so that the middleware function above
				// is always called.
				return true;
			},
		},
	}
);

// Routes Middleware should not run on
//! exclude all image types ,
//! if you exclude only png then other image like SVG LOGO will not be displayed
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - robots.txt (robots file)
		 * - sitemap.xml (sitemap file)
		 * - manifest.json (manifest file)
		 * - *.png (image files)
		 */

		"/((?!.*\\.|api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|.*\\.png$).*)",
	],
};
