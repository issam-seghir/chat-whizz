"use client";

import clsx from "clsx";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { IconType } from "react-icons";

interface MobileSideBarItemProps {
	href?: Url;
	icon: IconType;
	active?: boolean;
	onClick?: () => void;
}

export function MobileSideBarItem({ icon: Icon, href = "", onClick, active }: MobileSideBarItemProps) {
	const handleClick = () => {
		if (onClick) {
			return onClick();
		}
	};
	return (
		<Link
			onClick={handleClick}
			href={href}
			className={clsx(
				"group flex gap-x-3  text-sm p-4 leading-6 font-semibold w-full justify-center text-gray-500 hover:text-black hover:bg-gray-100",
				active && "bg-gray-100 text-black"
			)}
		>
			<Icon className="h-6 w-6" />
			{/* <span className="sr-only">{label}</span> */}
		</Link>
	);
}
