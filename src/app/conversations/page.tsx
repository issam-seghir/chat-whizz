"use client";
import clsx from "clsx";

import { EmptyState } from "@/components/ui/empty-state";
import useConversation from "@/hooks/useConverstaion";
export default function ConversationsPage() {
	const { isOpen } = useConversation();
	return (
		<div className={clsx("lg:pl-80 lg:justify-center lg:items-center h-full lg:flex", isOpen ? "block" : "hidden")}>
			<EmptyState />
		</div>
	);
}
