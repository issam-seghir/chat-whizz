"use client";
import useOtherUser from "@/hooks/useOtherUser";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo } from "react";
import { IoClose, IoTrash } from "react-icons/io5";
import { Avatar } from "./avatar";
import { Model } from "./model";
import { useState } from "react";


interface ProfileDrawerProps {
	data: Conversation & {
		users: User[];
	};
	isOpen: boolean;
	onClose: () => void;
}

export function ProfileDrawer({ data, isOpen, onClose }: ProfileDrawerProps) {
	const otherUser = useOtherUser(data);
	const [isModelOpen , setIsModelOpen] = useState(false)
	const joinedDate = useMemo(() => {
		if (otherUser?.createdAt) {
			const date = new Date(otherUser.createdAt);
			if (!isNaN(date.getTime())) {
				// check if date is valid
				return format(date, "PP");
			}
		}
		return "N/A"; // return a default value if date is not valid
	}, [otherUser?.createdAt]);
	const title = useMemo(() => {
		return data.name || otherUser?.name || "Profile";
	}, [data.name, otherUser?.name]);

	const statusText = useMemo(() => {
		if (data.isGroup) return `${data.users.length} members`;
		return "Active";
	}, [data]);
	return (
		<Transition show={isOpen} as={Fragment}>
			<Model isOpen={isModelOpen} onClose={() => setIsModelOpen(false)}>
				<div className="bg-white p-5 ">
					<p>Hello model </p>
				</div>
			</Model>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				<TransitionChild
					as="div"
					enter="ease-out duration-500"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-500"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-40" />
					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div
								className="fixed
																														inset-y-0 right-0 flex max-w-full pl-10"
							>
								<TransitionChild
									as={Fragment}
									enter="transform transition ease-in-out duration-500"
									enterFrom="translate-x-0"
									leave="transform transition ease-in-out duration-500"
									leaveTo="translate-x-full"
								>
									<DialogPanel className="w-screen max-w-md">
										<div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
											<div className="px-4 sm:px-6">
												<div className="flex items-start justify-end">
													<div className="ml-3 flex h-7 items-center">
														<button
															onClick={onClose}
															type="button"
															className="rounded-md cursor-pointer bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:outline-none focus:ring-sky-500 focus:ring-offset-2"
														>
															<span className="sr-only">Close panel</span>
															<IoClose size={24} />
														</button>
													</div>
												</div>
											</div>
											<div className="relative mt-6 flex-1 px-4 sm:px-6">
												<div className="flex flex-col items-center">
													<div className="mb-2">
														<Avatar user={otherUser} />
													</div>
													<div className="text-lg font-semibold">{title}</div>
													<div className="text-sm font-light text-neutral-500">
														{statusText}
													</div>
													<div className="flex gap-10 my-8">
														<div onClick={() => setIsModelOpen(true)} className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75">
															<div

																className="h-10 w-10 bg-neutral-100 rounded-full flex items-center justify-center"
															>
																<IoTrash size={20} />
															</div>
															<div className="text-sm font-light text-neutral-600 ">
																Delete
															</div>
														</div>
													</div>
												</div>
												<div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
													<dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
														{!data.isGroup && (
															<div>
																<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
																	Email
																</dt>
																<dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
																	{otherUser?.email}
																</dd>
															</div>
														)}
														{!data.isGroup && (
															<>
																<hr />
																<div>
																	<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
																		Joined
																	</dt>
																	<dd className="mt-1 text-sm  text-gray-900 sm:col-span-2 ">
																		<time dateTime={joinedDate}>{joinedDate}</time>
																	</dd>
																</div>
															</>
														)}
													</dl>
												</div>
											</div>
										</div>
									</DialogPanel>
								</TransitionChild>
							</div>
						</div>
					</div>
				</TransitionChild>
			</Dialog>
		</Transition>
	);
}
