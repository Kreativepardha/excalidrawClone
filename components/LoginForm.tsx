'use client'
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import InputBox from "./InputBox";



export default function LoginForm():any {    
        const [email,setEmail] = useState("");
        const [password,setPassword] = useState("");
        const [error,setError] = useState("");
        const [emailError,setEmailError] = useState(false);
        const [passError,setPassError] = useState(false); 
        const router = useRouter();


    const handleEmailChange = (e: ChangeEvent<HTMLInputElement> ) => {
            setEmail(e.target.value);
            setEmailError(false)
    }
    const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
            setPassError(false);
    }

    const handleSubmit = async (e: FormEvent) => {
            e.preventDefault(); 
                let isValid = true;
                    if (email.length<5) {
                        setEmailError(true);
                        isValid=false;
                    }
                    if(password.length < 5) {
                        setPassError(true);
                        isValid = false;
                    }
                    if(!isValid) {
                        setError('Please fill out all fields correctly');
                        return;
                    }
                        try {
                            const res = await signIn('credentials', {
                                email,
                                password,
                                redirect:false
                            });
                                if(res?.error){
                                    setError('Invalid Credentials');
                                    return;
                                }
                            router.push("/dashboard")
                        } catch (e) {
                                console.error(e)
                             }
                    };

     return <div className="grid place-items-center h-screen text-white  bg-yellow-200">
        <div className="shadow-lg bg-second  text-black  p-5 rounded-lg border-2 border-t-0  border-green-200 ">
              <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                    <form onSubmit={handleSubmit}  className="flex flex-col gap-3" >
                                 {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                            <InputBox placeholder="email" name="email" label="Email" type="email" onChange={handleEmailChange} error={emailError} value={email} classname="w-[400px] border border-black py-4 px-6"  />
                                <InputBox placeholder="password" name="password" label="Password" type="password" onChange={handlePassChange} error={passError} value={password} classname="w-[400px] border border-gray-200 py-4 px-6"  />
                            <button type="submit" className="bg-black text-white py-2 rounded-md mt-4 hover:bg-blue-600 border-b border-r-main">Login</button>
                                <Link   className="text-right text-black-300"  href={"/signup"} >Don't have an account? 
                                     <span className="underline p-1">Register</span>  
                                 </Link>
                    </form>
                </div>
            </div>
}