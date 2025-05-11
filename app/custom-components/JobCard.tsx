interface Schema{
    position: string,
    date: string,
    scheduled: boolean,
    pending: boolean
}
const JobCard=({position,date,scheduled,pending}: Schema)=>{
    return <div className="h-[20vh] w-[100vw] flex flex-col shadow justify-around">
        <div className="bg-blue-50 h-15 flex items-center">
            <div className="pl-4 text-xl font-bold text-blue-500">{position}</div>
        </div>
        <div className="pl-4 text-gray-500">Applied on: {date}</div>
        <div className="pl-4 font-bold text-lg">{pending? "In Review" : scheduled ? "Interview Scheduled" : "Rejected"}</div>
    </div>
}

export default JobCard;