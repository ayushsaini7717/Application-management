import BacktohomeBtn from "@/app/custom-components/BacktohomeBtn";
import JobBlock from "@/app/custom-components/job-block";

const JobOpenings=()=>{
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