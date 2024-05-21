import { connectDB } from "@/lib/db";
import { ok } from "assert";
import { connect } from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { hash } from "bcrypt";
import User from "@/models/user";

export async function POST(req:any){

    try{
        const {email,name,password} = await req.json();
        const hashedPassword = await bcrypt.hash(password,10)
        await connectDB();
    await User.create( {
        name,
        email,
        password:hashedPassword
    } )


        return NextResponse.json({ message: "User Registered"}, {status:201})
    }catch(e){
    return NextResponse.json(
        {  message:"An error occurred while registering the user" },
    { status:500  }
    )  

}}