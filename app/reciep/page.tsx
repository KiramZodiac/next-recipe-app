"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Loading from '../Loading';


interface Recipe {
  id: number;
  name: string;
  difficulty: string;
  image: string;
}

function RecipesPage() {
  const [data, setData] = useState<Recipe[]>([]);
  const [search, setSearch] = useState('');
  const [loading,setLoading] = useState(true)
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://dummyjson.com/recipes?limit=50');


        const result = await res.json();
        const all: Recipe[] = result.recipes;
        console.log(all);
        

        const randomRecipe = (arr: Recipe[]): Recipe[] => {
          return arr.sort(() => Math.random() - 0.5);
        };

        setData(randomRecipe(all));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally{
        setLoading(false)
      }
    };

    fetchData();
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header Section */}
      <header className="flex flex-col items-center justify-center py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center">
          Welcome to the Chefs{"'"} Secrets
        </h1>
        <p className="mt-4 text-center text-lg sm:text-xl">
          Discover, Explore, and Enjoy Delicious Recipes
        </p>
        <div className="mt-6">
          <input
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes"
            className="w-80 sm:w-96 px-4 py-2 rounded-lg shadow-lg text-gray-700 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      </header>

      {/* Recipes Grid */}
      {loading ? <Loading/>:
      

      <main className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data
            .filter((recipe) =>
              recipe.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                {/* Recipe Image */}
                <Image
                  width={400}
                  height={400}
                  alt={recipe.name}
                  src={recipe.image || "/placeholder.jpeg"}
                
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="/placeholder.jpeg"
                  className="rounded-t-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={100}
                 
                />

                {/* Recipe Details */}

                <div className="p-6">
                  <h5 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {recipe.name}
                  </h5>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/reciep/${recipe.id}`}
                      className="px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300"
                    >
                      View Recipe
                    </Link>



                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-gray-200 dark:bg-gray-700 dark:text-gray-300 text-gray-700 rounded-lg">
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
      }
    </div>
  );
}

export default RecipesPage;
