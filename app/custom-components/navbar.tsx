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
        <div>
          <img
            className="h-[40px] cursor-pointer"
            src="https://coloredcow.com/wp-content/themes/ColoredCow/dist/img/logo.png"
            alt="Logo"
          />
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
