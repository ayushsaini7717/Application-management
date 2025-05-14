import BackToJobBtn from "@/app/custom-components/backtojobBtn";
import NavigateBtn from "@/app/custom-components/navigateBtn";

const dynamicPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const Id = (await params).id;
  const response = await fetch(`${process.env.ROOT_URL}/api/fetchjobdesc?id=${Id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  const data = await response.json();

  return (
    <>
      <div className="mt-10 flex flex-col items-center px-4 sm:px-8 mb-5">
        <div className="w-full max-w-6xl">
          <BackToJobBtn/>

          <div className="w-full border border-gray-300 rounded-lg shadow-sm">
            <div className="bg-blue-50 py-10 px-6 rounded">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl md:text-4xl font-bold">{data.basicdetails.title}</h1>
                  <div className="flex items-center text-gray-600 text-lg gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building2 h-4 w-4"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></svg>
                    {data.basicdetails.department}
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <NavigateBtn path={`/apply?id=${data.basicdetails.id}`} text="Apply Now" />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                {[
                  { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>, text: data.basicdetails.location },

                  { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>, text: data.basicdetails.type },
                  { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                  </svg>
                  , text: data.basicdetails.experience }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-1 font-medium text-gray-700">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="..." />
                    </svg> */}
                    {item.icon}
                    {item.text}
                  </div>
                ))}
              </div>

            </div>
            
            <div className="pt-5 px-6 bg-gray-50 pb-5">
              <SectionTitle title="Overview" />
              <p className="text-gray-600 mb-6">{data.basicdetails.full_desc}</p>
            

            <SectionTitle title="Responsibilities" />
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              {data.responsibilities.map((item: any, i: number) => (
                <li key={i}>{item.responsibility}</li>
              ))}
            </ul>

            <SectionTitle title="Requirements" />
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              {data.requirements.map((item: any, i: number) => (
                <li key={i}>{item.requirement}</li>
              ))}
            </ul>

            <SectionTitle title="Benefits" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {data.benifits.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-2 text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="..." />
                  </svg>
                  {item.benifit}
                </div>
              ))}
            </div>

            <SectionTitle title="Skills & Technologies" />
            <div className="flex flex-wrap gap-2">
              {data.skills.map((item: any, i: number) => (
                <span key={i} className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-800">
                  {item.Skill}
                </span>
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamicPage;

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-xl font-bold mb-2">{title}</h2>
);
