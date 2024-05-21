'use client'
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import InputBox from "./InputBox";
import Link from "next/link";


export default function SignupForm():any{
        const [name,setName] = useState('');
        const [email,setEmail] = useState('');
        const [password,setPassword] = useState('');
        const [error,setError] = useState('');
        const [emailError,setEmailError] = useState(false);
        const [passError,setPassError] = useState(false);
        const [nameError,setNameError] = useState(false);
        const router = useRouter();


const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError(false);
}
const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPassError(false);
}
const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setNameError(false);
}
        const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                 let isValid = true;
                   if(!name) {
                     setNameError(true);
                         isValid = false;
                         }
                     if (email.length < 5){
                            setEmailError(false);
                            isValid = false;
                            }
                         if(password.length < 5){
                            setPassError(true);
                            isValid = false;
                             }
                 if(!isValid) {
                    setError("Please fill out all the fields correctly");
                    return;
                 }         
                    
        try {
            const userExists = await fetch('/api/userExists',{
                method: "POST",
                headers: {
                "Content-Type":"application/json"
                },
                body: JSON.stringify( {email}  )
                });
            const {user} = await userExists.json();
                if(user){
                        setError("User already exists");
                        return;
                } else {
                    try{
                        const res = await fetch('/api/register',{
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                        body: JSON.stringify({
                            name, email, password
                                 }),
                                 });

                            if(res.ok){
                                setName("");
                                setEmail("");
                                setPassword("");
                                router.push("/dashboard");
                        } else {
                                setError("Signup failed , Please try agaim");
                            } 
                    } catch(er){
                        console.error(er);
                        setError("An error occurred during registration. Please try again.");
                    }
                }

        } catch (e) {
            console.error(e);
            setError("An error occurred. Please try again.");
        }
};

        return <div className="grid place-items-center h-screen text-white  bg-yellow-200">
        <div className="shadow-lg  text-white bg-second w-86  p-5 rounded-lg border-4 border-t-0 border-green-200">
              <h1 className="text-2xl font-bold mb-4 text-center">Signup</h1>
                    <form onSubmit={handleSubmit}  className="flex flex-col gap-3" >
                        {
                     error &&(
                        <div className="bg-red-500 text-white text-center p-2 rounded-md">
                                {error}
                        </div>
                        )}
                         <InputBox placeholder="name" name="name" label="Name" type="name" value={name} onChange={handleName}   error={nameError}  classname="w-[400px] border border-black py-4 px-6"  />
                             <InputBox placeholder="email" name="email" label="Email" type="email" onChange={handleEmailChange} error={emailError} value={email} classname="w-[400px] border border-black py-4 px-6"  />
                                  <InputBox placeholder="password" name="password" label="Password" type="password" onChange={handlePassChange} error={passError} value={password} classname="w-[400px] border border-gray-200 py-4 px-6"  />
                                  <button type="submit" className="bg-black text-white py-2 rounded-md mt-4 hover:bg-blue-600 border-b border-r-main">Login</button>
                                <Link   className="text-right text-black-00" href={'/'} >Already have an account? 
                             <span className="underline p-2">Login</span>  
                        </Link>
                    </form>
                </div>
            </div>

}