"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type Variant = "login" | "register";

const AuthForm = () => {
	const [variant, setVariant] = useState<Variant>("login");
	const [isLoading, setIsLoading] = useState<boolean>(false);
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
			<div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
				<form className="space-y-6" onSubmit={handleSubmit(onsSubmit)}>
					{variant === "register" && (
						<Input id="username" label="username" type="text" register={register} errors={errors} />
					)}
					<Input id="password" label="password" type="password" register={register} errors={errors} />

					<Input id="email" label="email" type="email" register={register} errors={errors} />
                    <Button
                    disabled={isLoading}
                    fullWidth
                    onClick={() => {}}
                    type="submit"
                    >
                        {variant === "login" ? "Sign in" : "Register"}
                    </Button>
				</form>
			</div>
		</div>
	);
};

export default AuthForm;
