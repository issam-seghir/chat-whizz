import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const allowedOrigins = [process.env.NEXTAUTH_URL];

const corsOptions = {
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const authRoutes = ["/"];

const proxy = withAuth(
	async function authProxy(req) {
		const origin = req.headers.get("origin") ?? "";
		const isAllowedOrigin = allowedOrigins.includes(origin);

		const isPreflight = req.method === "OPTIONS";

		if (isPreflight) {
			const preflightHeaders = {
				...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
				...corsOptions,
			};
			return NextResponse.json({}, { headers: preflightHeaders });
		}

		const response = NextResponse.next();

		if (isAllowedOrigin) {
			response.headers.set("Access-Control-Allow-Origin", origin);
		}

		Object.entries(corsOptions).forEach(([key, value]) => {
			response.headers.set(key, value);
		});

		const token = await getToken({ req });
		const isAuth = !!token;

		const path = req.nextUrl.pathname;
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
				return true;
			},
		},
	}
);

export default proxy;
export { proxy };

export const config = {
	matcher: [
		"/((?!.*\\.|api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|.*\\.png$).*)",
	],
};
