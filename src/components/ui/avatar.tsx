"use client"
import React from 'react'
import { User } from "@prisma/client";
import Image from "next/image";
import useActiveList from '@/hooks/useActiveList';
interface AvatarProps {
  user?: User | null
}

export  function Avatar({user}: AvatarProps ) {
	const {members} = useActiveList()
	const isActive = members.includes(user?.email || "")
  return (
		<div className="relative ">
			<div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
				<Image alt="Avatar" src={user?.image || "https://i.imgur.com/AdFtdpW.png"} fill />
			</div>
			{isActive && (
				<span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3"></span>
			)}
		</div>
  );
}
