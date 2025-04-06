import Btn from "./Btn";

interface Props {
    heading: string;
    subheading: string;
    tag1: string;
    tag2: string;
    desc: string;
    id: string;
}

const JobBlock = ({ heading, subheading, tag1, tag2, desc,id }: Props) => {
    return (
        <div className="flex flex-col justify-between border border-black rounded-lg text-black p-4 sm:p-6 md:p-8 w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto shadow-md">
            <div>
                <h2 className="font-bold text-2xl sm:text-3xl">{heading}</h2>
                <h4 className="text-gray-500 text-sm sm:text-base">{subheading}</h4>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
                <div className="border font-medium border-gray-400 rounded-xl px-3 py-1 text-sm">{tag1}</div>
                <div className="border font-medium border-gray-400 rounded-xl px-3 py-1 text-sm">{tag2}</div>
            </div>
            <div className="mt-3">
                <p className="text-gray-600 font-medium text-sm sm:text-base">{desc}</p>
            </div>
            <div className="mt-4">
                <Btn id={id} role={heading} subRole={subheading} location={tag1} jobType={tag2} text="View Details" />
            </div>
        </div>
    );
};

export default JobBlock;
