"use client";


import { signIn, signOut, useSession } from "next-auth/react";


import RecipesPage from "./reciep/page";
import { useRouter } from "next/router";
import { Login } from "@mui/icons-material";
import SignIn from "./login/SignIn";


export default function Home() {
  
  const { data: session,status } = useSession();

// const router = useRouter()
if(status ==="loading"){
  return <div>Loading</div>
}


  if (!session) {
   return <div>


<SignIn/>


   </div>


  }

  return (
   <div>
    <RecipesPage/>
   </div>
  );
}
