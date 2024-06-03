"use client";

import useConversation from "@/hooks/useConverstaion";
import { Conversation, User } from "@prisma/client";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./message-input";
export function Form() {
	const { conversationId } = useConversation();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			message: "",
		},
	});

	const onSubmit = (data: FieldValues) => {
		setValue("message", "", { shouldValidate: true });
		axios.post("/api/messages", {
			...data,
			conversationId,
		});
	};
	return (
		<div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
			<HiPhoto size={30} className="text-sky-500" />
			<form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
				<MessageInput id="message" placeholder="Type a message" required register={register} errors={errors} />

			</form>
		</div>
	);
}
