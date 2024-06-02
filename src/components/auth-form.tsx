"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import axios, { AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState,useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

type Variant = "login" | "register";

const AuthForm = () => {
	const [variant, setVariant] = useState<Variant>("login");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirectUrl = searchParams.get("from")?.toString() || "/users";
	const session = useSession();

	useEffect(() => {
		if (session.status === "authenticated") {
			router.push(redirectUrl);
		}
	}, [session?.status, router,redirectUrl]);

	const {
		register,
		reset,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues:
			variant === "login"
				? { email: "lorando@gmail.com", password: "123456" }
				: { name: "", email: "", password: "" },
	});

	const toggleVariant = useCallback(() => {
		setVariant(variant === "login" ? "register" : "login");
		reset(
			variant === "login"
				? { name: "", email: "", password: "" }
				: { email: "lorando@gmail.com", password: "123456" }
		);
	}, [variant, reset]);

	const socialAction = async (action: string) => {
		try {
			setIsLoading(true);
			const callback = await signIn(action, { callbackUrl: redirectUrl, redirect: true });

			if ((callback?.ok && !callback?.error) || !callback) {
				toast.success("Login successfully 🚀\n ");
				router.push(redirectUrl);
			}
			if (callback?.error) {
				throw new Error(callback.error);
			}
		} catch (error: any) {
			toast.error(error?.message);
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const onsSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			setIsLoading(true);
			if (variant === "register") {
				const response = await axios.post("/api/register", data);
				if (response) {
					// login user after register
					await signIn("credentials", {
						email: data.email,
						password: data.password,
						redirect: false,
					});
					router.push(redirectUrl);
				}
				toast.success("User created successfully 🎊");
			} else {
				const callback = await signIn("credentials", {
					email: data.email,
					password: data.password,
					redirect: false,
				});

				if (callback?.ok && !callback?.error) {
					toast.success("Login successfully 🚀\n");
					router.push(redirectUrl);
				}
				if (callback?.error) {
					throw new Error(callback.error);
				}
			}
		} catch (error: any) {
			if (error instanceof AxiosError) {
				console.log("------ REGESTER ERROR -----------");
				toast.error(error.response?.data?.error);
			} else if (error instanceof Error) {
				console.log("------ NEXTAUTH LOGIN ERROR -----------");
				toast.error(error?.message);
			} else {
				toast.error("Something wrong happens.");
			}
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="mt-8 sm:max-auto sm:w-full sm:max-w-md">
			<div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
				<form className="space-y-6" onSubmit={handleSubmit(onsSubmit)}>
					{variant === "register" && (
						<Input id="name" label="name" type="text" register={register} errors={errors} />
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
