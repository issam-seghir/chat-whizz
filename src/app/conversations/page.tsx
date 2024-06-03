"use client";
import clsx from "clsx";

import useConversation from "@/hooks/useConverstaion";
import {EmptyState} from "@/components/empty-state";
export default function ConversationsPage() {
	const { isOpen} = useConversation();
	return (
		<div>
			<EmptyState />
		</div>
	);
}
