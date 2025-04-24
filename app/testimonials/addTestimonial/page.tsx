'use client'

import React, { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function AddTestimonials() {
  const [testimonial, setTestimonial] = useState("")
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [rating, setRating] = useState(0)

  const { data: session, status } = useSession()
  const router = useRouter()

  const userName = session?.user?.name
  const userImage = session?.user?.image

  const handleSubmit = async () => {
    if (status === "unauthenticated") {
      router.push('/')
      return
    }

    if (!testimonial.trim()) {
      setMessage("Please add a testimonial.")
      setIsSuccess(false)
      return
    }

    const res = await fetch('/api/addtest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, userImage, testimonial, rating }),
    })

    const data = await res.json()
    setTestimonial("")
    setRating(0)
    setMessage("Testimonial added successfully!")
    setIsSuccess(true)
    return data
  }

  return (
    <div className="max-w-xl mx-auto mt-16 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg space-y-6">
      <h1 className="text-3xl font-semibold text-center">Add a Testimonial</h1>

      <div className="space-y-4">
        <Textarea
          placeholder="Type your message here..."
          value={testimonial}
          onChange={(e) => setTestimonial(e.target.value)}
          required
          className="min-h-[100px]"
        />

        <div>
          <p className="mb-1 font-medium text-gray-700 dark:text-gray-300">Rate Us</p>
          <div className="flex gap-2 text-2xl text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(rating === i + 1 ? 0 : i + 1)}
                className={`transition-transform hover:scale-125 ${i < rating ? 'scale-110' : ''}`}
              >
                {i < rating ? '★' : '☆'}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Submit
        </Button>

        {message && (
          <p className={`text-center text-lg font-semibold ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

export default AddTestimonials
