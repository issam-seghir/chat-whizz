"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";

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

	const socialAction = (action: string) => {
		setIsLoading(true);
		console.log(action);
	};

	const onsSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			setIsLoading(true);
			console.log(data);
			console.log(variant);

			if (variant === "register") {
				// register user
				const response = await axios.post("/api/register", data);
				console.log(response);
			} else {
			}
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
					<Button disabled={isLoading} fullWidth type="submit">
						{variant === "login" ? "Sign in" : "Register"}
					</Button>
				</form>
				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-white text-gray-500">Or continue with</span>
						</div>
					</div>
				</div>
				<div className="mt-6 flex gap-2">
					<Button
						icon={BsGoogle}
						onClick={() => socialAction("google")}
						type="button"
						fullWidth
						secondary
						className="hover:bg-gray-50"
						disabled={isLoading}
					></Button>
					<Button
						icon={BsGithub}
						onClick={() => socialAction("github")}
						type="button"
						fullWidth
						secondary
						className="hover:bg-gray-50"
						disabled={isLoading}
					></Button>
				</div>
				<div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500 ">
					<span>{variant === "login" ? "Don't have an account?" : "Already have an account?"}</span>
					<button
						type="button"
						onClick={toggleVariant}
						className="text-sky-500 hover:underline focus:outline-none"
					>
						{variant === "login" ? "Register" : "Login"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
