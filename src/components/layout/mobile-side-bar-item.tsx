"use client";

import { cn } from "@/utils";
import clsx from "clsx";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { IconType } from "react-icons";

interface MobileSideBarItemProps {
	path?: string;
	href?: Url;
	icon: IconType;
	active?: boolean;
	onClick?: () => void;
}

export function MobileSideBarItem({ icon: Icon, href = "",path="", onClick, active }: MobileSideBarItemProps) {
	const handleClick = () => {
		if (onClick) {
			return onClick();
		}
	};
	return (
		<Link
			onClick={handleClick}
			href={href || path}
			className={cn(
				"group flex flex-row text-sm leading-6 w-full font-semibold  text-muted-foreground justify-center p-4 ",
				active ? "bg-accent text-accent-foreground" : "hover:bg-accent/50 transition-colors"
			)}
		>
			<Icon className="h-6 w-6" />
			{/* <span className="sr-only">{label}</span> */}
		</Link>
	);
}
