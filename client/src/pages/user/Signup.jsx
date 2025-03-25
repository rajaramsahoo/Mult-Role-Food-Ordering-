import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@radix-ui/react-separator'
import { File, ImageIcon, Loader2, LockKeyhole, Mail, PhoneOutgoing, PhoneOutgoingIcon, User } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from "./../../context/AuthProvider"

const Signup = () => {
    const [errors, setErrors] = useState()
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useContext(AuthContext)
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: "",
        contact: "",
    });
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
        console.log(input)
    }

    const loginSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(import.meta.env.VITE_BASEURL);
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASEURL}/user/signup`, input)
            console.log(res.data)
            navigate("/verify-email");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className='md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4' onSubmit={loginSubmitHandler}>
                <div className="mb-4">
                    <h1 className="text-orange font-bold text-2xl text-center italic">Ghar Ka Khana</h1>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Full Name"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            className="pl-10 focus-visible:ring-1"
                        />
                        <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {errors && <span className="text-xs text-red-500">{errors.fullname}</span>}
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="pl-10 focus-visible:ring-1"
                        />
                        <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {errors && <span className="text-xs text-red-500">{errors.email}</span>}
                    </div>
                </div>
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
                        {errors && <span className="text-xs text-red-500">{errors.password}</span>}
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Contact"
                            name="contact"
                            value={input.contact}
                            onChange={changeEventHandler}
                            className="pl-10 focus-visible:ring-1"
                        />
                        <PhoneOutgoing className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {errors && <span className="text-xs text-red-500">{errors.contact}</span>}
                    </div>

                </div>
                {/* <div className="mb-4">
                    <div className="relative">
                        <Input
                            type="file"
                            name="contact"
                            // value={input.contact}
                            // onChange={changeEventHandler}
                            className="pl-10 focus-visible:ring-1"
                        />
                        <ImageIcon className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {errors && <span className="text-xs text-red-500">{errors.contact}</span>}
                    </div>

                </div> */}
                <div className="mb-10">
                    {loading ? (
                        <Button disabled className="w-full bg-orange hover:bg-hoverOrange">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full bg-orange hover:bg-hoverOrange">
                            Signup
                        </Button>
                    )}
                </div>
                <Separator />
                <p className="mt-2">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500">Login</Link>
                </p>
            </form>
        </div>)
}

export default Signup