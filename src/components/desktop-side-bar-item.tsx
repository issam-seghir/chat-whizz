"use client";

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
				className={clsx(
					"group flex gap-x-3 rounded-md text-sm p-3 leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100",
					active && "bg-gray-100 text-black"
				)}
			>
				<Icon className="h-6 w-6 shrink-0" />
				<span className="sr-only">{label}</span>
			</Link>
		</li>
	);
}
