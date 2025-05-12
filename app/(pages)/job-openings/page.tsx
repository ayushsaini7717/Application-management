import BacktohomeBtn from "@/app/custom-components/BacktohomeBtn";
import JobBlock from "@/app/custom-components/job-block";
import '../../../styles/underlineGradient.css'

interface scheme{
        "id": string,
        "title": string,
        "department": string,
        "location": string,
        "type": string,
        "short_desc": string
}

const JobOpenings=async ()=>{
    const rootUrl = process.env.ROOT_URL;
    let data: { response: scheme[] } = { response: [] };
    if (!rootUrl) {
        throw new Error("ROOT_URL environment variable is not set.");
    }
    try{
        const res=await fetch(`${rootUrl}/api/fetchJobs`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
    
        
        if(!res.ok){
            throw new Error("Failed to fetch jobs details!");
        }
        const Data=await res.json();
        data=Data;
    }catch(err){
        console.log(err);
    }
    return <>
        <div className="p-4">
            <div className="max-w-7xl mx-auto">
                <BacktohomeBtn />

                <div className="mt-8 font-extrabold text-3xl sm:text-4xl text-blue-500">
                <h1>Career Opportunities</h1>
                <div className="rootUnderline ml-7 w-[100px] self-center h-1 rounded"></div>
                </div>

                <div className="font-medium text-gray-500 text-base sm:text-lg mt-2">
                    <h4>Find your next role and join our team</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {data.response.length === 0 ? (
                    <div>No jobs available</div>
                ) : (
                    data.response.map((item: scheme) => (
                    <div className="h-full flex" key={item.id}>
                        <JobBlock
                        id={item.id}
                        heading={item.title}
                        subheading={item.department}
                        tag1={item.location}
                        tag2={item.type}
                        desc={item.short_desc}
                        />
                    </div>
                    ))
                )}
                </div>
            </div>
        </div>

    </>

}

export default JobOpenings;