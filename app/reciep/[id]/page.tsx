import React from 'react';
import Image from 'next/image';
import NavBar from '@/app/NavBar';


interface Recipe{
 name:string;
 image:string;
 ingredients:string[];
 instructions:string[];

}
interface myTypes{
  params:{
    id:number;
  }
}


async function RecipeDetails({ params }:myTypes) {
  // Fetch the recipe data from the API
  const response = await fetch(`https://dummyjson.com/recipes/${params.id}`);
  const recipe:Recipe = await response.json();

  return (
    <div className=''>
      <NavBar/>
    <div className="  justify-center items-center flex flex-col bg-pink-100 lg:h-screen sm:flex-col pt-7">
 
        <div className=' text-center text-5xl font-semibold text-slate-700 max-sm:text-3xl'>

        <h2> {recipe.name} </h2>
        </div>

        <div className='lg:flex p-3 gap-24 '>

 <Image src={recipe.image} width={600} height={600} alt={recipe.name} className='rounded-xl'/>
 <div className=' flex justify-center flex-col max-sm:pl-28'>
    <h1 className=' font-semibold text-2xl'>Ingredients</h1>
    {recipe.ingredients.map((ingredient,index) => (
        <li className='text-slate-700 ' key={index}>{ingredient} </li>
    ))}
</div>
        </div>
        <h1 className=' text-2xl font-bold'>Instructions</h1>
        <ol className=' list-decimal list-inside m-5 text-slate-700 font-semibold'>
        
  {recipe.instructions.map((instruction:string, index:number) => (
    
<li key={index}>{instruction}</li> 
   
  ))}
 </ol>
    </div></div>
  );
}

export default RecipeDetails;
