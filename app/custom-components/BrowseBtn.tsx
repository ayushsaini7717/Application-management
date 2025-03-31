"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
const BrowseBtn=()=>{
    const [loading,Setloading]=useState(false);
    const router=useRouter();
    return <>
        <button onClick={()=>{
                Setloading(true);
                router.push("/job-openings");
            }}
            className="flex cursor-pointer items-center gap-2 text-white bg-black py-3 px-6 hover:bg-black/80 rounded">
              <span className="font-semibold">{loading ? "Please Wait...": "Browse Openings"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </button>
    </>
}

export default BrowseBtn;