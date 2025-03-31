"use client"
import { useRouter } from "next/navigation"
import { useState } from "react";
interface props{
    text: string,
    role: string,
    subRole: string,
    location: string,
    jobType: string
}
const Btn=({text,role,subRole,location,jobType}: props)=>{
    const router=useRouter();
    const [loading,Setloading]=useState(false);
    return <div>
        <button onClick={()=>{
            Setloading(true);
            router.push(`/apply/${role}?subRole=${subRole}&location=${location}&jobType=${jobType}`);
        }} className="text-white cursor-pointer bg-black py-1 w-full rounded hover:bg-gray-800">{loading ? "Please wait..." : text}</button>
    </div>
}

export default Btn;