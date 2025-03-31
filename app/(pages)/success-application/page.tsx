import NavigateBtn from "@/app/custom-components/navigateBtn";

const Successpage=()=>{
    return <>
        <div className="flex flex-col gap-2 justify-center items-center h-screen">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big h-16 w-16 text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg>
            </div>
            <div className="font-bold text-4xl">
                Application Submitted!
            </div>
            <div className="font-medium text-lg text-gray-500">
                Thank you for your application. Our team will review your information and get back to you soon.
            </div>
            <div className="mt-4">
                <NavigateBtn text="View More Job Openings" path="/job-openings"/>
            </div>
        </div>
    </>
}

export default Successpage;