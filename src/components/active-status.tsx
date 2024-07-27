"use client"



import React from 'react'
import useActiveChannel from "@/hooks/useActiveChannel";

export  function ActiveStatus() {
  const { activeChannel } = useActiveChannel();
  return <div> {activeChannel ? "Channel is active" : "No active channel"}</div>;
}
