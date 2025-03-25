import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const navigate = useNavigate();

    const handleChange = (index, value) => {
        if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move focus to the next input field if a valid character is entered
            if (value !== "" && index < otp.length - 1) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        const verificationCode = otp.join("");
        try {
            await axios.post(`${import.meta.env.VITE_BASEURL}/user/verifyemail`, { verificationCode })
            navigate("/login");

        } catch (error) {
            console.log(error)
        }
        console.log("Entered OTP:", verificationCode);
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 px-4">
            <div className="p-6 sm:p-8 rounded-md w-full max-w-md flex flex-col gap-6 border border-gray-200 bg-white shadow-lg">
                <div className="text-center">
                    <h1 className="font-extrabold text-2xl sm:text-3xl">Verify your email</h1>
                    <p className="text-sm text-gray-600">
                        Enter the 6-digit code sent to your email address
                    </p>
                </div>
                <form onSubmit={submitHandler} className="flex flex-col items-center">
                    <div className="grid grid-cols-6 gap-2 sm:gap-3">
                        {otp.map((letter, idx) => (
                            <Input
                                id={`otp-${idx}`} // Add unique ID for each input
                                key={idx}
                                type="text"
                                maxLength={1}
                                value={letter}
                                onChange={(e) => handleChange(idx, e.target.value)}
                                className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        ))}
                    </div>
                    <Button
                        type="submit"
                        className="text-white py-2 px-4 rounded-md w-full mt-6 bg-orange hover:bg-hoverOrange"
                    >
                        Verify
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default VerifyEmail;
