"use client"
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter()
  return (
    <div className="min-h-[100vh] flex flex-col">

      <div className="grow container flex flex-col justify-center items-center pt-12 pb-12">
        <h1 className="text-2xl font-semibold text-center sm:text-4xl">{`Hmmm, that page doesn't exist.`}</h1>
        <p className="text-muted-foreground max-w-[55ch] text-center mt-4 mb-6 sm:text-lg">You can get back on track do your work {`with ease with SK'ask.`}</p>
        <div className="flex gap-2">
        <button onClick={()=>(router.push("/"))} className="bg-gradient-to-r cursor-pointer from-[#52ced6]/50 to-[#52ced6]/10   text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-xl shadow-lg hover:shadow-[0_0_40px_10px_#52ced6]/30 hover:scale-105 transition-all duration-300 ease-in-out">
        Return to Home
</button>
          <button className="hover:border mx-4 px-2 rounded-xl hover:bg-zinc-800" >
            <Link href={"/dashboard"}>View Dashboard</Link>
          </button>
        </div>

        <figure className="mt-10">
          <Image src="/page-not-found.png" width={560} height={373} alt="" />
        </figure>
      </div>
      <div className="bg-[#52ced6]/30 absolute top-20 left-0 w-96 h-40 rotate-45 origin-top-left blur-3xl"></div>
      <div className="bg-[#52ced6]/30 absolute top-20 right-16 w-80 h-20 -rotate-45 origin-top-right blur-3xl"></div>
    </div>
  );
};

export default NotFound;
