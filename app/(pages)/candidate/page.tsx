// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function ProtectedPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/api/auth/signin"); 
//     }
//   }, [status, router]);

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   if (session) {
//     return (
//       <div>
//         <h1>Protected Page</h1>
//         <p>Welcome, {session.user?.name || session.user?.email}</p>
//       </div>
//     );
//   }

//   return null; 
// }
import JobCard from "@/app/custom-components/JobCard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import "../../../styles/underlineGradient.css";
import { redirect } from "next/navigation";

interface applicationSchema{
  id: string,
  Fname: string,
  Lname: string,
  email: string,
  mobile: string,
  resumelink: string,
  position: string,
  date: string,
  scheduled: boolean,
  pending: boolean,
  UserId: string
}

const Candidatepage=async ()=>{
  const session=await getServerSession(authOptions);

  if(!session){
    redirect('/signup');
  }

  const applications=await fetch(`${process.env.ROOT_URL}/api/myjobs?email=${session.user?.email}`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }
)

  const data=await applications.json();
  
  return <div>
    <div className="flex justify-between">
      <div className="flex flex-col gap-2 pl-2 pt-2">
        <div className="flex flex-col">
          <div className="font-bold text-2xl">My Applications</div>
          <div className="underlineGradient ml-7 w-[100px] h-1 rounded"></div>
        </div>
        <div className="text-gray-500">Track and manage your job applications</div>
      </div>
      
    </div>

    <div className="bg-white">
      {data.applications.map((item:applicationSchema,i:number)=>{
        return <div key={i}>
          <JobCard position={item.position} date={item.date} scheduled={item.scheduled} pending={item.pending}/>
        </div>
      })}
    </div>
  </div>
}

export default Candidatepage;