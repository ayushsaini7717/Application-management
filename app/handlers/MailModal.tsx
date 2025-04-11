"use client";
import { useSearchParams } from "next/navigation";

const MailModalhandler=({modal}: {modal: React.ReactNode})=>{
    const searchParams=useSearchParams();

    const isopen=searchParams.get("IsMail") || "Undefined";

    return isopen === "true" ? modal : null;
}

export default MailModalhandler;