"use client";
import { useRouter } from "next/navigation";
const Navbar=()=>{
  const router=useRouter();
    return <>
        <div className="flex justify-between px-2 pt-2 shadow items-center h-[4rem]">
          <div>
            <img className="h-[40px] cursor-pointer" src="https://coloredcow.com/wp-content/themes/ColoredCow/dist/img/logo.png"></img>
          </div>
          <div className="flex gap-4 cursor-pointer list-none">
            <li>Home</li>
            <li>Jobs</li>
            <li>About</li>
            <li onClick={()=>{
              router.push("?ismodal=true");
            }}>Admin?</li>
          </div>
          <div>
            <button className="cursor-pointer text-white bg-black px-2 py-1 rounded hover:bg-black/80">View All Jobs</button>
          </div>
        </div>
    </>
}

export default Navbar;