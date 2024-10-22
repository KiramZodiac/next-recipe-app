import React from 'react';
import Image from 'next/image';


interface myTypes{
    params:{
        id:number
    },

    ingredient:Number[]

}



async function RecipeDetails({ params }:myTypes) {
  // Fetch the recipe data from the API
  const response = await fetch(`https://dummyjson.com/recipes/${params.id}`);
  const recipe = await response.json();

  return (
    <div className="  justify-center items-center flex flex-col bg-pink-100 lg:h-screen w-screen sm:flex-col">
 
        <div className=' text-center text-5xl font-semibold text-slate-700 max-sm:text-3xl'>

        <h2> {recipe.name} </h2>
        </div>

        <div className=' p-10 lg:flex '>

<Image src={recipe.image} width={600} height={600} alt={recipe.names} className=' rounded-xl' />
<div className='p-10'>
    <h1 className=' font-semibold text-2xl'>Ingredients</h1>
    {recipe.ingredients.map((ingredient:string) => (
        <li key={ingredient.id}>{ingredient} </li>
    ))}
</div>
        </div>
        <h1 className=' text-2xl font-bold'>Instructions</h1>
        <ol className=' list-decimal list-inside m-5 text-slate-700 font-semibold'>
        
  {recipe.instructions.map((instruction:string, index:number) => (
    
<li key={index}>{instruction}</li> 
   
  ))}
 </ol>
    </div>
  );
}

export default RecipeDetails;
