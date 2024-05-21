import { getServerSession } from "next-auth";
import { handler } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SignupForm from "@/components/SignupForm";
import { Quote } from "@/components/Quote";



export default async function(){
        const session = await getServerSession(handler);
        if(session) redirect("/dashboard");
        return ( <div  className="flex ">
               
                <div   className="flex-1 w-80">
                <Quote />

                </div>
               <div   className="flex-1"  >
                <SignupForm />
                </div> 
        </div>  
        )}