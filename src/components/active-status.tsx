"use client"



import React from 'react'
import useActiveChannel from "@/hooks/useActiveChannel";

export  function ActiveStatus() {
  useActiveChannel()
  return null;
}
