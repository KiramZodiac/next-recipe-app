import React from 'react';
import Image from 'next/image';
import NavBar from '@/app/NavBar';

type tParams = Promise<{ id: number[] }>;

async function RecipeDetails(props: { params: tParams }) {
  const { id } = await props.params;

  const res = await fetch(`https://dummyjson.com/recipes/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch recipe');
  }

  const recipe = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <NavBar />

      {/* Header Section */}
      <header className="py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center">
        <h1 className="text-4xl lg:text-5xl font-bold">{recipe.name}</h1>
        <p className="mt-4 text-lg">A detailed guide to prepare this amazing recipe</p>
      </header>

      {/* Recipe Details Section */}
      <main className="container mx-auto px-4 py-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Recipe Image */}
          <Image
            src={recipe.image || '/placeholder.jpg'}
            width={600}
            height={600}
            alt={recipe.name}
            className="rounded-lg shadow-lg object-cover"
          />

          {/* Ingredients Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Ingredients
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              {recipe.ingredients?.map((ingredient: string, index: number) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 text-center mb-6">
            Instructions
          </h2>
          <ol className="list-decimal pl-10 space-y-4 text-gray-700 dark:text-gray-300">
            {recipe.instructions?.map((instruction: string, index: number) => (
              <li key={index} className="leading-relaxed">
                {instruction}
              </li>
            ))}
          </ol>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-gray-100 dark:bg-gray-800 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          &copy; 2024 Chefs{"'"} Secrets by Kiram Zodiac. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default RecipeDetails;
