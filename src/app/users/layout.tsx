import { SideBar } from "../../components/side-bar";

export default function UsersLayout({ children }: { children: React.ReactNode }) {
	return (
		<section>
			<SideBar>{children}</SideBar>
		</section>
	);
}
