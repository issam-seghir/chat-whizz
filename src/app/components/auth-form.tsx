"use client";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type Variant = "login" | "register";

const AuthForm = () => {
	const [variant, setVariant] = useState<Variant>("login");
	const [isLoading, setIsLoading] = useState<Boolean>(false);
	const toggleVariant = useCallback(() => {
		setVariant(variant === "login" ? "register" : "login");
	}, [variant]);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	const onsSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			setIsLoading(true);
			console.log(data);

			if (variant === "login") {
				// login
			} else {
				// register
			}
			const socialAction = (action: string) => {
				setIsLoading(true);
				console.log(action);
			};
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="mt-8 sm:max-auto sm:w-full sm:max-w-md">
			<div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10"></div>
		</div>
	);
};

export default AuthForm;
