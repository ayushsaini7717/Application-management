"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Scheme {
    id: string;
    snippet: string;
    subject: string;
    from: string;
    to: string;
    date: string;
}

const MailModal = () => {
    const router = useRouter();
    const searchParams=useSearchParams();
    const email=searchParams.get("email");
    const [Mails, SetMails] = useState<Scheme[]>([]);
    const [loading,setloading]=useState(false);

    useEffect(() => {
        const fetcher = async () => {
            setloading(true);
            const response = await fetch("/api/getEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ emailAddress: email })
            });

            const data = await response.json();
            SetMails(data);
            setloading(false);
        };

        fetcher();
    }, [email]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="w-full max-w-md md:max-w-lg h-auto max-h-[90vh] bg-white border border-black rounded-lg shadow-lg p-6 relative overflow-y-auto">
                
                <button
                className="absolute top-3 right-3 text-2xl font-bold cursor-pointer text-gray-700 hover:text-black"
                onClick={() => router.push('/admin')}
                >
                ✕
                </button>

                <h3 className="font-bold text-2xl mb-6 text-center">Mails</h3>

                {loading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="text-gray-500">Loading...</span>
                </div>
                ) : (
                <div className="space-y-6">
                    {Mails.length <= 0 ? (
                    <div className="text-center text-gray-500">No Mails</div>
                    ) : (
                    Mails.map((item) => (
                        <div key={item.id} className="p-3 border-b">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <h3 className="font-semibold text-lg">{item.subject}</h3>
                            <h4 className="text-sm text-gray-400 mt-1 md:mt-0">{item.date.split(" +")[0]}</h4>
                        </div>
                        <p className="text-gray-600 mt-2 text-sm">{item.snippet}</p>
                        </div>
                    ))
                    )}
                </div>
                )}
            </div>
        </div>

    );
};

export default MailModal;
