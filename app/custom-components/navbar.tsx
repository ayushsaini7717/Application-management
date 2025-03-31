"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <>
      <div className="flex justify-between items-center px-4 py-2 shadow h-[4rem] bg-white">
        <div className="flex gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase h-6 w-6"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path><rect width="20" height="14" x="2" y="6" rx="2"></rect></svg>
          <h2 className="font-bold">
            CareerPoint
            </h2>
        </div>

        <ul className="hidden md:flex gap-6 cursor-pointer list-none text-lg">
          <li>Home</li>
          <li>Jobs</li>
          <li>About</li>
          <li
            onClick={() => {
              router.push("?ismodal=true");
            }}
          >
            Admin?
          </li>
        </ul>

        <button className="hidden md:block cursor-pointer text-white bg-black px-4 py-2 rounded hover:bg-black/80">
          View All Jobs
        </button>

        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 bg-white shadow-md">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Jobs</li>
          <li className="cursor-pointer">About</li>
          <li
            className="cursor-pointer"
            onClick={() => {
              router.push("?ismodal=true");
              setIsOpen(false);
            }}
          >
            Admin?
          </li>
          <button onClick={() => {
              setIsOpen(false);
              router.push("/job-openings");
            }}
            className="cursor-pointer text-white bg-black px-4 py-2 rounded hover:bg-black/80"
          >
            View All Jobs
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
