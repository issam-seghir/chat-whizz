"use client";
import clsx from "clsx";
import { IconType } from "react-icons";

import { ButtonHTMLAttributes, ComponentProps, forwardRef } from "react";

import { tv } from "tailwind-variants";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/utils";

export const button = tv({
	base: [
		"inline-flex select-none items-center transition-colors justify-center text-start font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand",
		"disabled:opacity-50 disabled:cursor-not-allowed",
	],
	variants: {
		color: {
			primary: [
				"rounded-lg shadow-lg shadow-brand-400/50",
				"bg-brand-500 hover:bg-brand-400 dark:bg-brand-400 text-gray-50 dark:hover:bg-brand-500 dark:shadow-none",
			],
			secondary:
				"rounded-md shadow-lg bg-secondary shadow-brand-500/10 text-secondary-foreground hover:bg-accent dark:shadow-none",
			ghost: "rounded-md text-foreground hover:bg-accent",
			danger: "rounded-md bg-red-500 hover:bg-red-400 dark:bg-red-500 text-gray-50 dark:hover:bg-red-600",
		},
		size: {
			icon: "p-1.5",
			large: "px-6 py-3 text-base",
			medium: "px-4 py-2 text-sm",
			small: "px-3 py-1.5 text-sm",
		},
	},
	defaultVariants: {
		color: "secondary",
		size: "medium",
	},
});

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	type?: "submit" | "button" | "reset" | undefined;
	fullWidth?: boolean;
	color?: "primary" | "secondary" | "ghost" | "danger";
	size?: "large" | "medium" | "small";
	isLoading?: boolean;
	onClick?: () => void;
	disabled?: boolean;
	icon?: IconType;
}


export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			type = "button",
			fullWidth = false,
			color = "primary",
			size = "medium",
			isLoading = false,
			onClick,
			disabled = false,
			icon: Icon,
			className,
			...props
		},
		ref
	) => {
		    const buttonClasses = button({ color, size, className });
		return (
			<button
			type={type}
			ref={ref}
			disabled={isLoading || disabled}
			onClick={onClick}
			{...props}
			className={cn(buttonClasses, { "w-full": fullWidth })}
		>
			{isLoading === true && (
				<div className="mr-2 inline">
					<Spinner size="small" />
				</div>
			)}
			{Icon && <Icon className="mr-2" />}
			{children}
		</button>
		)
	}
);

Button.displayName = "Button";


export interface IconButtonProps extends ComponentProps<"button"> {
	color?: "primary" | "secondary" | "ghost" | "danger";
	size?: "large" | "medium" | "small" | "icon";
	isLoading?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ children, isLoading, color, size, ...props }, ref) => (
		<button {...props} ref={ref} className={button({ color, size, className: props.className })}>
			{isLoading === true ? (
				<div className="inline">
					<Spinner size="small" />
				</div>
			) : (
				children
			)}
		</button>
	)
);

IconButton.displayName = "IconButton";
