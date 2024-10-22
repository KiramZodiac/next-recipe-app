"use client";


import { signIn, signOut, useSession } from "next-auth/react";
import GoogleIcon from '@mui/icons-material/Google';
 import Image from "next/image";
 import Link from "next/link";
import Search from "./Search";
import NavBar from "./NavBar";
import RecipesPage from "./reciep/page";


export default function Home() {

  const { data: session } = useSession();

// const imageURl = session?.user?.image || " "

  if (session) {
    return (
      <>
        <h1>Welcome, {session.user?.name}</h1>
      <RecipesPage/>
        
     
      

        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }

  return (
    <div className=" flex justify-center items-center text-center h-screen gap-20 bg-white bg-[url('/pic1.jpeg')] bg-cover ">
      <div className=" w-1/2 h-1/2 rounded-md justify-center flex flex-col items-center gap-10 backdrop-blur-lg">
     

    


     <div className=" bg-blue-500 rounded-lg flex items-center justify-center w-1/4 h-10 gap-3 hover:cursor-pointer">
     <GoogleIcon  className=" text-white size-7"/> 
     <button onClick={() => signIn('google')} className=" hover:cursor-pointer" >Sign In with Google</button>
     </div>
  
     </div>
     
    </div>
  );
}
