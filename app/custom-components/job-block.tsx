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
        <div className="flex flex-col justify-between border border-gray-200 rounded-xl text-gray-800 p-4 sm:p-6 md:p-8 w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto shadow-lg bg-white">
            <div className="mb-4">
                <h2 className="font-bold text-2xl sm:text-3xl text-blue-600">{heading}</h2>
                <h4 className="text-gray-500 text-sm sm:text-base mt-1">{subheading}</h4>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                <div className="text-[#0895b4] border border-[#0895b4] bg-[#d8eff4] hover:bg-[#c4e6ef] transition-colors font-medium rounded-full px-3 py-1 text-sm">
                {tag1}
                </div>
                <div className="text-red-600 border border-red-400 bg-red-100 hover:bg-red-200 transition-colors font-medium rounded-full px-3 py-1 text-sm">
                {tag2}
                </div>
            </div>

            <div className="mb-4">
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{desc}</p>
            </div>

            <div>
                <Btn id={id} text="View Details" />
            </div>
        </div>

    );
};

export default JobBlock;
