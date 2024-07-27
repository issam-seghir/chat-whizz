"use client";

import useRoutes from "../../hooks/useRoutes";

import { User } from "@prisma/client";
import { useState } from "react";
import { SettingsModel } from "../models/settings-model";
import { Avatar } from "../ui/avatar";
import { DesktopSideBarItem } from "./desktop-side-bar-item";
interface DesktopSideBarProps {
	currentUser: User | null;
}

export function DesktopSideBar({ currentUser }: DesktopSideBarProps) {
	const routes = useRoutes();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<>
			<SettingsModel currentUser={currentUser} isOpen={isOpen} onClose={() => setIsOpen(false)} />

			<div className="hidden  bg-card border-r lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto  lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
				<nav className="mt-4 flex flex-col justify-between">
					<ul role="list" className="flex gap-1  flex-col items-center space-y-1">
						{routes.map((route) => (
							<DesktopSideBarItem key={route.name} {...route} />
						))}
					</ul>
				</nav>
				<nav className="mt-4 flex flex-col justify-between items-center">
					<div onClick={() => setIsOpen(true)} className="cursor-pointer hover:opacity-75 transition">
						<Avatar user={currentUser} />
					</div>
				</nav>
			</div>
		</>
	);
}
