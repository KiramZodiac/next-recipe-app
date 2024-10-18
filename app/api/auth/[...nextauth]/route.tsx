import NextAuth from "next-auth";
import Google from "next-auth/providers/google";



export const authOptions = {

providers:[
    Google({
        clientId:process.env.GOOGLE_CLIENT_ID!,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
    })
],

secret:process.env.NEXTAUTH_SECRET,

}


const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler