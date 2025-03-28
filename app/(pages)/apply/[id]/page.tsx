"use server"
import ApplyAction from "../../../actions/Apply";
const ApplyApplication = async({
    params,
  }: {
    params: Promise<{ id: string }>
  }) => {
    const { id } = await params
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="h-[90vh] w-[90vw] border border-gray-500 rounded flex justify-center items-center">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold">Apply for {id}</h1>
                    <h5 className="text-gray-600">Engineering | Remote | Full-time</h5>

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
                        <button className="mt-2 text-white bg-black py-1 rounded hover:bg-gray-800" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApplyApplication;
