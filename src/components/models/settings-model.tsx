"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useConversation from "@/hooks/useConverstaion";
import { User } from "@prisma/client";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Model } from "../ui/model";

interface SettingsModelProps {
	isOpen?: boolean;
	onClose: () => void;
	currentUser: User | null;
}

export function SettingsModel({ isOpen, onClose, currentUser }: SettingsModelProps) {
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
			name: currentUser?.name,
			image: currentUser?.image,
		},
	});
	const image = watch("image");

	const handleUpload = (result: any) => {
		setValue("image", result?.info?.secure_url, {
			shouldValidate: true,
		});
	};

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			setIsLoading(true);
			const response = await axios.post("/api/settings", data);
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
						<h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600"> Edit your public information</p>
						<div className="mt-10 mb-4 flex flex-col gap-y-8">
							<Input
								disabled={isLoading}
								label="Name"
								id="name"
								errors={errors}
								required
								register={register}
							/>
						</div>
						<div>
							<label className="block leading-6 font-medium text-sm text-gray-900" htmlFor="">
								Photo
							</label>
							<div className="mt-2 flex items-center gap-x-3">
								<Image
									alt="profile"
									width="48"
									height="48"
									className="rounded-full"
									src={image || currentUser?.image || "https://i.imgur.com/AdFtdpW.png"}
								/>
								<CldUploadButton
									options={{ maxFiles: 1 }}
									onSuccess={handleUpload}
									uploadPreset="fyjlpc4m"
								>
									<Button disabled={isLoading} color="secondary">
										Change
									</Button>
								</CldUploadButton>
							</div>
						</div>
					</div>
					<div className="mt-6  flex items-center justify-end gap-x-6">
						<Button disabled={isLoading} color="secondary" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit" disabled={isLoading}>
							Save
						</Button>
					</div>
				</div>
			</form>
		</Model>
	);
}
