import { FullMessage } from "@/libs/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Avatar } from "../ui/avatar";
interface MessageBoxProps {
	data: FullMessage;
	isLast?: boolean;
}

export default function MessageBox({ data, isLast }: MessageBoxProps) {
	const session = useSession();
	const isOwn = data?.sender?.email === session.data?.user?.email;
	const seenList = (data.seen || [])
		.filter((user) => user.email !== data?.sender?.email)
		.map((user) => user.name)
		.join(", ");

	const continer = clsx("flex gap-3 p-4 ", isOwn && "justify-end", data?.image ? "items-start" : "items-center");
	const avatar = clsx("rounded-full w-fit h-fit cursor-pointer ", isOwn && "order-2");
	const body = clsx("flex flex-col gap-2 ", isOwn && "items-end");
	const message = clsx(
		"text-sm w-fit overflow-hidden",
		isOwn ? "text-primary-foreground bg-primary" : "text-muted-foreground bg-secondary",
		data?.image ? "rounded-md p-0 border-none" : "rounded-full py-2 px-3"
	);
	return (
		<div className={continer}>
			<div className={avatar}>
				<Avatar user={data.sender} />
			</div>
			<div className={body}>
				<div className="flex items-center gap-1">
					<div className="text-muted-foreground text-sm truncate">{data.sender.name}</div>
					<div className="text-muted-foreground text-xs truncate">
						{format(new Date(data.createdAt), "p")}
					</div>
				</div>
				<div className={message}>
					{data.image && (
						<Image
							className="rounded-md object-cover cursor-pointer hover:scale-110 transition "
							src={data.image}
							width={240}
							height={240}
							alt="image"
						/>
					)}
					{data.body}
				</div>
				<div>
					{isOwn && seenList.length > 0 && (
						<div className="text-xs font-light text-gray-500"> Seen By {seenList}</div>
					)}
				</div>
			</div>
		</div>
	);
}
