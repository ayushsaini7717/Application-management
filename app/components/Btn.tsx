"use client"
import { useRouter } from "next/navigation"
interface props{
    text: string,
    role: string,
    subRole: string,
    location: string,
    jobType: string
}
const Btn=({text,role,subRole,location,jobType}: props)=>{
    const router=useRouter();
    return <div>
        <button onClick={()=>{
            router.push(`/apply/${role}?subRole=${subRole}&location=${location}&jobType=${jobType}`);
        }} className="text-white bg-black py-1 w-full rounded hover:bg-gray-800">{text}</button>
    </div>
}

export default Btn;