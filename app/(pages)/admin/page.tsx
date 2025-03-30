"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface scheme{
    Fname: string,
    Lname: string,
    email: string,
    mobile: string,
    resumelink: string
}
const AdminPage=()=>{
    const router=useRouter();
    const [applications,Setapplication]=useState<scheme[]>([]);
    const [cookie,setcookie]=useState("");
    const [IsApplication,SetIsapplication]=useState(true);
    useEffect(()=>{
        const fetcher=async ()=>{
            const response=await fetch("/api/fetchcandidate",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data=await response.json();
            Setapplication(data.details);
        }
        fetcher();
        let isCookie=Cookies.get("user-admin") || "";
        setcookie(isCookie);
    },[])
    if(cookie === "true"){
        return <>
        <div className="px-2">
            <div className="flex justify-between mt-2">
                <h1 className="font-bold text-3xl pt-4">Admin Dashboard</h1>
                <div>
                    <button onClick={()=>{
                        Cookies.remove("user-admin");
                        router.push("/");
                    }} className="px-2 py-1 hover:bg-gray-200 rounded cursor-pointer flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                    </ svg>
                     Log out</button>
                </div>
            </div>

            <div className="flex mt-3 font-bold gap-2 bg-gray-100 w-fit px-2 py-3 rounded">
                <div>
                    <button className={`cursor-pointer ${IsApplication?"bg-white px-1 rounded": "bg-gray-100"}`}  onClick={()=>SetIsapplication(true)}>Applications</button>
                </div>
                <div>
                    <button className={`cursor-pointer ${!IsApplication?"bg-white px-1 rounded": "bg-gray-100"}`} onClick={()=>SetIsapplication(false)}>Job openings</button>
                </div>
            </div>

        {IsApplication? <div className="w-[100%] border border-gray-400 rounded shadow-md mt-4">
                <div className="text-2xl font-bold pl-1">
                    <h2>Candidate Applications</h2>
                </div>
                <div className="text-md font-medium text-gray-600 pl-1">
                    <h4>View and manage all job applications.</h4>
                </div>

                <div className="grid grid-cols-6 mt-3 place-items-center bg-gray-100">
                    <div className="font-semibold py-1">Candidate</div>
                    <div className="font-semibold py-1">Position</div>
                    <div className="font-semibold py-1">Contact</div>
                    <div className="font-semibold py-1">Applied</div>
                    <div className="font-semibold py-1">Resume</div>
                    <div className="font-semibold py-1">Action</div>

                </div>
                    {applications.map((item,id)=>{
                        return <div key={id} className="grid grid-cols-6 place-items-center">
                            <div>{item.Fname}</div>
                            <div>Software Engineer</div>
                            <div className="flex flex-col place-items-center">
                                <div>{item.email}</div>
                                <div className="text-gray-500">{item.mobile}</div>
                            </div>
                            <div>30-aug-2025</div>
                            <div>
                                <button className="cursor-pointer border border-gray-300 shadow rounded px-2 py-1" onClick={()=>{
                                    router.push(item.resumelink);
                                }}>View Resume</button>
                            </div>
                            <div className="flex gap-2">
                                <button className="text-green-600">Schedule</button>
                                <button className="text-red-500">Cancel</button>
                            </div>
                        </div>
                    })}
            </div>:<div className="w-[100%] border border-gray-400 rounded shadow-md mt-4">

                    <div className="flex justify-between">
                        <div className="flex flex-col text-md font-medium text-gray-600 pl-1">
                            <div className="text-2xl font-bold pl-1 text-black">
                                <h2>Job Openings</h2>
                            </div>
                            <div>
                                <h4>Manage your current job listings.</h4>
                            </div>
                        </div>
                        <div>
                        <button onClick={()=>{
                            router.push("/admin?add-job=true");
                        }} className="flex mt-2 mr-2 gap-1 border border-white bg-black text-white py-1 px-2 rounded hover:bg-black/80 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Add New Job</button>
                    </div>
                    </div>

                {/* <div className="text-2xl font-bold pl-1">
                    <h2>Job Openings</h2>
                </div>
                <div className="flex justify-between text-md font-medium text-gray-600 pl-1">
                    <div>
                        <h4>Manage your current job listings.</h4>
                    </div>
                    <div>
                        <button className="flex gap-1 border border-white bg-black text-white py-1 px-2 rounded hover:bg-black/80 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Add New Job</button>
                    </div>
                </div> */}

                
            </div>}
            
        </div>
    </>
    }
    return <div className="flex justify-center items-center h-screen">
        You are not suppossed to access this page!
    </div>
}

export default AdminPage;
