import React from 'react'
import { FieldErrors , FieldValues,UseFormRegister } from 'react-hook-form'
import clsx from 'clsx';

interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
    }

export function Input({
    label,
    id,
    type = "text",
    required = false,
    register,
    errors,
    disabled = false,
}: InputProps) {
  return (
		<div>
			<label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
				{label}
			</label>
			<div className="mt-2">
				<input
					id={id}
					type={type}
					autoComplete={id}
					disabled={disabled}
					{...register(id, { required })}
					className={clsx(
						"form-input block w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm sm:text-sm ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-sky-600 sm:leading-6 ",
						errors[id] && "focus:ring-rose-500",
						disabled && "opacity-50 cursor-default"
					)}
				/>
			</div>
		</div>
  );
}
