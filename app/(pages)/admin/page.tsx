"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import NewApplication from "@/app/custom-components/NewApplication";
import CancelApplication from "@/app/custom-components/CancelApplication";
import ScheduledApplication from "@/app/custom-components/ScheduledApplication";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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


const AdminPage=()=>{
    const router=useRouter();
    const [cookie,setcookie]=useState("");
    const [IsApplication,SetIsapplication]=useState(true);
    const [Jobapplication,SetJobapplications]=useState<jobScheme[]>([]);
    const [Page,Setpage]=useState("first");
    const [SearchCandidate,SetSearchCandidate]=useState("");
    const [SearchBy,SetSearchBy]=useState("Name");


    const deleterjob=(id: string)=>{
        SetJobapplications(Jobapplication.filter((job)=>job.id !== id));
    }
    
   

    useEffect(()=>{
        const fetcher=async ()=>{
            

            const response=await fetch("/api/fetchJobs",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data=await response.json();
            SetJobapplications(data.response);
        }

        fetcher();
        let isCookie=Cookies.get("user-admin") || "";
        setcookie(isCookie);
    },[])
    if (cookie === "true") {
        return (
          <>
            <div className="px-2">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2">
                <h1 className="font-bold text-2xl md:text-3xl pt-4 md:pt-0">Admin Dashboard</h1>
                <div className="mt-2 md:mt-0">
                  <button
                    onClick={() => {
                      Cookies.remove("user-admin");
                      router.push("/");
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200"
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
      
              <div className="flex flex-wrap gap-2 bg-blue-50 w-fit px-4 py-3 rounded font-bold mt-4">
                <button
                  className={`cursor-pointer px-3 py-2 rounded ${
                    IsApplication ? "bg-white" : "bg-gray-100"
                  }`}
                  onClick={() => SetIsapplication(true)}
                >
                  Applications
                </button>
                <button
                  className={`cursor-pointer px-3 py-2 rounded ${
                    !IsApplication ? "bg-white" : "bg-gray-100"
                  }`}
                  onClick={() => SetIsapplication(false)}
                >
                  Job openings
                </button>
              </div>
      
              {IsApplication ? (
                <div className="w-full border border-gray-300 rounded shadow-md mt-4 p-4 cursor-pointer">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h2 className="text-2xl font-bold">Candidate Applications</h2>
                    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                      <div className="w-full md:w-auto">
                        <Select onValueChange={(value) => SetSearchBy(value)}>
                          <SelectTrigger className="w-full md:w-[140px]">
                            <SelectValue placeholder="Search by-" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Name">Name</SelectItem>
                            <SelectItem value="Email">Email</SelectItem>
                            <SelectItem value="Position">Position</SelectItem>
                            <SelectItem value="Mob">Mob</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <input
                        onChange={(e) => SetSearchCandidate(e.target.value)}
                        placeholder="Search"
                        className="w-full md:w-[300px] border-2 border-gray-300 rounded py-2 pl-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
      
                    <div className="flex flex-wrap gap-3 text-lg mt-2 md:mt-0">
                      {[
                        { label: "Pending", page: "first", color: "text-yellow-500" },
                        { label: "Cancelled", page: "second", color: "text-red-500" },
                        { label: "Scheduled", page: "third", color: "text-green-500" },
                      ].map(({ label, page, color }) => (
                        <button
                          key={page}
                          onClick={() => Setpage(page)}
                          className={`px-4 py-2 rounded-md border transition-all duration-300 ${
                            Page === page
                              ? `${color} border-current`
                              : "text-gray-700 border-transparent hover:border-gray-300 hover:text-black"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
      
                  <p className="text-md font-medium text-gray-600 mt-2">
                    View and manage all job applications.
                  </p>
      
                  <div className="mt-4">
                    {Page === "first" ? (
                      <NewApplication SearchCandidate={SearchCandidate} SearchBy={SearchBy} />
                    ) : Page === "second" ? (
                      <CancelApplication SearchCandidate={SearchCandidate} SearchBy={SearchBy} />
                    ) : (
                      <ScheduledApplication SearchCandidate={SearchCandidate} SearchBy={SearchBy} />
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full border border-gray-300 rounded shadow-md mt-4 p-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-black">Job Openings</h2>
                      <p className="text-md font-medium text-gray-600">Manage your current job listings.</p>
                    </div>
                    <button
                      onClick={() => {
                        SetIsapplication(false);
                        router.push("/admin?add-job=true");
                      }}
                      className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 mt-3 md:mt-0"
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
      
                  <div className="hidden md:grid grid-cols-5 place-items-center mt-4 bg-blue-50 py-2 font-medium">
                    <div>Job Title</div>
                    <div>Department</div>
                    <div>Location</div>
                    <div>Type</div>
                    <div>Action</div>
                  </div>
      
                  {Jobapplication.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 md:grid-cols-5 place-items-center text-center py-3 border-b border-gray-200 gap-2 md:gap-0"
                    >
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
                          className="w-6 h-6"
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
        );
      }
      
    return <div className="flex justify-center items-center h-screen">
        You are not suppossed to access this page!
    </div>
}

export default AdminPage;
