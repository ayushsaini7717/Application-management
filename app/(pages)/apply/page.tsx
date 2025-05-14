"use client";
import ReCAPTCHA from "react-google-recaptcha";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const ApplyApplication = () => {
    const router=useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id"); 

    const [jobData, setJobData] = useState<any>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [loading,Setloading]=useState(false);


    useEffect(() => {
        const fetchJobData = async () => {
            const response = await fetch(`/api/fetchjobdesc?id=${id}`);
            const data = await response.json();
            setJobData(data);
        };

        fetchJobData();
    }, []);

    const handler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!captchaToken) {
            alert("Please complete the captcha!");
            return;
        }

        const form=e.currentTarget as HTMLFormElement;
        const formdata=new FormData(form);
        formdata.append('token',captchaToken);
        
        try{
            await fetch("/api/apply",{
                method: "POST",
                body: formdata
            })

        }catch(err){
            console.log(err);
        }

        router.push("success-application");
        
    };

    if (!jobData) {
        return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex justify-center items-center px-4 py-8">
            <div className="max-w-4xl w-full bg-white border border-gray-300 rounded-lg p-6 shadow-lg">
                <div className="bg-blue-50 py-5 rounded">
                <h1 className="text-2xl font-bold text-center">Apply for {jobData.basicdetails.title}</h1>
                <h5 className="text-gray-600 text-center">{jobData.basicdetails.department} | {jobData.basicdetails.location} | {jobData.basicdetails.type}</h5>

                </div>

                <form onSubmit={handler} encType="multipart/form-data" className="mt-6 flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col flex-1">
                            <label className="mb-1 font-medium">First name</label>
                            <input required name="Fname" className="border border-gray-400 p-2 rounded w-full" />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="mb-1 font-medium">Last name</label>
                            <input required name="Lname" className="border border-gray-400 p-2 rounded w-full" />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium">Email</label>
                        <input required name="email" type="email" className="border border-gray-400 p-2 rounded w-full" />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium">Phone no</label>
                        <input required name="mobile" type="tel" pattern="[0-9]{10}" className="border border-gray-400 p-2 rounded w-full" />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium">Resume</label>
                        <input required name="resume" type="file" className="border border-gray-400 p-2 rounded w-full" />
                    </div>

                    <input type="text" readOnly hidden name="role" value={jobData.basicdetails.title} />

                    <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY!} onChange={(token) => setCaptchaToken(token)} />

                    <button onClick={()=>Setloading(true)} className="cursor-pointer mt-2 text-white bg-blue-500 py-1 rounded hover:bg-blue-400" type="submit">{loading ? "Submitting..." : "Submit"}</button>
                    </form>
            </div>
        </div>
    );
};

export default ApplyApplication;
