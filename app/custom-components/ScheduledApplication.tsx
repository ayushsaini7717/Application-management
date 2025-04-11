"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Scheme{
    id: string,
    Fname: string,
    Lname: string,
    email: string,
    mobile: string,
    resumelink: string,
    position: string,
    date: string,
    scheduled: Boolean,
    pending:Boolean
}

const ScheduledApplication=()=>{
    const router=useRouter();
    const [applications,Setapplication]=useState<Scheme[]>([]);
    
        useEffect(()=>{
            const fetcher=async()=>{
                const res=await fetch("/api/scheduledapplication",{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data=await res.json();
                Setapplication(data.res);
            }
            fetcher();
        },[])
    return <div>
         <div className="hidden md:grid grid-cols-6 mt-3 place-items-center bg-gray-100 text-center font-semibold">
            <div className="py-2">Candidate</div>
            <div className="py-2">Position</div>
            <div className="py-2">Contact</div>
            <div className="py-2">Status</div>
            <div className="py-2">Resume</div>
            <div className="py-2">Emails</div>
        </div>
        {applications.map((item, id) => (
                    <div key={id} className="grid grid-cols-1 md:grid-cols-6 place-items-center text-center py-2 border-b border-gray-200">
                        <div>{item.Fname}</div>
                        <div>{item.position}</div>
                        <div className="flex flex-col items-center">
                            <div>{item.email}</div>
                            <div className="text-gray-500">{item.mobile}</div>
                        </div>
                        <div className="text-green-600 font-semibold">Scheduled</div>
                        <div>
                            <button
                            className="cursor-pointer border border-gray-300 shadow rounded px-2 py-1"
                            onClick={() => {
                                router.push(item.resumelink);
                            }}
                            >
                            View Resume
                            </button>
                        </div>
                        <div>
                            <button
                            className="cursor-pointer border border-gray-300 shadow rounded px-3 py-1 hover:bg-gray-100 transition"
                            onClick={() => {
                                router.push(`/admin?IsMail=true&email=${item.email}`);
                            }}
                            >
                            View Emails
                            </button>
                        </div>
                </div>
        ))}

    </div>
}

export default ScheduledApplication;