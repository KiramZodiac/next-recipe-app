'use client'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Recipe = {
  id: number
  name: string
  image: string
}

export default function ScrollTriggered() {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('recipe')
    setRecipes(JSON.parse(saved || '[]'))
  }, [])

  const handleDelete = (id: number) => {
    const updated = recipes.filter((recipe) => recipe.id !== id)
    setRecipes(updated)
    localStorage.setItem('recipe', JSON.stringify(updated))
    console.log('deleted');
    
  }

  

  return (

    <div style={container}>
      <h1 className='text-4xl font-black pb-20 text-center'>Saved Recipes</h1>
      {recipes.length === 0 ? (
<div>No Saved Recipes Yet!!!</div>
      ) : (
        recipes.map((recipe, i) => (
          <Card key={recipe.id} i={i} recipe={recipe} onDelete={handleDelete} />
        ))
      )}
    </div>
  )
}

interface CardProps {
  recipe: Recipe
  i: number
  onDelete: (id: number) => void
}

function Card({ recipe, i, onDelete }: CardProps) {
  const hueA = 100 + i * 20
  const hueB = hueA + 30
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`

  return (
    <>

    <motion.div
      className={`card-container-${i}`}
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      <div style={{ ...splash, background }} />
     
      <motion.div style={card} variants={cardVariants} className="card">
      <Link href={`/reciep/${recipe.id}`}> 
      <Image
          src={recipe.image}
          alt={recipe.name}
          width={200}
          height={200}
          style={{
            width: '100%',
            height: 250,
            objectFit: 'cover',
            borderRadius: '12px',
          }} /></Link>
        <p style={{ fontWeight: 'bold', marginTop: 10 }}>{recipe.name}</p>

        <Button
      onClick={() => onDelete(recipe.id)}
      className="mt-4 bg-red-500 hover:bg-red-600 text-white"
    >
        Delete
      </Button>
      </motion.div>
    </motion.div>
    
    
    </>
  )
}

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
}

const hue = (h: number) => `hsl(${h}, 100%, 50%)`

// Styles
const container: React.CSSProperties = {
  margin: '100px auto',
  maxWidth: 500,
  paddingBottom: 100,
  width: '100%',
}

const cardContainer: React.CSSProperties = {
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  paddingTop: 20,
  marginBottom: -120,
}

const splash: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
  zIndex: 1, // Ensure the splash is behind the card
}

const card: React.CSSProperties = {
  fontSize: 20,
  width: 300,
  height: 430,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
  background: '#f5f5f5',
  boxShadow:
    '0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)',
  transformOrigin: '10% 60%',
  position: 'relative', // Ensure the card is positioned relative to its container
  zIndex: 2, // Bring the card to the front
}
