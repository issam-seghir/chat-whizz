"use client";
import clsx from "clsx";
import { IconType } from "react-icons";

interface ButtonProps {
	type: "submit" | "button" | "reset" | undefined;
	fullWidth?: boolean;
	children?: React.ReactNode;
	onClick?: () => void;
	secondary?: boolean;
	danger?: boolean;
	disabled?: boolean;
	className?: string;
	icon?: IconType;
}

export function Button({
	type = "button",
	fullWidth = false,
	children,
	onClick,
	secondary = false,
	danger = false,
	disabled = false,
	className,
	icon: Icon,
}: ButtonProps) {
	return (
		<button
			type={type}
			className={clsx(
				"flex items-center justify-center px-3 py-2 border  rounded-md text-sm font-semibold focus-visible:outline focus-visible:outline-2  focus-visible:outline-offset-2",
				fullWidth && "w-full",
				secondary ? "text-gray-900" : "text-white",
				danger && "text-white bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
				disabled && "opacity-50 cursor-default",
				!secondary && !danger && "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600",
				className
			)}
			onClick={onClick}
			disabled={disabled}
		>
			{Icon && <Icon />}
			{children}
		</button>
	);
}
