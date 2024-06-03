import { SideBar } from "../../components/side-bar";
import { getAllUsers } from "@/libs/actions";
import {UserList} from "../../components/user-list";


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
