import React from 'react';
import { signIn } from 'next-auth/react';
import GoogleIcon from '@mui/icons-material/Google';

function SignIn() {
  return (
    <div className="h-screen bg-cover bg-center bg-[url('/pic4.jpeg')] flex items-center justify-center">
      <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg p-10 w-11/12 max-w-md text-center space-y-8">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-white">
          Welcome to Chef Kiram's Recipes
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Discover exclusive recipes and culinary secrets by signing in.
        </p>
        <div className=' flex justify-center'>
        <button
          onClick={() => signIn('google')}
          className="flex items-center justify-center gap-3 bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          <GoogleIcon className="text-white" />
          Sign In with Google
        </button></div>
      </div>
    </div>
  );
}

export default SignIn;
