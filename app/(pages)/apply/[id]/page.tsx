import ApplicationSubmitBtn from "@/app/custom-components/applicationSubmitBtn";
import ApplyAction from "../../../actions/Apply";

const ApplyApplication = async(
    { params, searchParams }
    : { params: { id: string }; searchParams: { [key: string]: string | string[] | undefined } }
) => {
    const { id } = params;
    const subRole = searchParams.subRole || "Unknown";
    const location = searchParams.location || "Unknown";
    const jobType = searchParams.jobType || "Unknown";
    let Role = id.replace("%20", " ");

    return (
        <div className="min-h-screen flex justify-center items-center px-4 py-8">
            <div className="max-w-4xl w-full bg-white border border-gray-300 rounded-lg p-6 shadow-lg">
                <h1 className="text-2xl font-bold text-center">Apply for {Role}</h1>
                <h5 className="text-gray-600 text-center">{subRole} | {location} | {jobType}</h5>

                <form action={ApplyAction} className="mt-6 flex flex-col gap-4">
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
                        <input required name="mobile" type="text" className="border border-gray-400 p-2 rounded w-full" />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium">Resume</label>
                        <input required name="resume" type="file" className="border border-gray-400 p-2 rounded w-full" />
                    </div>
                    <input type="text" readOnly hidden name="role" value={Role}></input>
                    <ApplicationSubmitBtn />
                </form>
            </div>
        </div>
    );
};

export default ApplyApplication;
