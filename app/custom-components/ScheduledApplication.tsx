"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

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

interface CancelApplicationProps{
    SearchCandidate: string,
    SearchBy: string
  }

const ScheduledApplication=({SearchCandidate,SearchBy}: CancelApplicationProps)=>{
    const router=useRouter();
    const [applications,Setapplication]=useState<Scheme[]>([]);
    const [currentPage,SetcurrentPage]=useState(1);
    const [paginatingApplication,SetPaginatingApplication]=useState<Scheme[]>([]);
    const [maxPage,SetmaxPage]=useState(0);
    const [SearchedCandidateList,SetSearchCandidatesList]=useState<Scheme[]>([]);


    const PaginatingFunction=(arr:Scheme[],currpage:number,pagesize:number)=>{
        let start=(currpage-1)*pagesize;
        let end=start+pagesize;
    
        return arr.slice(start,end);
    }
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
                // SetmaxPage(Math.ceil(data.res.length / 5));
            }
            fetcher();
        },[])

        useEffect(() => {
            if (SearchCandidate.length !== 0) {
                const searchItem = SearchCandidate.toLowerCase();
                const response = applications.filter((item) => {
                    const currItem = 
                        SearchBy === "Name" ? item.Fname.toLowerCase() : 
                        SearchBy === "Mob" ? item.mobile.toLowerCase() : 
                        SearchBy === "Email" ? item.email.toLowerCase() : 
                        item.position.toLowerCase();
                    return currItem.includes(searchItem);
                });
                let Max_page = Math.ceil(response.length / 5);
                SetmaxPage(Max_page);
                SetSearchCandidatesList(response);
        
                const temp = PaginatingFunction(response, currentPage, 5);
                SetPaginatingApplication(temp);
            } else {
                let Max_page = Math.ceil(applications.length / 5);
                SetmaxPage(Max_page);
        
                const temp = PaginatingFunction(applications, currentPage, 5);
                SetPaginatingApplication(temp);
            }
        }, [currentPage, applications, SearchCandidate, SearchBy]);
        

    return <div>
         <div className="hidden md:grid grid-cols-6 mt-3 place-items-center bg-blue-50 text-center font-semibold">
            <div className="py-2">Candidate</div>
            <div className="py-2">Position</div>
            <div className="py-2">Contact</div>
            <div className="py-2">Status</div>
            <div className="py-2">Resume</div>
            <div className="py-2">Emails</div>
        </div>
        {paginatingApplication.length === 0?<div className="flex justify-center items-center pt-8 font-semibold">No Candidates found!</div> : paginatingApplication.map((item, id) => (
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
        <Pagination 
            currentPage={currentPage} 
            onPagefunction={SetcurrentPage} 
            maxPage={maxPage} 
            />

    </div>
}

export default ScheduledApplication;