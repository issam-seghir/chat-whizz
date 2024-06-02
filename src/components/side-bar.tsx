import React from "react";
import { DesktopSideBar } from "./desktop-side-bar";
import {MobileFooter} from "./mobile-footer";

export function SideBar({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-full">
            <DesktopSideBar/>
            <MobileFooter/>
			<main className="lg:pl-20 h-full">{children}</main>
		</div>
	);
}
