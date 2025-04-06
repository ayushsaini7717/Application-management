"use client";
import { useRouter } from "next/navigation";
const BackToJobBtn=()=>{
    const router=useRouter();
    return <>
        <button onClick={()=>{router.push("/job-openings")}} className="cursor-pointer flex gap-2 items-center mb-4 text-blue-600 hover:text-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            Back to All Jobs
          </button>
    </>
}

export default BackToJobBtn;