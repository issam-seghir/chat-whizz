import useConversation from "@/hooks/useConverstaion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import { Model } from "./model";
import { DialogTitle } from "@headlessui/react";

interface ConfirmModelProps {
	isOpen?: boolean;
	onClose: () => void;
}

export function ConfirmModel({ isOpen, onClose }: ConfirmModelProps) {
	const router = useRouter();
	const { conversationId } = useConversation();
	const [isLoading, setIsLoading] = useState(false);

	const onDelete = useCallback(() => {
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
	}, [conversationId, router, onClose]);
	return (
		<Model isOpen={isOpen} onClose={onClose}>
			<div className="sm:flex sm:items-start">
				<div className="mx-auto flex h-12 w-12 flex-shrink-0 rounded-full items-center justify-center bg-red-100 sm:mx-0 sm:h-10 sm:w-10 =">
					<FiAlertTriangle className="h-6 w-6 text-red-600" />
				</div>
                <div className="text-center mt-3 sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    Delete Conversation
                </DialogTitle>
                <div className="mt-2">
                    <p className="text-sù text-gray-500">
                        Are you sure you want to delete this conversation
                    </p>
                </div>
                </div>
			</div>
		</Model>
	);
}
