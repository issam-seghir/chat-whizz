import { getAllUsers } from "@/libs/query";
import { SideBar } from "../../components/layout/side-bar";
import { UserList } from "../../components/user-list";


export default async function UsersLayout({ children }: { children: React.ReactNode }) {
	const users = await getAllUsers();
	return (
		<SideBar>
			<div className="h-full">
				<UserList items={users} />
				{children}
				</div>
		</SideBar>
	);
}
