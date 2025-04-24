'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { supabase } from '../supabase'
import Image from 'next/image'

 

interface TestimonalTypes{

  userImage:string;
  userName:string;
  testimonial:string
  rating:number

}

export default function Page() {
  const [data, setData] = useState<TestimonalTypes[]>([])

  useEffect(() => {
    const fetchTestimonial = async () => {
      const { data: test } = await supabase.from('testimonials').select("*").order('created_at', { ascending: false })
      setData(test || [])
    }
    fetchTestimonial()
  }, [])

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-sm text-primary font-medium tracking-wide">TESTIMONIALS</h2>
            <h1 className="text-3xl font-bold mt-1">Don’t Take Our Word for It!</h1>
            <p className="text-muted-foreground">Hear what our visitors are saying</p>
          </div>
          <Button asChild>
            <Link href="/testimonials/addTestimonial">Add Testimonial</Link>
          </Button>
        </div>

        {/* Carousel Section */}
        <Carousel opts={{ align: "center" }} className="w-full">
          <CarouselContent>
            {data.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-4 p-4">
                    <div className="rounded-full h-12 w-12 overflow-hidden border">
                      {item.userImage?.startsWith('http') ? (
                        <Image
                          src={item.userImage}
                          width={48}
                          height={48}
                          alt={item.userName || "User image"}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-500 flex items-center justify-center text-2xl font-bold text-white ">
                          {item.userName.slice(0,1)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-base">{item.userName}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6 pt-2 text-center">
                    <p className="text-sm text-muted-foreground italic">
                      “{item.testimonial}”
                    </p>
                    <p>{Array.from({length:5}).map((_, i)=>  (
                      <span key={i} className='text-3xl font-bold text-yellow-400'>{i < item.rating ?  '★' :'☆'}</span>
                    ) )}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
