import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Avatar } from "./avatar";

interface UserBoxProps {
	data: User;
}

export function UserBox({ data }: UserBoxProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();

	const handleClick = useCallback(() => {
		setIsLoading(true);
		axios
			.post("/api/conversations", {
				userId: data.id,
			})
			.then((data) => {
				router.push(`/conversations/${data.data.id}`);
			})
			.finally(() => setIsLoading(false));
	}, [data, router]);

	return (
		<div
			onClick={handleClick}
			className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer "
		>
			<Avatar user={data} />
		</div>
	);
}