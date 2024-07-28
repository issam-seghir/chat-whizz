import { NextAuthProvider } from "@/contexts/nextauth-provider";
import { ThemeProvider } from "@/contexts/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ActiveStatus } from "@/components/active-status";

const inter = Inter({ subsets: ["latin"] });
// metadata for html head to improve SEO
export const metadata: Metadata = {
	title: "ChatWhizz | Revolutionize Your Conversations",
	description:
		"Step into the future of communication with ChatWhizz. Engage in vibrant conversations, connect effortlessly, and experience unparalleled chat features designed to keep you closer to what matters.",
	openGraph: {
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth" suppressHydrationWarning>
			<body className={inter.className}>
				<NextAuthProvider>
					<Toaster />
					<ActiveStatus />
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem={false}
						storageKey="chatwhizz-theme"
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</NextAuthProvider>
			</body>
		</html>
	);
}
