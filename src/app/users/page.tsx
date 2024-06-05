"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { EmptyState } from "../../components/ui/empty-state";

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
		</div>
	);
}
