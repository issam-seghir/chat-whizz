"use client";

import { signOut } from "next-auth/react";
import { Button } from "../../components/button";

export default function Users() {
	return (
		<Button
			type="button"
			onClick={() => signOut({ callbackUrl: '/', redirect:true })}>
			Sign Out
		</Button>
	);
}
