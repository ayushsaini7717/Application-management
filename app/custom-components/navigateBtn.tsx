"use client";
import { useRouter } from "next/navigation";

interface scheme{
    text: string,
    path: string
}
const NavigateBtn=({text,path}: scheme)=>{
    const router=useRouter();
    return <>
        <button
            className="cursor-pointer text-white bg-black px-4 py-2 rounded hover:bg-black/80"
            onClick={()=>{
                router.push(path);
            }}
          >
            {text}
          </button>
    </>
}

export default NavigateBtn;