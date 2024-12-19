import React from 'react'
import { signIn } from 'next-auth/react'
import GoogleIcon from '@mui/icons-material/Google';

function SignIn() {
  
  return (
    <div>
     

      <div className=" flex justify-center items-center text-center h-screen gap-20 bg-white bg-[url('/pic4.jpeg')] bg-cover">
      <div className="  rounded-md justify-center flex flex-col items-center gap-10 backdrop-blur-lg">
     <h1 className="  text-4xl font-semibold p-10">WELCOME TO CHEF KIRAM{"'"}S RECIEPES</h1>
     <div className=" bg-blue-500 rounded-lg flex items-center justify-center  h-10 gap-3 hover:cursor-pointer mb-20">
     <GoogleIcon  className=" text-white size-7 items-center "/> 
     <button onClick={() => signIn('google')} className=" hover:cursor-pointer" >Sign In with Google</button>
    </div>
    </div>
    </div>
    </div>
  )
}

export default SignIn;
