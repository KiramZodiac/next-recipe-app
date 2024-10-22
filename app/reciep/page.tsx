"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'; 
import NavBar from '../NavBar';


interface myTypes{
dt:{
  name:string
}

}




function RecipesPage() {
  const [data,setData] = useState([])
const [Search,setSearch] = useState('')


useEffect(()=>{

const fetchData = async()=>{

const res = await fetch('https://dummyjson.com/recipes')
const result = await res.json()
const all = result.recipes


const randomRecipe =(arr)=>{

return arr.sort(()=> Math.random() - 0.5)

}

setData(randomRecipe(all))

}
fetchData()
},[])





  return(
    <div>
      <NavBar/>

<input value={Search} onChange={(e)=>setSearch(e.target.value)} placeholder='enter maeal name'/>

<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-gray-50 dark:bg-gray-900 p-10">
  { data.filter((dt:myTypes)=>dt.name.toLowerCase().includes(Search.toLowerCase())).map((recipe)=>  (

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

{recipe.difficulty }
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
