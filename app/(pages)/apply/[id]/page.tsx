// "use server"
import ApplicationSubmitBtn from "@/app/custom-components/applicationSubmitBtn";
import ApplyAction from "../../../actions/Apply";

const ApplyApplication = async(
    {params,searchParams}
  : {
    params: { id: string };
    searchParams: {[key: string]: string | string[] | undefined};
  }) => {

    const { id } =await params;
    const subRole = (await searchParams).subRole || "Unknown";
    const location= (await searchParams).location || "Unknown";
    const jobType= (await searchParams).jobType || "Unknown";
    let Role=id.replace("%20"," ");
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="h-[90vh] w-[90vw] border border-gray-500 rounded flex justify-center items-center">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold">Apply for {Role}</h1>
                    <h5 className="text-gray-600">{subRole} | {location} | {jobType}</h5>

                    <form action={ApplyAction} className="mt-4 flex flex-col">
                        <span className="flex gap-4">
                            <span className="flex flex-col">
                                <label className="mb-2">First name</label>
                                <input required name="Fname" className="border border-gray-400 p-2 rounded w-64"></input>
                            </span>
                            <span className="flex flex-col">
                                <label className="mb-2">Last name</label>
                                <input required name="Lname" className="border border-gray-400 p-2 rounded w-64"></input>
                            </span>
                        </span>
                        <label className="mb-2 mt-2">Email</label>
                        <input required name="email" type="email" className="border border-gray-400 p-2 rounded w-132"></input>
                        <label className="mb-2 mt-2">Phone no</label>
                        <input required name="mobile" type="text" className="border border-gray-400 p-2 rounded w-132"></input>
                        <label className="mb-2 mt-2">Resume</label>
                        <input required name="resume" type="file" className="border border-gray-400 p-2 rounded w-132"></input>
                        
                        <ApplicationSubmitBtn/>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApplyApplication;
