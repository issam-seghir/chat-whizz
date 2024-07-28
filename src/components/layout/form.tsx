"use client";
import { CldUploadButton } from "next-cloudinary";

import useConversation from "@/hooks/useConverstaion";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "../conversation/message-input";
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
	const handleUpload = (result:any) => {
		axios.post("/api/messages",{
			image : result?.info?.secure_url,
			conversationId
		})
	}
	return (
		<div className="py-4 px-4 bg-card border-t flex items-center gap-2 lg:gap-4 w-full">
			<CldUploadButton options={{ maxFiles: 1 }} onSuccess={handleUpload} uploadPreset="fyjlpc4m">
				<HiPhoto size={30} className="text-primary" />
			</CldUploadButton>
			<form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
				<MessageInput id="message" placeholder="Type a message" required register={register} errors={errors} />
				<button
					type="submit"
					className=" rounded-full p-2  bg-primary cursor-pointer hover:bg-primary/55 transition"
				>
					<HiPaperAirplane size={18} className="text-white" />
				</button>
			</form>
		</div>
	);
}
