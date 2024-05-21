import { connectDB } from '@/lib/db';
import User from '@/models/user';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { compare } from 'bcrypt';
 


export const handler = NextAuth({
            providers: [
                CredentialsProvider({
                    name:"credentials",
                    credentials: {
                        username: { label: 'email', type: 'text', placeholder: '' },
                        password: { label: 'password', type: 'password', placeholder: '' },
                    },
                    async authorize(credentials:any){
                        const {email,password} = credentials;
                        try {
                                await connectDB();
                                   const user = await User.findOne({email});
                                   if(!user){
                                        return null;

                                    } 
                                const passwordMatch  =  await bcrypt.compare(password,user.password);
                                if(!passwordMatch){
                                    return null;
                                }
                                return user;
                        } catch (e) {
                            console.error(e);
                        }
                    },
                }),
            ],
            secret: process.env.NEXTAUTH_SECRET,
            
            session: {
                strategy:'jwt',
            },
            pages: {
                signIn: "/"
            }
})

export { handler as GET, handler as POST }