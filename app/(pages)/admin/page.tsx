"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    },[])
    return <>
        <div className="px-2">
            <div className="flex justify-between mt-2">
                <h1 className="font-bold text-3xl">Admin Dashboard</h1>
                <div>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded cursor-pointer flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                    </ svg>
                     Log out</button>
                </div>
            </div>
            <div className="w-[100%] border border-gray-400 rounded shadow-md mt-4">
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
            </div>
        </div>
    </>
}

export default AdminPage;
