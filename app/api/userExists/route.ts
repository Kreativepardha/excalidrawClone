import { connectDB } from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";


export async function POST(req:any) {
        try{
                await connectDB();
            const {email} = await req.json();
           const user =  await User.findOne( {email}).select("_id");
            console.log("User",user);
            return NextResponse.json({ user: !!user });
        }catch(err){
            console.error("error",err)
        }
    
}