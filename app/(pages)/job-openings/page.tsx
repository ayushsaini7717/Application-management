import BacktohomeBtn from "@/app/custom-components/BacktohomeBtn";
import JobBlock from "@/app/custom-components/job-block";

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
        <div>
            <div className="mt-2 ml-2">
                <BacktohomeBtn/>

                <div className="mt-[2rem] font-extrabold text-[40px]">
                    <h1 className="">Career Opportunities</h1>
                </div>

                <div className="font-bold text-gray-500 mr-2 text-[18px]">
                    <h4>Find your next role and join our team</h4>
                </div>

                <div className="grid grid-cols-3 gap-2 mr-2 mt-3">
                    {data.response.length === 0 ? <div>No jobs available</div>: data.response.map((item:scheme)=>{
                        return <div className="h-full flex" key={item.id}>
                            <JobBlock id={item.id} heading={item.title} subheading={item.department} tag1={item.location} tag2={item.type} desc={item.short_desc}/>
                        </div>
                    })}
                    
                </div>
            </div>
            

        </div>
    </>

}

export default JobOpenings;