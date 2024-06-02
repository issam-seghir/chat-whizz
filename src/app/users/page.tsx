"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/button";

export default function Users() {
	const router = useRouter();

	const session = useSession({
		required: true,
		onUnauthenticated() {
			// The user is not authenticated, handle it here.
			router.push("/");
		},
	});
	return (
		<Button type="button" onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
			Sign Out
		</Button>
	);
}
