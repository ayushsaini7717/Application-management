"use client";
import AddjobAction from "@/app/actions/Addjob";
import CloseAdminModalBtn from "@/app/custom-components/closeadminModalBtn";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface scheme1{
    title: string,
    department: string,
    location: string,
    type: string,
    short_desc: string,
    experience: string,
    full_desc: string
}

interface scheme2{
    responsibility: string
}

interface scheme3{
    requirement: string
}

interface scheme4{
    benifit: string
}

interface scheme5{
    Skill: string
}

const jobAdder=async({title,department,location,type,short_desc,experience,full_desc}: scheme1,responsibility: { responsibility: string }[],requirement: {requirement: string}[],benifit: {benifit: string}[],Skill: {Skill: string}[])=>{
    const response=await fetch("/api/jobadd",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            department: department,
            location: location,
            type: type,
            short_desc: short_desc,
            experience: experience,
            full_desc: full_desc,
            responsibility: responsibility,
            requirement: requirement,
            benifit: benifit,
            Skill: Skill
        })
    })

}


const AdminModal = () => {
    const router=useRouter();
    const [loading,setloading]=useState(false);
    const [firstpage,Setfirstpage]=useState(true);
    const [secondpage,Setsecondpage]=useState(true);
    const [BasicDetails,SetBasicDetails]=useState<scheme1>({
        title: "",
        department: "",
        location: "",
        type: "",
        short_desc: "",
        experience: "",
        full_desc: ""
    });
    const [responsibility,setResponsibility]=useState<scheme2[]>([{responsibility: ''}]);
    const addResponsibility=()=>{
        setResponsibility([...responsibility,{responsibility: ''}]);
    }

    const deleteResponsibility=(index:number)=>{
        if(responsibility.length <= 1) return;
        
        setResponsibility(responsibility.filter((_, i) => i !== index));

    }

    const handler=(index:number,value: string)=>{
        const currentResponsibility=[...responsibility];
        currentResponsibility[index]={responsibility: value};
        setResponsibility(currentResponsibility);
    }


    
    const [requirement,SetRequirement]=useState<scheme3[]>([{requirement: ''}]);
    const addRequirement=()=>{
        SetRequirement([...requirement,{requirement: ''}]);
    }
    
    const deleteRequirement=(index: number)=>{
        if(requirement.length <= 1) return;
        SetRequirement(requirement.filter((_,i)=>i!==index));
    }
    
    const handlerRequirement=(index: number,value: string)=>{
        const currentRequirement=[...requirement];
        currentRequirement[index]={requirement: value};
        SetRequirement(currentRequirement);
    }
    
    
    
    const [Benifit,SetBenifit]=useState<scheme4[]>([{benifit: ''}]);
    const addBenifit=()=>{
        SetBenifit([...Benifit,{benifit: ''}]);
    }

    const deleteBenifit=(index:number)=>{
        if(Benifit.length <= 1) return;
        SetBenifit(Benifit.filter((_,i)=>i!==index));
    }

    const handlerBenifit=(index:number,value: string)=>{
        const currentBenifit=[...Benifit];
        currentBenifit[index]={benifit: value};
        SetBenifit(currentBenifit);
    }



    const [Skills,SetSkills]=useState<scheme5[]>([{Skill: ''}]);
    const addSkills=()=>{
        SetSkills([...Skills,{Skill: ''}]);
    }

    const deleteSkills=(index:number)=>{
        if(Skills.length <= 1) return;
        SetSkills(Skills.filter((_,i)=>i!==index));
    }

    const handlerSkills=(index:number,value: string)=>{
        const currentSkills=[...Skills];
        currentSkills[index]={Skill: value};
        SetSkills(currentSkills);
    }

    
    return <>
        <div className="bg-black/40 fixed inset-0 flex items-center justify-center p-4">
            <div className={`bg-white text-black rounded border border-gray-500 h-full w-full max-w-lg md:max-w-2xl lg:max-w-3xl p-4 shadow-lg overflow-y-auto max-h-[90vh]`}>
                {firstpage ? <div>
                                <div className="flex flex-wrap justify-between">
                                    <div>
                                        <div className="font-bold">Create New Job Opening</div>
                                        <div className="font-semibold text-gray-500">
                                            Fill in the details for the new job position. Complete all required fields.
                                        </div>
                                    </div>
                                    <CloseAdminModalBtn />
                                </div>

                                <div className="flex justify-center items-center mt-3 flex-wrap gap-2 sm:gap-4">
                                    <div className="bg-black text-white rounded-full px-3 py-1 font-semibold">1</div>
                                    <div className="w-10 sm:w-16 bg-gray-200 h-1 rounded"></div>
                                    <div className="bg-gray-200 text-gray-500 rounded-full px-3 py-1 font-semibold">2</div>
                                    <div className="w-10 sm:w-16 bg-gray-200 h-1 rounded"></div>
                                    <div className="bg-gray-200 text-gray-500 rounded-full px-3 py-1 font-semibold">3</div>
                                </div>

                                <div className="flex flex-col gap-4 mt-5">
                                    <div>
                                        <label className="block font-semibold text-md">Job Title</label>
                                        <input
                                            onChange={(e) => {
                                                SetBasicDetails((prev) => ({
                                                    ...prev,
                                                    title: e.target.value,
                                                }));
                                            }}
                                            placeholder="e.g. Frontend Developer"
                                            required
                                            name="JobTitle"
                                            className="w-full border border-gray-200 py-2 px-2 rounded-sm"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="w-full">
                                            <label className="block font-semibold text-md">Department</label>
                                            <Select
                                                name="Dept"
                                                required
                                                onValueChange={(value) => {
                                                    SetBasicDetails((prev) => ({
                                                        ...prev,
                                                        department: value,
                                                    }));
                                                }}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Dept" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Engineering">Engineering</SelectItem>
                                                    <SelectItem value="Design">Design</SelectItem>
                                                    <SelectItem value="Marketing">Marketing</SelectItem>
                                                    <SelectItem value="Support">Support</SelectItem>
                                                    <SelectItem value="Data">Data</SelectItem>
                                                    <SelectItem value="Sales">Sales</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="w-full">
                                            <label className="block font-semibold text-md">Location</label>
                                            <input
                                                onChange={(e) => {
                                                    SetBasicDetails((prev) => ({
                                                        ...prev,
                                                        location: e.target.value,
                                                    }));
                                                }}
                                                placeholder="e.g. New Delhi"
                                                name="location"
                                                className="w-full border border-gray-200 py-2 px-2 rounded-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="w-full">
                                            <label className="block font-semibold text-md">Job Type</label>
                                            <Select
                                                name="Type"
                                                required
                                                onValueChange={(value) => {
                                                    SetBasicDetails((prev) => ({
                                                        ...prev,
                                                        type: value,
                                                    }));
                                                }}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Full Time">Full Time</SelectItem>
                                                    <SelectItem value="Part Time">Part Time</SelectItem>
                                                    <SelectItem value="Freelancing">Freelancing</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="w-full">
                                            <label className="block font-semibold text-md">Experience level</label>
                                            <Select
                                                name="Type"
                                                required
                                                onValueChange={(value) => {
                                                    SetBasicDetails((prev) => ({
                                                        ...prev,
                                                        experience: value,
                                                    }));
                                                }}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Experience level" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Entry level">Entry level</SelectItem>
                                                    <SelectItem value="1+ years">1+ years</SelectItem>
                                                    <SelectItem value="2+ years">2+ years</SelectItem>
                                                    <SelectItem value="3+ years">3+ years</SelectItem>
                                                    <SelectItem value="5+ years">5+ years</SelectItem>
                                                    <SelectItem value="7+ years">7+ years</SelectItem>
                                                    <SelectItem value="10+ years">10+ years</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <label className="block font-semibold text-md">Short Description</label>
                                        <Textarea
                                            placeholder="Enter a brief description of the job"
                                            required
                                            name="desc"
                                            onChange={(e) => {
                                                SetBasicDetails((prev) => ({
                                                    ...prev,
                                                    short_desc: e.target.value,
                                                }));
                                            }}
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => {
                                                const entries = Object.entries(BasicDetails);

                                                for (const [key, value] of entries) {
                                                  if (typeof value === "string" && value.trim() === "") {
                                                    if(key === "full_desc") continue;
                                                    toast.error(`${key.replace(/_/g, " ")} is required`);
                                                    return;
                                                  }
                                                }

                                                Setfirstpage(false);
                                                Setsecondpage(true);
                                            }}
                                            className="text-white px-4 rounded bg-black font-bold py-2 hover:bg-black/80 cursor-pointer"
                                            type="button"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>

                
                    : secondpage ? 

                    <div>
                        <div className="flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center">
                            <div>
                                <div className="font-bold">
                                    Create New Job Opening
                                </div>
                                <div className="font-semibold text-gray-500">
                                    Fill in the details for the new job position. Complete all required fields.
                                </div>
                            </div>
                            <CloseAdminModalBtn />
                        </div>

                        <div className="flex justify-center items-center mt-3 flex-wrap gap-2 sm:gap-4">
                            <div className="bg-black text-white rounded-full px-3 py-1 font-semibold">1</div>
                            <div className="w-10 sm:w-16 bg-black h-1 rounded"></div>
                            <div className="bg-black text-white rounded-full px-3 py-1 font-semibold">2</div>
                            <div className="w-10 sm:w-16 bg-gray-200 h-1 rounded"></div>
                            <div className="bg-gray-200 text-gray-500 rounded-full px-3 py-1 font-semibold">3</div>
                        </div>

                        <div className="mt-6">
                            <div>
                                <label className="block font-semibold text-md">Full Description</label>
                                <Textarea 
                                    required 
                                    className="w-full border border-gray-300 rounded-md p-3"
                                    onChange={(e) => {
                                        SetBasicDetails(prev => ({
                                            ...prev,
                                            full_desc: e.target.value
                                        }));
                                    }}
                                />
                            </div>

                            <div className="mt-4">
                                <div className="flex justify-between items-center">
                                    <label className="font-semibold text-md">Responsibilities</label>
                                    <button 
                                        onClick={addResponsibility} 
                                        className="bg-white cursor-pointer font-semibold text-sm text-black py-1 px-3 border border-gray-300 shadow rounded hover:bg-gray-100 transition"
                                    >
                                        Add Responsibility
                                    </button>
                                </div>

                                <div className="mt-3 space-y-2">
                                    {responsibility.map((item, index) => (
                                        <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                            <input 
                                                className="w-full sm:w-auto border border-gray-400 py-2 px-3 rounded-md flex-1" 
                                                required 
                                                value={item.responsibility}
                                                onChange={(e) => {
                                                    handler(index,e.target.value);
                                                }}
                                            />
                                            {index !== 0 ? <button onClick={()=>deleteResponsibility(index)} className="text-red-500 cursor-pointer hover:text-red-700 text-sm">
                                                Delete
                                            </button>: <div></div>}
                                            
                                        </div>
                                    ))}
                                </div>
                            </div>




                            <div className="mt-4">
                                <div className="flex justify-between items-center">
                                    <label className="font-semibold text-md">Requirements </label>
                                    <button 
                                        onClick={addRequirement} 
                                        className="bg-white cursor-pointer font-semibold text-sm text-black py-1 px-3 border border-gray-300 shadow rounded hover:bg-gray-100 transition"
                                    >
                                        Add Requirements 
                                    </button>
                                </div>

                                <div className="mt-3 space-y-2">
                                    {requirement.map((item, index) => (
                                        <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                            <input 
                                                className="w-full sm:w-auto border border-gray-400 py-2 px-3 rounded-md flex-1" 
                                                required 
                                                value={item.requirement}
                                                onChange={(e) => {
                                                    handlerRequirement(index,e.target.value);
                                                }}
                                            />
                                            {index !== 0 ? <button onClick={()=>deleteRequirement(index)} className="text-red-500 cursor-pointer hover:text-red-700 text-sm">
                                                Delete
                                            </button>: <div></div>}
                                            
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end gap-2">
                                <button onClick={()=>Setfirstpage(true)} className="py-1 px-3 bg-gray-200 text-black cursor-pointer rounded">Back</button>
                                <button onClick={()=>{
                                    if(BasicDetails.full_desc === '' || BasicDetails.full_desc.trim() === ""){
                                        toast.error(`Full desc is required!`);
                                        return;
                                    }
                                    for(let i=0;i<responsibility.length;i++){
                                        if(responsibility[i].responsibility === "" || responsibility[i].responsibility.trim()===""){
                                            toast.error("Fill all responsibilities!");
                                            return;
                                        }
                                    }

                                    for(let i=0;i<requirement.length;i++){
                                        if(requirement[i].requirement === "" || requirement[i].requirement.trim() === ""){
                                            toast.error("Fill all requirements!");
                                            return;
                                        }
                                    }
                                    Setsecondpage(false)
                                    }} className="py-1 px-3 cursor-pointer bg-black text-white font-bold rounded hover:bg/80">Next</button>
                            </div>

                            
                        </div>
                    </div>

                    : 
                    <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center">
                            <div>
                                <h1 className="font-bold text-lg sm:text-xl">Create New Job Opening</h1>
                                <p className="text-gray-500 text-sm sm:text-md">
                                    Fill in the details for the new job position. Complete all required fields.
                                </p>
                            </div>
                            <CloseAdminModalBtn />
                        </div>

                        <div className="flex justify-center items-center mt-3 flex-wrap gap-2 sm:gap-4">
                            <div className="bg-black text-white rounded-full px-3 py-1 font-semibold">1</div>
                            <div className="w-10 sm:w-16 bg-black h-1 rounded"></div>
                            <div className="bg-black text-white rounded-full px-3 py-1 font-semibold">2</div>
                            <div className="w-10 sm:w-16 bg-black h-1 rounded"></div>
                            <div className="bg-black text-white rounded-full px-3 py-1 font-semibold">3</div>
                        </div>

                    

                        <div className="mt-4">
                            <div className="flex justify-between items-center">
                                <label className="font-semibold text-md">Benifits</label>
                                <button 
                                    onClick={addBenifit} 
                                    className="bg-white cursor-pointer font-semibold text-sm text-black py-1 px-3 border border-gray-300 shadow rounded hover:bg-gray-100 transition"
                                >
                                    Add Benifit
                                </button>
                            </div>

                            <div className="mt-3 space-y-2">
                                {Benifit.map((item, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                        <input 
                                            className="w-full sm:w-auto border border-gray-400 py-2 px-3 rounded-md flex-1" 
                                            required 
                                            value={item.benifit}
                                            onChange={(e) => {
                                                handlerBenifit(index,e.target.value);
                                            }}
                                        />
                                        {index !== 0 ? <button onClick={()=>deleteBenifit(index)} className="text-red-500 cursor-pointer hover:text-red-700 text-sm">
                                            Delete
                                        </button>: <div></div>}
                                        
                                    </div>
                                ))}
                            </div>
                        </div>




                        <div className="mt-4">
                            <div className="flex justify-between items-center">
                                <label className="font-semibold text-md">Skills & Technologies</label>
                                <button 
                                    onClick={addSkills} 
                                    className="bg-white cursor-pointer font-semibold text-sm text-black py-1 px-3 border border-gray-300 shadow rounded hover:bg-gray-100 transition"
                                >
                                    Add Skill
                                </button>
                            </div>

                            <div className="mt-3 space-y-2">
                                {Skills.map((item, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                        <input 
                                            className="w-full sm:w-auto border border-gray-400 py-2 px-3 rounded-md flex-1" 
                                            required 
                                            value={item.Skill}
                                            onChange={(e) => {
                                                handlerSkills(index,e.target.value);
                                            }}
                                        />
                                        {index !== 0 ? <button onClick={()=>deleteSkills(index)} className="text-red-500 cursor-pointer hover:text-red-700 text-sm">
                                            Delete
                                        </button>: <div></div>}
                                        
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end gap-2">
                            <button onClick={()=>{
                                Setsecondpage(true)
                            }} className="py-1 px-3 bg-gray-200 text-black cursor-pointer rounded">Back</button>
                            <button onClick={async ()=>{
                                setloading(true);
                                for(let i=0;i<Benifit.length;i++){
                                    if(Benifit[i].benifit==="" || Benifit[i].benifit.trim() ===""){
                                        toast.error("Fill all benifits!");
                                        return;
                                    }
                                }

                                for(let i=0;i<Skills.length;i++){
                                    if(Skills[i].Skill==="" || Skills[i].Skill.trim() === ""){
                                        toast.error("Fill all skills!");
                                        return;
                                    }
                                }
                                
                                await jobAdder(BasicDetails,responsibility,requirement,Benifit,Skills);
                                router.push("/admin");
                            
                            }} className="py-1 px-3 cursor-pointer bg-black text-white font-bold rounded hover:bg/80">{loading? "Please wait...": "Add Job"}</button>
                        </div>

                        
                    </div>
                }
            
                
            </div>
        </div>
    </>
};

export default AdminModal;
