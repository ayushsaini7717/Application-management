"use client";

import { useState } from "react";

const ApplicationSubmitBtn=()=>{
    const [loading,Setloading]=useState(false);
    return <>
        
        <button onClick={()=>Setloading(true)} className="cursor-pointer mt-2 text-white bg-black py-1 rounded hover:bg-gray-800" type="submit">{loading ? "Submitting..." : "Submit"}</button>
        
    </>
}

export default ApplicationSubmitBtn;