"use client";
import useOtherUser from "@/hooks/useOtherUser";
import { Dialog, Transition, TransitionChild, DialogPanel } from "@headlessui/react";
import {IoClose} from "react-icons/io5";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo } from "react";
interface ProfileDrawerProps {
	data: Conversation & {
		users: User[];
	};
	isOpen: boolean;
	onClose: () => void;
}

export function ProfileDrawer({ data, isOpen, onClose }: ProfileDrawerProps) {
	const otherUser = useOtherUser(data);
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
							<div className="fixed pointer-events-none inset-y-0 right-0 flex max-w-full pl-10">
								<TransitionChild
									as={Fragment}
									enter="transform transition ease-in-out duration-500"
									enterFrom="translate-x-0"
									leave="transform transition ease-in-out duration-500"
									leaveTo="translate-x-full"
								>
									<DialogPanel className="pointer-events-none w-screen max-w-md">
										<div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
											<div className="px-4 sm:px-6">
												<div className="flex items-start justify-end">
													<div className="ml-3 flex h-7 items-center">
														<button
															type="button"
															className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:outline-none focus:ring-sky-500 focus:ring-offset-2"
														>
															<span className="sr-only">Close panel</span>
															<IoClose size={24} />
														</button>
													</div>
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
