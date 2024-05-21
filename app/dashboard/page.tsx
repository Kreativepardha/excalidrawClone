'use client'
import { signOut, useSession } from "next-auth/react"
import Appbar from "./_components/Appbar";
import Logout from "./_components/Logout";
import { Canvas } from "./_components/Canvas";



export default function (){
    const {data:session } = useSession();

    return  <div  className="bg-black relative"  >

    <button className="bg-teal-200 p-2 rounded-md mt-2 ml-4 font-extrabold absolute z-20 hover:border-2 hover:border-black"  onClick={() => {
                signOut();  
            }}  >Logout</button>
    <Appbar/>
    
            {/* <div   className="bg-white" > {session?.user?.name}  </div>
            <div> {session?.user?.email}  </div> */}
    </div>
}