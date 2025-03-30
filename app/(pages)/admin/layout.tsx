import AdminModalhandler from "@/app/handlers/AdminModal";

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
        </div>
      );
}

