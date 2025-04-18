"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface scheme{
    id: string,
    Fname: string,
    Lname: string,
    email: string,
    mobile: string,
    resumelink: string,
    position: string,
    date: string,
    scheduled: boolean,
    pending: boolean
}


const ScheduleMailer=async (email: string,name: string)=>{
    await fetch("api/sendmail",{
        method: "POST",
        body: JSON.stringify({
            to: email,
            subject: `Your Job Appointment is Scheduled`,
            text: `
Dear ${name},

We are pleased to inform you that your appointment has been scheduled.

Appointment Details:
📅 Date: 10 Apr 2025
⏰ Time: 10 am
📍 Location: Dwarahat, Almora Uttarakhand

Please bring required documents and be prepared for the discussion. If you have any questions or need to reschedule, feel free to contact us.

We look forward to meeting you!

Best regards,
CareerPoint
            `
        })
    })
}


const CancelMailer=async (email: string,name: string)=>{
    await fetch("api/sendmail",{
        method: "POST",
        body: JSON.stringify({
            to: email,
            subject: `Cancellation of Your Job Appointment`,
            text: `
Dear ${name},

We regret to inform you that your scheduled appointment has been canceled.

We apologize for any inconvenience this may cause. If necessary, we will reach out to reschedule at a later date. Please feel free to contact us if you have any questions.

Thank you for your understanding.

Best regards,
CareerPoint
            `
        })
    })
}

const Scheduler=async(id: string)=>{
    await fetch("api/schedule",{
        method: "POST",
        body: JSON.stringify({
            id
        })
    })
}

const Canceller=async(id: string)=>{
    await fetch("api/cancel",{
        method: "POST",
        body: JSON.stringify({
            id
        })
    })
}


const NewApplication=()=>{
    const router=useRouter();
    const [application,Setapplication]=useState<scheme[]>([]);

    const deleterApplication=(id: string)=>{
        Setapplication(application.filter((item)=>item.id !== id));
    }

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
    return <div>
        <div className="hidden md:grid grid-cols-6 mt-3 place-items-center bg-gray-100 text-center font-semibold">
            <div className="py-2">Candidate</div>
            <div className="py-2">Position</div>
            <div className="py-2">Contact</div>
            <div className="py-2">Status</div>
            <div className="py-2">Resume</div>
            <div className="py-2">Action</div>
        </div>
        {application.map((item, id) => (
                    <div key={id} className="grid grid-cols-1 md:grid-cols-6 place-items-center text-center py-2 border-b border-gray-200">
                    <div>{item.Fname}</div>
                    <div>{item.position}</div>
                    <div className="flex flex-col items-center">
                        <div>{item.email}</div>
                        <div className="text-gray-500">{item.mobile}</div>
                    </div>
                    <div className="font-semibold text-yellow-600">New</div>
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
                    <div className="flex gap-2">
                        <button
                        onClick={() => {
                            deleterApplication(item.id);
                            Scheduler(item.id);
                            ScheduleMailer(item.email, item.Fname);
                        }}
                        className="text-green-600 cursor-pointer"
                        >
                        Schedule
                        </button>
                        <button
                        onClick={() => {
                            deleterApplication(item.id);
                            Canceller(item.id);
                            CancelMailer(item.email, item.Fname);
                        }}
                        className="text-red-500 cursor-pointer"
                        >
                        Cancel
                        </button>
                    </div>
                    </div>
                ))}
    </div>
}

export default NewApplication;