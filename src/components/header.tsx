import React from 'react'
import { Conversation,User } from '@prisma/client'
import useOtherUser from '@/hooks/useOtherUser'

interface HeaderProps {
  conversation : Conversation & {
    users:User[]
  }
}
export  function Header({ conversation }: HeaderProps) {
  const otherUser = useOtherUser(conversation);
	return <div>Header</div>;
}
