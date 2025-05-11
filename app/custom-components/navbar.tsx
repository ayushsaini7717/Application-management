"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { useSession, signOut } from "next-auth/react";
import '../../styles/underlineGradient.css'

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <div className="flex justify-between items-center px-4 py-2 shadow h-[4rem] underlineGradient">
        <div className="flex gap-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-briefcase h-6 w-6"
          >
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            <rect width="20" height="14" x="2" y="6" rx="2" />
          </svg>
          <h2 className="font-bold">CareerPoint</h2>
        </div>

        <ul className="hidden md:flex gap-6 cursor-pointer list-none text-lg items-center">
          <li onClick={() => router.push("/")}>Home</li>
          <li onClick={() => router.push("/job-openings")}>Jobs</li>
          <li onClick={() => router.push("?ismodal=true")}>Admin?</li>
        </ul>

        <div className="flex gap-1">
          


          {session ? (
            <button
              onClick={() => signOut()}
              className="hidden md:block cursor-pointer text-white bg-black px-4 py-2 rounded hover:bg-black/80"
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={() => router.push("/api/auth/signin")}
              className="hidden md:block cursor-pointer text-white bg-black px-4 py-2 rounded hover:bg-black/80"
            >
              Sign in
            </button>
          )}
        </div>

        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isOpen && (
        <ul className="md:hidden flex flex-col items-center gap-4 py-4 bg-white shadow-md">
          <li onClick={() => { router.push("/"); setIsOpen(false); }} className="cursor-pointer">Home</li>
          <li onClick={() => { router.push("/job-openings"); setIsOpen(false); }} className="cursor-pointer">Jobs</li>
          <li onClick={() => { router.push("?ismodal=true"); setIsOpen(false); }} className="cursor-pointer">Admin?</li>
          {!session ? (
            <button
              onClick={() => { setIsOpen(false); router.push("/api/auth/signin"); }}
              className="cursor-pointer text-white bg-black px-4 py-2 rounded hover:bg-black/80"
            >
              Sign in
            </button>
          ) : (
            <button
              onClick={() => { setIsOpen(false); signOut(); }}
              className="cursor-pointer text-white bg-black px-4 py-2 rounded hover:bg-black/80"
            >
              Sign out
            </button>
          )}
        </ul>
      )}
    </>
  );
};

export default Navbar;
