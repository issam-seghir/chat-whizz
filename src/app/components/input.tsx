import React from 'react'
import { FieldErrors , FieldValues,UseFormRegister } from 'react-hook-form'


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
}) : InputProps {
  return (
    <div >
        <label htmlFor={id} className='block text-sm font-medium leading-6 text-gray-900'>
            {label}
        </label>
        <div>
            
        </div>
    </div>
  )
}
