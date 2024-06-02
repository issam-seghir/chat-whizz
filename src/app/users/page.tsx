"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/button";
import { EmptyState } from "../../components/empty-state";

export default function Users() {
	const router = useRouter();

	const session = useSession({
		required: true,
		onUnauthenticated() {
			// The user is not authenticated, redirect to login page
			router.push("/");
		},
	});
	return (
		<div className="hidden lg:block lg:pl-80 h-full">
			<EmptyState />
			<Button type="button" onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
				Sign Out
			</Button>
		</div>
	);
}
