import React, { useContext, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, LockKeyhole, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Separator } from "@/components/ui/separator"
import { AuthContext } from '@/context/AuthProvider'
import axios from 'axios'

const Login = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext)
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    const loginSubmitHandler = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors

        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BASEURL}/user/login`, input);

            setUser(response.data.user);
            localStorage.setItem("user", JSON.stringify({ user: response.data.user }));
            localStorage.setItem("token", JSON.stringify({ token: response.data.token }));

            navigate("/", { replace: true });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);

            // Handle validation and server errors
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors || { general: error.response.data.message });
            } else {
                setErrors({ general: "Something went wrong. Please try again later." });
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={loginSubmitHandler}
                className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4">
                
                <div className="mb-4">
                    <h1 className="text-orange font-bold text-2xl text-center">Ghar Ka Khana</h1>
                </div>

                {/* Email Input */}
                <div className="mb-4">
                    <div className="relative">
                        <Input 
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className='pl-10 focus-visible:ring-1' 
                        />
                        <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                    </div>
                </div>

                {/* Password Input */}
                <div className="mb-4">
                    <div className="relative">
                        <Input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            className="pl-10 focus-visible:ring-1"
                        />
                        <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
                    </div>
                </div>

                {/* General Error Message */}
                {errors.general && (
                    <p className="text-red-500 text-center text-sm mb-4">{errors.general}</p>
                )}

                {/* Submit Button */}
                <div className="mb-10">
                    {loading ? (
                        <Button disabled className="w-full bg-orange hover:bg-hoverOrange">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full bg-orange hover:bg-hoverOrange">
                            Login
                        </Button>
                    )}
                    <div className="mt-4">
                        <Link to="/forgot-password" className="hover:text-blue-500 hover:underline">
                            Forgot Password
                        </Link>
                    </div>
                </div>

                <Separator />

                <p className="mt-2">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500">
                        Signup
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login
