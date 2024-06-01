import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

// metadata for html head to improve SEO
export const metadata: Metadata = {
	title: "Spectrum Store - Your One-Stop Shop",
	description:
		"Discover a spectrum of possibilities with our wide range of products. Spectrum Store, your one-stop shop for all your needs.",
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
				<Toaster />
				{children}
			</body>
		</html>
	);
}
