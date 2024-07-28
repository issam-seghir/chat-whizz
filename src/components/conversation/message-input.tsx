import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface MessageInputProps {
	placeholder?: string;
	id: string;
	type?: string;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

export default function MessageInput({
	placeholder = "Type a message",
	id,
	type = "text",
	required = true,
	register,
	errors,
}: MessageInputProps) {
	return (
		<div className="relative w-full">
			<input
				id={id}
				type={type}
				placeholder={placeholder}
                autoComplete={id}
				{...register(id, { required: true })}
				className="text-muted font-light px-4 py-2 w-full rounded-full bg-dark-50  focus:outline-none focus:border-sky-500"
			/>
		</div>
	);
}
