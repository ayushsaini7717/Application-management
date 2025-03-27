"use client"
import { useRouter } from "next/navigation"
interface props{
    text: string,
}
const Btn=({text}: props)=>{
    const router=useRouter();
    return <div>
        <button onClick={()=>{
            router.push("/apply/software-engineering");
        }} className="text-white bg-black py-1 w-full rounded hover:bg-gray-800">{text}</button>
    </div>
}

export default Btn;