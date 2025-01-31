"use client"
import { Button } from "@/components/ui/button";
import useConversation from "@/hooks/useConverstaion";
import { DialogTitle } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import { Model } from "../ui/model";

interface ConfirmModelProps {
	isOpen?: boolean;
	onClose: () => void;
}
export const dynamic = "force-dynamic";
export function ConfirmModel({ isOpen, onClose  }: ConfirmModelProps) {
	const router = useRouter();
	const { conversationId } = useConversation();
	const [isLoading, setIsLoading] = useState(false);

	const onDelete = () => {
		setIsLoading(true);
		axios
			.delete(`/api/conversations/${conversationId}`)
			.then(() => {
				onClose();
				router.push("/conversations");
				router.refresh();
			})
			.catch(() => toast.error("something went wrong !"))
			.finally(() => setIsLoading(false));
	};
	return (
		<Model isOpen={isOpen} onClose={onClose}>
			<div className="sm:flex sm:items-start">
				<div className="mx-auto flex h-12 w-12 flex-shrink-0 rounded-full items-center justify-center bg-red-100 sm:mx-0 sm:h-10 sm:w-10 =">
					<FiAlertTriangle className="h-6 w-6 text-red-600" />
				</div>
				<div className="text-center mt-3 sm:ml-4 sm:mt-0 sm:text-left">
					<DialogTitle as="h3" className="text-base font-semibold leading-6 ">
						Delete Conversation
					</DialogTitle>
					<div className="mt-2">
						<p className="text-sù text-muted-foreground">Are you sure you want to delete this conversation</p>
					</div>
				</div>
			</div>
			<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
				<Button
					className="ml-4"
					disabled={isLoading}
					color="danger"
					onClick={onDelete}
				>
					Delete
				</Button>
				<Button disabled={isLoading} color="secondary" onClick={onClose}>
					Cancel
				</Button>
			</div>
		</Model>
	);
}
