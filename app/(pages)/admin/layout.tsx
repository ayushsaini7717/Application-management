import AdminModalhandler from "@/app/handlers/AdminModal";
import { Toaster } from "@/components/ui/sonner";

export default async function Adminlayout({
    children,
    adminModal
}: Readonly<{
    children: React.ReactNode;
    adminModal: React.ReactNode;
}>){
    return (
        <div>
            {children}
            <AdminModalhandler modal={adminModal}/>
            <Toaster />
        </div>
      );
}

