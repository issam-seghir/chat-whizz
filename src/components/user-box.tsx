import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Avatar } from "./ui/avatar";
import clsx from "clsx";

interface UserBoxProps {
	data: User;
}
export const dynamic = "force-dynamic";
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
			aria-disabled={isLoading}
			className={clsx(
				"w-full relative mb-3 bg-card  hover:bg-accent flex items-center space-x-3  rounded-lg transition cursor-pointer p-3 "
			)}
		>
			<Avatar user={data} />
			<div className="min-w-0 flex-1">
				<div className="focus:outline-none">
					<div className="flex justify-between items-center mb-1">
						<p className="text-md font-medium">{data.name}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
