"use client";

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

const ModalComp = () => {
    const [otpval, setOtpval] = useState("");
    const router = useRouter();
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50">
            <div className="w-[90%] sm:w-[40vw] h-auto sm:h-[30vh] bg-white border border-black rounded-lg shadow-lg p-4 relative">
                <button
                    className="absolute top-3 right-3 text-xl font-bold cursor-pointer"
                    onClick={() => router.push('/')}
                >
                    ✕
                </button>
                <h3 className="text-center font-bold text-xl mb-4">Enter Password</h3>
                <div className="flex justify-center">
                    <InputOTP value={otpval} maxLength={6} onChange={setOtpval}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <div className="w-full mt-4">
                    <button
                        onClick={() => {
                            if (otpval.length !== 0 && otpval === "121104") {
                                Cookies.set("user-admin", "true");
                                router.push("/admin");
                            }
                        }}
                        className="bg-black text-white cursor-pointer w-full py-2 rounded-md hover:bg-black/80 transition"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalComp;
