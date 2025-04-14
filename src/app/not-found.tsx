"use client";
import React from 'react'
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { MovingBorderButton } from '@/components/MovingBorderButton';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter()
  return (
     <div className="h-screen relative w-full overflow-hidden py-14 bg-slate-900 flex flex-col items-center rounded-lg">
              <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        
              <Boxes />
              <h1 className={cn("md:text-6xl text-center text-2xl text-white relative z-20")}>
              {`Hmmm, that page doesn't exist.`}
              </h1>
              <p className="text-center mt-8 text-base md:text-xl text-neutral-300 relative z-20">
              {`You can get back on track do your work with ease with SK'ask.`}
              </p>
              <div className='mt-12 gap-4 flex items-center justify-center'>
                <div onClick={()=>router.push("/")}>
                <MovingBorderButton  title='Return to Home' bgColor='bg-slate-950' />
                </div>
                    <div onClick={()=>router.push("/dashboard")} >
                <MovingBorderButton title='View Dashboard' bgColor='bg-[#000000]' />
                    </div>
              </div>
            </div>
  );
};

export default NotFound;
