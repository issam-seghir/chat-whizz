"use client"


import { Fragment } from "react"
import { Dialog, Transition, TransitionChild, DialogPanel } from "@headlessui/react";
import { ClipLoader } from "react-spinners";



export  function LoadingModel() {
  return (
		<Transition show as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={() => {}}>
				<TransitionChild
					as="div"
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-100 bg-opacity-50 transition-opacity" />
				</TransitionChild>
				<div className="fixed inset-0 overflow-hidden z-0">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<DialogPanel>
							<ClipLoader size={40} color="#765eff" />
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</Transition>
  );
}
