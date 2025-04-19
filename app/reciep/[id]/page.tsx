'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/hooks/use-toast';
import { BookMarkedIcon, HeartIcon } from 'lucide-react';
import { SkeletonCard } from '@/app/SkeltonCard';

interface DetailsProps {
  id: number;
  name: string;
  image: string;
  description: string[];
  ingredients: string[];
  instructions: string[];
}

type tParams = Promise<{ id: number[] }>;

function RecipeDetails({ params }: { params: tParams }) {
  const { status } = useSession();
  const [saved, setSaved] = useState(false);
  const [recipe, setRecipe] = useState<DetailsProps>({
    id: 0,
    name: '',
    image: '',
    description: [],
    ingredients: [],
    instructions: [],
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const { id } = await params;
        const res = await fetch(`https://dummyjson.com/recipes/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const data = await res.json();
        setRecipe(data);
      } catch  {
        toast({
          description: 'Error fetching recipe. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [params, toast]);

  const saveRecipe = () => {
    if (status === 'unauthenticated') {
      toast({
        description: 'Please sign in to save the recipe.',
        variant: 'destructive',
      });
      return;
    }

    const existingRecipes: DetailsProps[] = JSON.parse(localStorage.getItem('recipe') || '[]');
    const alreadySaved = existingRecipes.some((rec) => rec.id === recipe.id);

    if (alreadySaved) {
      toast({
        description: 'Recipe already exists in your saved list.',
        variant: 'destructive',
      });
      setSaved(true);
      return;
    }

    const updatedRecipes = [...existingRecipes, recipe];
    localStorage.setItem('recipe', JSON.stringify(updatedRecipes));
    toast({
      description: 'Recipe saved successfully!',
      variant: 'default',
    });
    setSaved(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header Section */}
      <header className="py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center">
        <h1 className="text-4xl lg:text-5xl font-bold">{recipe.name}</h1>
        <p className="mt-4 text-lg">A detailed guide to prepare this amazing recipe</p>
      </header>

      {/* Recipe Details Section */}
      <main className="container mx-auto px-4 py-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Recipe Image */}
          {recipe.image ? (
            <Image
              src={recipe.image}
              width={500}
              height={500}
              alt={recipe.name}
              className="rounded-lg shadow-lg object-cover"
            />
          ) : (
            <SkeletonCard />
          )}

          {/* Ingredients Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Ingredients
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <Button
              onClick={saveRecipe}
              className={`px-4 py-2 text-sm font-medium text-center text-white rounded-full transition-colors duration-300 ${
                saved
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {saved ? <BookMarkedIcon className="mr-2" /> : <HeartIcon className="mr-2" />}
              {saved ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>

        {/* Instructions Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 text-center mb-6">
            Instructions
          </h2>
          <ol className="list-decimal pl-10 space-y-4 text-gray-700 dark:text-gray-300">
            {recipe.instructions.map((instruction, index) => (
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
