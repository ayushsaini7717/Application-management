"use client";
import { useRouter } from "next/navigation";
const BacktohomeBtn=()=>{
    const router=useRouter();
    return <>
        <button onClick={()=>{
            router.push("/");
        }} className="flex justify-end gap-2 hover:bg-gray-100 rounded p-1 cursor-pointer text-purple-500">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                        </svg>
                    </span>
                    <span className="pr-2 font-bold">
                        Back to Home
                    </span>
                </button>
    </>
}

export default BacktohomeBtn;