import React from 'react'
import { FieldErrors , FieldValues,UseFormRegister } from 'react-hook-form'
import clsx from 'clsx';


import { tv } from "tailwind-variants";

export const input = tv({
	base: [
		"block w-full border rounded-md px-3 py-2 bg-secondary transition-shadow text-sm text-foreground placeholder:text-muted-foreground/70",
		"focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-500 dark:focus-visible:ring-brand-400 focus-visible:ring-opacity-75 focus-visible:border-transparent",
	],
});

export const fieldset = tv({
	base: "flex flex-col",
	slots: {
		label: "font-semibold text-sm",
		description: "text-muted-foreground text-xs",
	},
});



interface InputProps {
	label: string;
	id: string;
	type?: string;
	required?: boolean;
	defaultValue?: string;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
	disabled?: boolean;
}

export function Input({
    label,
    id,
	defaultValue,
    type = "text",
    required = false,
    register,
    errors,
    disabled = false,
}: InputProps) {
  return (
		<div>
			<label htmlFor={id} className="block  text-sm font-medium leading-6 ">
				{label}
			</label>
			<div className="mt-2">
				<input
					id={id}
					type={type}
					autoComplete={id}
					defaultValue={defaultValue}
					disabled={disabled}
					{...register(id, { required })}
					className={clsx(
						"form-input block w-full rounded-md border-0 py-1.5 text-dark-700  shadow-sm sm:text-sm  focus:ring-2  sm:leading-6 ",
						errors[id] && "focus:ring-rose-500",
						disabled && "opacity-50 cursor-default"
					)}
				/>
			</div>
		</div>
  );
}
