import React from 'react'
import { FieldErrors , FieldValues,UseFormRegister } from 'react-hook-form'
import clsx from 'clsx';

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
			<label htmlFor={id} className="block text-sm font-medium leading-6 ">
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
						"form-input block w-full rounded-md border-0 py-1.5   shadow-sm sm:text-sm  focus:ring-2  sm:leading-6 ",
						errors[id] && "focus:ring-rose-500",
						disabled && "opacity-50 cursor-default"
					)}
				/>
			</div>
		</div>
  );
}
