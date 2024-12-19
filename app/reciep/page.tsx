"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Reciepe {
  id: number;
  name: string;
  difficulty: string;
  image: string;
}

function RecipesPage() {
  const [data, setData] = useState<Reciepe[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://dummyjson.com/recipes?limit=50');
        const result = await res.json();
        const all: Reciepe[] = result.recipes;

        const randomRecipe = (arr: Reciepe[]): Reciepe[] => {
          return arr.sort(() => Math.random() - 0.5);
        };

        setData(randomRecipe(all));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-center p-10 max-sm:flex-col ">
        <div className="w-1/2">
          <h1 className="font-extrabold text-5xl">Welcome to the Chefs{"'"} Secrets</h1>
        </div>
        {/* http://localhost:3000/api/auth/callback/google */}
        <div>
          <label htmlFor="search" className="sr-only">
            Search Recipes
          </label>
          <input
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes"
            className="border-solid border-2 h-8 w-60 rounded-md items-center p-2"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-gray-50
       p-10 max-h-screen">
        {data
          .filter((recipe) =>
            recipe.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((recipe) => (
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
                <div className="flex justify-between">
                  <Link
                    href={`/reciep/${recipe.id}`}
                    className="inline-block px-3 py-2 text-xs font-medium text-center text-white bg-blue-600 hover:rounded-2xl rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    View Recipe
                  </Link>

                  <div className="bg-slate-500 text-center w-1/2 justify-center flex items-center rounded-2xl">
                    {recipe.difficulty}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RecipesPage;
