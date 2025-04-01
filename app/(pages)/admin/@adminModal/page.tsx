import AddjobAction from "@/app/actions/Addjob";
import CloseAdminModalBtn from "@/app/custom-components/closeadminModalBtn";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminModal = () => {
    return (
        <div className="bg-black/40 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white text-black rounded border border-gray-500 w-full max-w-lg md:max-w-2xl lg:max-w-3xl p-4 shadow-lg overflow-y-auto max-h-[90vh]">
            
                <div className="flex justify-end">
                    <CloseAdminModalBtn/>

                </div>
                <form action={AddjobAction} className="flex flex-col gap-4">
                    <div>
                        <label className="block font-bold text-lg">Job Title</label>
                        <input required name="JobTitle" className="w-full border border-gray-200 py-2 px-2 rounded-sm" />
                    </div>

                    <div className="flex flex-col md:flex-row md:gap-4">
                        <div className="w-full md:w-1/2">
                            <label className="block font-bold text-lg">Department</label>
                            <Select name="Dept" required>
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

                        <div className="w-full md:w-1/2">
                            <label className="block font-bold text-lg">Location</label>
                            <input name="location" className="w-full border border-gray-200 py-2 px-2 rounded-sm" />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:gap-4">
                        <div className="w-full md:w-1/2">
                            <label className="block font-bold text-lg">Type</label>
                            <Select name="Type" required>
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

                        <div className="w-full md:w-1/2">
                            <label className="block font-bold text-lg">Description</label>
                            <input required name="desc" className="w-full border border-gray-200 py-2 px-2 rounded-sm" />
                        </div>
                    </div>

                    <button
                        className="text-white rounded w-full bg-black font-bold py-2 hover:bg-black/80 cursor-pointer"
                        type="submit"
                    >
                        Add Job
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminModal;
