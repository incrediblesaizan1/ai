import { Boxes } from '@/components/ui/background-boxes'
import { SignUp } from '@clerk/nextjs'
import React from 'react'
import { IoIosFlower } from 'react-icons/io'

const Page = () => {
  return (
    <div>
      <div className="h-screen relative w-full overflow-hidden py-4 bg-slate-900 flex flex-col items-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900  [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
             <div className="flex text-[#616161] justify-center items-center mb-4 text-4xl">
               <IoIosFlower className="text-6xl text-[#52ced6]" />
               {`SK'ask`}
             </div>
             <SignUp />
           </div>
         </div>
  )
}

export default Page