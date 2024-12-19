"use client";


import { useSession } from "next-auth/react";


import RecipesPage from "./reciep/page";

import SignIn from "./login/SignIn";
import NavBar from "./NavBar";


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
   <div className="p-5">
    <NavBar/>
    <RecipesPage/>
   </div>
  );
}
