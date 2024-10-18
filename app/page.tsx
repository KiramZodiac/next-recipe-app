"use client"; 

import { signIn, signOut, useSession } from "next-auth/react";
import GoogleIcon from '@mui/icons-material/Google';
 import Image from "next/image";
 import Link from "next/link";


export default function Home() {
  const { data: session } = useSession();

// const imageURl = session?.user?.image || " "

  if (session) {
    return (
      <>
        <h1>Welcome, {session.user?.name}</h1>
        <p>ur emeil is{ session.user?.email}</p>
        <button onClick={() => signOut()}>Sign Out</button>
        {/* <Image src={imageURl}  height={100} width={100} className=" rounded-full" alt="my pic"/> */}
        <Link href={'./reciep'}>go to reciepe page</Link>
      </>
    );
  }

  return (
    <div className=" flex justify-center items-center text-center h-screen gap-20 bg-white bg-[url('/pic1.jpeg')] bg-cover ">
      <div className=" w-1/2 h-1/2 rounded-md justify-center flex flex-col items-center gap-10 backdrop-blur-lg">


     <h1 className="  text-4xl font-semibold p-10">WELCOME TO THE TASTY TREASURES</h1>
     <div className=" bg-blue-500 rounded-lg flex items-center justify-center w-1/4 h-10 gap-3 hover:cursor-pointer">
     <GoogleIcon  className=" text-white size-7"/> 
     <button onClick={() => signIn('google')} className=" hover:cursor-pointer" >Sign In with Google</button>
     </div>
  
     </div>
     
    </div>
  );
}
