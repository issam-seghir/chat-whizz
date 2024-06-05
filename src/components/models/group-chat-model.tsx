"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useConversation from "@/hooks/useConverstaion";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Model } from "../ui/model";
import Select from "../ui/select";

interface GroupChatModelProps {
	isOpen?: boolean;
	onClose: () => void;
	users: User[];
}

export function GroupChatModel({ users, isOpen, onClose }: GroupChatModelProps) {
	console.log(users);
	const router = useRouter();
	const { conversationId } = useConversation();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		reset,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			members: [],
		},
	});
	const members = watch("members");

	const handleUpload = (result: any) => {
		setValue("image", result?.info?.secure_url, {
			shouldValidate: true,
		});
	};

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			setIsLoading(true);
			const response = await axios.post("/api/conversations", {...data,isGroup:true});
			if (response) {
				router.refresh();
				onClose();
			}
		} catch (error: any) {
			console.log(error);
			toast.error("something wrong");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Model isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="text-left space-y-12">
					<div className="border-b border-gray-900/10 pb-12">
						<h2 className="text-base font-semibold leading-7 text-gray-900">Create a Group Chat</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600"> Create a chat with more than 2 people </p>
						<div className="mt-10 mb-4 flex flex-col gap-y-8">
							<Input
								disabled={isLoading}
								label="Name"
								id="name"
								errors={errors}
								required
								register={register}
							/>
							<Select
								disabled={isLoading}
								label="Members"
								options={users?.map((user) => ({
									value : user.id,
									label : user.name
								}))}
								onChange={(value) => setValue("members", value,{shouldValidate :true})}
							/>
						</div>
					</div>
					<div className="mt-6  flex items-center justify-end gap-x-6">
						<Button disabled={isLoading} secondary onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit" disabled={isLoading}>
							Create
						</Button>
					</div>
				</div>
			</form>
		</Model>
	);
}
