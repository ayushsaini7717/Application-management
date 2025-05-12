"use client"
import { useRouter } from "next/navigation"
import { useState } from "react";
import '../../styles/underlineGradient.css'
interface props{
    text: string,
    id: string
}
const Btn=({text,id}: props)=>{
    const router=useRouter();
    const [loading,Setloading]=useState(false);
    return <div>
    <button
      onClick={() => {
        Setloading(true);
        router.push(`/job-openings/${id}`);
      }}
      disabled={loading}
      className={`w-full cursor-pointer py-2 rounded-md font-medium text-white transition-colors duration-200 ${
        loading
          ? "bg-blue-300 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {loading ? "Please wait..." : text}
    </button>
  </div>
  
}

export default Btn;