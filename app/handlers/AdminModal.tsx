"use client";
import { useSearchParams } from "next/navigation";

const AdminModalhandler=({modal}: {modal: React.ReactNode})=>{
    const searchParams=useSearchParams();

    const isopen=searchParams.get("add-job") || "Undefined";

    return isopen === "true" ? modal : null;
}

export default AdminModalhandler;