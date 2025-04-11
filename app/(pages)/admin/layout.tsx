import AdminModalhandler from "@/app/handlers/AdminModal";
import { Toaster } from "@/components/ui/sonner";
import MailModalhandler from "@/app/handlers/MailModal";

export default async function Adminlayout({
    children,
    adminModal,
    MailModal
}: Readonly<{
    children: React.ReactNode;
    adminModal: React.ReactNode;
    MailModal: React.ReactNode;
}>){
    return (
        <div>
            {children}
            <AdminModalhandler modal={adminModal}/>
            <Toaster />
            <MailModalhandler modal={MailModal}/>
        </div>
      );
}

