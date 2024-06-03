"use client";
import clsx from "clsx";

import { EmptyState } from "@/components/empty-state";
import useConversation from "@/hooks/useConverstaion";
export default function ConversationsPage() {
	const { isOpen } = useConversation();
	return (
		<div className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}>
			<EmptyState />
		</div>
	);
}
