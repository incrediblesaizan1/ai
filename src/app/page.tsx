"use client"
import { useRouter } from 'next/navigation';
import {HomeName} from "@/components/HomeName"
import {Textflip} from "@/components/Textflip"
import { MeteorCard } from '@/components/MeteorCard';


export default function Home() {
  const router = useRouter()
  return (
    <div className="h-screen overflow-hidden justify-center bg-[#090909] w-full flex flex-row p-4 pb-12">
      <div className="w-[50vw] text-center">
       
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
 <div className='mt-20 hidden lg:block'>
    <MeteorCard />
 </div>

 <div onClick={()=>(router.push("/register"))} className=" block lg:hidden cursor-pointer bg-[#1f1f1f] mx-auto content-center px-8 py-8 rounded-3xl md:w-3/4 h-2/7  md:h-3/7 lg:h-4/7 mt-4 border border-zinc-300">
         <button onClick={()=>(router.push("/register"))} className="bg-gradient-to-r cursor-pointer from-[#52ced6]/50 to-[#52ced6]/10   text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-xl shadow-lg hover:shadow-[0_0_40px_10px_#52ced6]/30 hover:scale-105 transition-all duration-300 ease-in-out">
  Start for free
</button>
         </div>
        
       </div>
       <div className="-m-4 hidden md:block ml-auto bg-[url('/1e423e66-0f34-4daa-8700-c0b84d3577ce.webp')] bg-cover bg-no-repeat bg-center h-screen w-[54vw] shadow-[0_0_40px_10px_#52ced6]/30 backdrop-blur-md ">
       </div>

      <div className="bg-[#52ced6]/30 absolute top-20 left-0 w-96 h-40 rotate-45 origin-top-left blur-3xl"></div>
      <div className="bg-[#52ced6]/30 absolute top-20 right-16 w-80 h-20 -rotate-45 origin-top-right blur-3xl"></div>
     </div>
  );
}
