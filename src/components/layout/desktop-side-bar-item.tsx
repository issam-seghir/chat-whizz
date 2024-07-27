"use client";

import { cn } from "@/utils";
import clsx from "clsx";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { IconType } from "react-icons";

interface DesktopSideBarItemProps {
	label?: string;
	name: string;
	path?: string;
	href?: Url;
	icon: IconType;
	active?: boolean;
	onClick?: () => void;
}

export function DesktopSideBarItem({ label, icon: Icon, href = "", path="", onClick, active }: DesktopSideBarItemProps) {
	const handleClick = () => {
		if (onClick) {
			return onClick();
		}
	};
	return (
		<li onClick={handleClick}>
			<Link
				href={href || path}
				className={cn(
					"group flex flex-row text-sm leading-6 font-semibold  text-muted-foreground items-center px-3 -mx-3 py-2 rounded-xl",
					active ? "bg-accent text-accent-foreground" : "hover:bg-accent/50 transition-colors"
				)}
			>
				<Icon className="h-6 w-6 shrink-0" />
				<span className="sr-only">{label}</span>
			</Link>
		</li>
	);
}
