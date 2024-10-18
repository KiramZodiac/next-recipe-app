import Link from 'next/link';
import React from 'react'
import Image from 'next/image'; 


async function RecipesPage() {

    const res = await fetch('https://dummyjson.com/recipes?limit=50')

    const data = await res.json();
const recipes = data.recipes;

const suffledArray = (array:any)=>{

for(let i = array.length -1;i >0; i-- ){
  const a = Math.floor(Math.random()* (i + 1));
  [array[i], array[a]] = [array[a], array[i]]
}

return array
}

const shuffledREcipes = suffledArray(recipes)

  return(
    <div>
    <h1 className=' text-4xl'>Chef's Recipe Book</h1>
<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-gray-50 dark:bg-gray-900 p-10">
 
  {shuffledREcipes.map((recipe:any) => (

    <div 
      key={recipe.id} 
      className="w-full max-w-xs mx-auto bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 dark:bg-gray-800 dark:border-gray-700"
    >
      <Image
        width={150}
        height={150}
        alt={recipe.name}
        src={recipe.image}
        className="object-cover w-full h-36"
      />
      <div className="p-4">
        <h5 className="text-lg font-bold text-gray-900 mb-2 dark:text-white">
          {recipe.name}
        </h5>
        <div className='flex justify-between'>
        <Link
          href={`/reciep/${recipe.id}`} 
          className="inline-block px-3 py-2 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          View Recipe
        </Link>


<div className=" bg-slate-500 text-center w-1/2 justify-center flex items-center rounded-2xl">

{recipe.difficulty ? 'hard': 'easy'}
</div>

</div>

      </div>
    </div>
  ))}
</div>
</div>


)

}

export default RecipesPage
