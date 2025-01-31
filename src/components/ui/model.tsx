import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { IoClose } from "react-icons/io5";

import React from "react";
interface ModelProps {
	isOpen?: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export function Model({ isOpen, onClose, children }: ModelProps) {
	return (
		<Transition show={isOpen} as={React.Fragment}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				<TransitionChild
					as="div"
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</TransitionChild>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full  items-center justify-center p-4 text-center sm:p-0">
						<TransitionChild
							as="div"
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<DialogPanel className=" bg-card  relative transform overflow-hidden rounded-lg shadow-xl transition-all pb-4 px-4 w-full sm:my-8 sm:w-[32rem] sm:p-6">
								<div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block z-10">
									<button
										type="button"
										onClick={onClose}
										className="hover:bg-red-500 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
									>
										<span className="sr-only"> Close</span>
										<IoClose className="h-6 w-6" size={24} />
									</button>
								</div>
								{children}
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
