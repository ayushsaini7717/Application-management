"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

interface Scheme {
  id: string;
  Fname: string;
  Lname: string;
  email: string;
  mobile: string;
  resumelink: string;
  position: string;
  date: string;
  scheduled: boolean;
  pending: boolean;
  Percentage: string
}

interface CancelApplicationProps{
  SearchCandidate: string,
  SearchBy: string
}

const CancelApplication = ({SearchCandidate,SearchBy}: CancelApplicationProps) => {
  const router = useRouter();
  const [applications, Setapplication] = useState<Scheme[]>([]);
  const [currentPage,SetcurrentPage]=useState(1);
  const [paginatingApplication,SetPaginatingApplication]=useState<Scheme[]>([]);
  const [maxPage,SetmaxPage]=useState(0);
  const [SearchedCandidateList,SetSearchCandidatesList]=useState<Scheme[]>([]);
  const [Summary,SetSummary]=useState<string[]>([]);
  const [IsopenSummary,SetIsopenSummary]=useState(false);
  const [summaryLoading,SetSummaryLoading]=useState(false);

  const PaginatingFunction=(arr:Scheme[],currpage:number,pagesize:number)=>{
      let start=(currpage-1)*pagesize;
      let end=start+pagesize;

      return arr.slice(start,end);
  }


  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/cancelapplication", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      Setapplication(data.res);
      // SetmaxPage(Math.ceil(data.res.length / 5));
    };
    fetcher();
  }, []);


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



  return (
    <div>
      <div className={`h-[60vh] w-[40vw] ${!IsopenSummary?"hidden":"block"} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-blue-100 text-black p-4 rounded-md overflow-y-auto`}>
            <div onClick={()=>{
                SetIsopenSummary(false);
            }} className="bold cursor-pointer inline bg-black text-white px-2 py-1 rounded">close X</div>
            <div className="mt-2">{summaryLoading ?<div className="flex justify-center items-center">Loading...</div> : Summary.map((item,i)=>{
                const cleaned=item.replaceAll("*","");
                return <div key={i}>{i+1}-- {cleaned}</div>}
                )}</div>
        </div>
      <div className="hidden md:grid grid-cols-8 mt-3 place-items-center bg-blue-50 text-center font-semibold rounded-md">
        <div className="py-2">Candidate</div>
        <div className="py-2">Position</div>
        <div>Matched (%)</div>
        <div className="py-2">Contact</div>
        <div className="py-2">Status</div>
        <div className="py-2">Resume</div>
        <div className="py-2">Summary</div>
        <div className="py-2">Emails</div>
      </div>

      {paginatingApplication.length === 0?<div className="flex justify-center items-center pt-8 font-semibold">No Candidates found!</div> : paginatingApplication.map((item, id) => (
        <div
          key={id}
          className="grid grid-cols-1 md:grid-cols-8 gap-4 place-items-center text-center py-4 border-b border-gray-200"
        >
          <div className="flex flex-col items-center">
            <div className="font-semibold">{item.Fname}</div>
            <div className="text-sm text-gray-500 md:hidden">{item.position}</div>
          </div>

          <div className="hidden md:block">{item.position}</div>
          <div>{item.Percentage!=null ? item.Percentage : <div>-</div>}</div>

          <div className="flex flex-col items-center">
            <div>{item.email}</div>
            <div className="text-gray-500 text-sm">{item.mobile}</div>
          </div>

          <div className="text-red-600 font-semibold">Cancelled</div>

          <div>
            <button
              className="cursor-pointer border border-gray-300 shadow rounded px-3 py-1 hover:bg-gray-100 transition"
              onClick={() => {
                router.push(item.resumelink);
              }}
            >
              View Resume
            </button>
          </div>
          <div>
                    <button
                        className="cursor-pointer border border-gray-300 shadow rounded px-2 py-1"
                        onClick={()=>{
                            const summarizer=async ()=>{
                                SetSummaryLoading(true);
                                SetIsopenSummary(true);
                                const id=item.id;
                                const res=await fetch("/api/summarizer",{
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({id})
                                })
                                const data=await res.json();
                                const arr=data.summary.split(". ");
                                SetSummary(arr);
                                SetSummaryLoading(false);
                            }
                            summarizer();
                        }}
                        >
                        View Summary
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
  );
};

export default CancelApplication;
