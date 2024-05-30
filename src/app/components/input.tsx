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
    <div >
        <label htmlFor={id} className='block text-sm font-medium leading-6 text-gray-900'>
            {label}
        </label>
        <div className='mt-2'>
            <input id={id} type={type} autoComplete={id} disabled={disabled} {...register(id,{required})}
            className={clsx(
                "form-input" ,
                "block w-full rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300",

            )}/>

        </div>
    </div>
  )
}
