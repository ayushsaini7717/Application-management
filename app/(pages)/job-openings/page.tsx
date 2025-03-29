import JobBlock from "@/app/custom-components/job-block";

const JobOpenings=()=>{
    return <>
        <div>
            <div className="mt-2 ml-2">
                <button className="flex justify-end gap-2 hover:bg-gray-100 rounded p-1 cursor-pointer">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                        </svg>
                    </span>
                    <span className="pr-2 font-bold">
                        Back to Home
                    </span>
                </button>

                <div className="mt-[2rem] font-extrabold text-[40px]">
                    <h1 className="">Career Opportunities</h1>
                </div>

                <div className="font-bold text-gray-500 mr-2 text-[18px]">
                    <h4>Find your next role and join our team</h4>
                </div>

                <div className="grid grid-cols-3 gap-2 mr-2 mt-3">
                    <JobBlock heading="Software-Engineer" subheading="Engineering" tag1="remote" tag2="full-time" desc="We're looking for a software engineer to join our team and help build our next generation of products."/>
                    <JobBlock heading="Product-Designer" subheading="Design" tag1="remote" tag2="full-time" desc="Join our design team to create beautiful and intuitive user experiences for our products."/>
                    <JobBlock heading="Marketing-Manager" subheading="Marketing" tag1="remote" tag2="full-time" desc="Lead our marketing efforts and help us reach new customers and markets."/>
                    <JobBlock heading="Product-Designer" subheading="Design" tag1="remote" tag2="full-time" desc="Join our design team to create beautiful and intuitive user experiences for our products."/>
                    <JobBlock heading="Software-Engineer" subheading="Engineering" tag1="remote" tag2="full-time" desc="We're looking for a software engineer to join our team and help build our next generation of products."/>
                    <JobBlock heading="Marketing-Manager" subheading="Marketing" tag1="remote" tag2="full-time" desc="Lead our marketing efforts and help us reach new customers and markets."/>

                </div>
            </div>
            

        </div>
    </>

}

export default JobOpenings;