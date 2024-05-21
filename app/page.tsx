import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { handler } from "./api/auth/[...nextauth]/route";
import { Quote } from "@/components/Quote";

export default async function Home() {
  const session = await getServerSession(handler);
  if(session) redirect("/dashboard");
  return (
    <div  className="flex ">
               
    <div   className="flex-1 w-80">
    <Quote />

    </div>
   <div   className="flex-1"  >
    <LoginForm />
    </div> 
</div>  
  )
}
