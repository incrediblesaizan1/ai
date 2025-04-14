"use client"
import React, { useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import { HashLoader } from 'react-spinners'

const Page = () => {

   const router = useRouter()

  const {isSignedIn, isLoaded, userId} = useAuth()

  useEffect(() => {
    if(!isLoaded) return

    if(!isSignedIn){
    if(localStorage.getItem("clerkUserId")){
        localStorage.removeItem("clerkUserId")
    }
    }

    if(isSignedIn){
        localStorage.setItem("clerkUserId", userId)
        router.push("/dashboard")
    }

}, [userId, isSignedIn, isLoaded, router])

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md bg-gray-800/50 z-100">
    <HashLoader color="#0080d8" size={140} />
    <div className="bg-[#52ced6]/20 absolute top-20 left-0 w-96 h-40 rotate-45 origin-top-left blur-3xl"></div>
    <div className="bg-[#52ced6]/20 absolute top-20 right-16 w-80 h-20 -rotate-45 origin-top-right blur-3xl"></div>
  </div>
  )
}

export default Page 