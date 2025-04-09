"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface scheme{
    id: string,
    Fname: string,
    Lname: string,
    email: string,
    mobile: string,
    resumelink: string,
    position: string,
    date: string
}

interface jobScheme{
    id: string,
    title: string,
    department: string,
    location: string,
    type: string,
}

const deletejob=async (id: string)=>{
    await fetch("api/deletejob",{
        method: "POST",
        body: JSON.stringify({
            id
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

const AdminPage=()=>{
    const router=useRouter();
    const [applications,Setapplication]=useState<scheme[]>([]);
    const [cookie,setcookie]=useState("");
    const [IsApplication,SetIsapplication]=useState(true);
    const [Jobapplication,SetJobapplications]=useState<jobScheme[]>([]);

    const deleterjob=(id: string)=>{
        SetJobapplications(Jobapplication.filter((job)=>job.id !== id));
    }
    const deleterApplication=(id: string)=>{
        Setapplication(applications.filter((item)=>item.id !== id));
    }

    useEffect(()=>{
        const fetcher=async ()=>{
            const [response1,response2]=await Promise.all([fetch("/api/fetchcandidate",{
                method: "GET",
                headers: {
                    "Content-Type": "applicatin/json"
                }
            }),fetch("api/fetchJobs",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })]);

            const [data1,data2]=[await response1.json(),await response2.json()];

            Setapplication(data1.details);
            SetJobapplications(data2.response);
        }

        fetcher();
        let isCookie=Cookies.get("user-admin") || "";
        setcookie(isCookie);
    },[])
    if(cookie === "true"){
        return <>
        <div className="px-2">
            <div className="flex flex-col md:flex-row justify-between mt-2">
                <h1 className="font-bold text-2xl md:text-3xl pt-4">Admin Dashboard</h1>
                <div className="mt-2 md:mt-0">
                <button
                    onClick={() => {
                    Cookies.remove("user-admin");
                    router.push("/");
                    }}
                    className="px-3 py-2 hover:bg-gray-200 rounded cursor-pointer flex gap-2 items-center"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                    />
                    </svg>
                    Log out
                </button>
                </div>
            </div>

            <div className="flex flex-wrap mt-3 font-bold gap-2 bg-gray-100 w-fit px-2 py-3 rounded">
                <div>
                <button
                    className={`cursor-pointer ${IsApplication ? "bg-white px-2 rounded" : "bg-gray-100"}`}
                    onClick={() => SetIsapplication(true)}
                >
                    Applications
                </button>
                </div>
                <div>
                <button
                    className={`cursor-pointer ${!IsApplication ? "bg-white px-2 rounded" : "bg-gray-100"}`}
                    onClick={() => SetIsapplication(false)}
                >
                    Job openings
                </button>
                </div>
            </div>

            {IsApplication ? (
                <div className="w-full border border-gray-400 rounded shadow-md mt-4">
                <div className="text-2xl font-bold pl-1">
                    <h2>Candidate Applications</h2>
                </div>
                <div className="text-md font-medium text-gray-600 pl-1">
                    <h4>View and manage all job applications.</h4>
                </div>

                <div className="hidden md:grid grid-cols-6 mt-3 place-items-center bg-gray-100 text-center font-semibold">
                    <div className="py-2">Candidate</div>
                    <div className="py-2">Position</div>
                    <div className="py-2">Contact</div>
                    <div className="py-2">Applied</div>
                    <div className="py-2">Resume</div>
                    <div className="py-2">Action</div>
                </div>

                {applications.map((item, id) => (
                    <div key={id} className="grid grid-cols-1 md:grid-cols-6 place-items-center text-center py-2 border-b border-gray-200">
                    <div>{item.Fname}</div>
                    <div>{item.position}</div>
                    <div className="flex flex-col items-center">
                        <div>{item.email}</div>
                        <div className="text-gray-500">{item.mobile}</div>
                    </div>
                    <div>{item.date}</div>
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
            ) : (
                <div className="w-full border border-gray-400 rounded shadow-md mt-4">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex flex-col text-md font-medium text-gray-600 pl-1">
                    <div className="text-2xl font-bold pl-1 text-black">
                        <h2>Job Openings</h2>
                    </div>
                    <div>
                        <h4>Manage your current job listings.</h4>
                    </div>
                    </div>
                    <div className="mt-2 md:mt-0">
                    <button
                        onClick={() => {
                        SetIsapplication(false);
                        router.push("/admin?add-job=true");
                        }}
                        className="flex items-center gap-1 border border-white bg-black text-white py-2 px-3 rounded hover:bg-black/80 cursor-pointer"
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                        </svg>
                        Add New Job
                    </button>
                    </div>
                </div>

                <div className="hidden md:grid grid-cols-5 mt-3 place-items-center bg-gray-100 font-medium">
                    <div>Job Title</div>
                    <div>Department</div>
                    <div>Location</div>
                    <div>Type</div>
                    <div>Action</div>
                </div>

                {Jobapplication.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-5 place-items-center text-center py-2 border-b border-gray-200">
                    <div className="font-bold">{item.title}</div>
                    <div>{item.department}</div>
                    <div>{item.location}</div>
                    <div>{item.type}</div>
                    <div className="text-red-500 cursor-pointer">
                        <svg
                        onClick={() => {
                            deletejob(item.id);
                            deleterjob(item.id);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                        </svg>
                    </div>
                    </div>
                ))}
                </div>
            )}
            </div>

    </>
    }
    return <div className="flex justify-center items-center h-screen">
        You are not suppossed to access this page!
    </div>
}

export default AdminPage;
