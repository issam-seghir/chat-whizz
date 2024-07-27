import Image from "next/image";
import { Suspense } from "react";
import AuthForm from "../components/forms/auth-form";
import { FormSkeleton } from "../components/forms/form-skeleton";

export default function Home() {
	return (
		<div className="flex min-h-full flex-col justify-center py-12 sm: px-6 lg:px-8 bg-gradient-to-b from-light-50 to-light-400 dark:from-dark-600 dark:to-dark-950 ">
			<div className="sm:mx-auto sm:w-full sm:max-w-md ">
				<Image alt="logo" height="48" width="48" className="mx-auto w-auto" src="/logo.png" />
				<h2 className="mt-6 text-center text-3xl font-bold tracking-tight ">
					Sign in to ChatWhizz 🐋
				</h2>
				<Suspense fallback={<FormSkeleton />}>
					<AuthForm />
				</Suspense>
			</div>
		</div>
	);
}
