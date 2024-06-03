"use client";

import useConversation from "@/hooks/useConverstaion";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import { HiPaperAirplane } from "react-icons/hi2";
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
				<button
					type="submit"
					className=" rounded-full p-2  bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
				>
					<HiPaperAirplane size={18} className="text-white" />
				</button>
			</form>
		</div>
	);
}
