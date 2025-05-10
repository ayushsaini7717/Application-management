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
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Candidatepage=async ()=>{
  const session=await getServerSession(authOptions);

  if(!session){
    return <div>You are out of session</div>
  }

  // return <div>Candidate page</div>
  return <div>
    
  </div>
}

export default Candidatepage;