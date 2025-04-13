"use client"
import {HomeName} from "@/components/HomeName"
import {Textflip} from "@/components/Textflip"
import { MeteorCard } from '@/components/MeteorCard';


export default function Home() {
  return (
    <div className="h-screen overflow-hidden justify-center bg-[#090909] w-full flex flex-row p-4 pb-12">
      <div className="md:w-[50vw] text-center">
       
 <HomeName />

 <div className="flex flex-col justify-center items-center ">
           <h1 className="w-max text-4xl md:text-5xl xl:text-6xl mb-4 text-[#938967] font-serif flex items-center gap-2 flex-col 2xl:flex-row">
           Make Your ideas,
             <Textflip />
           </h1>
           <p className="text-[#938967] text-xl sm:text-[16px] lg:text-xl w-[90vw] pr-3">
             Privacy-first AI that helps you create in confidence.
           </p>
           
         </div>
 <div className=' mt-12 md:mt-20 block lg:block'>
    <MeteorCard />
 </div>

        
       </div>
       <div className="-m-4 hidden md:block ml-auto bg-[url('/1e423e66-0f34-4daa-8700-c0b84d3577ce.webp')] bg-cover bg-no-repeat bg-center h-screen w-[54vw] shadow-[0_0_40px_10px_#52ced6]/30 backdrop-blur-md ">
       </div>

      <div className="bg-[#52ced6]/30 absolute top-20 left-0 w-96 h-40 rotate-45 origin-top-left blur-3xl"></div>
      <div className="bg-[#52ced6]/30 absolute top-20 right-16 w-80 h-20 -rotate-45 origin-top-right blur-3xl"></div>
     </div>
  );
}
