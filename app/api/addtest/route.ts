import { supabase } from "@/app/supabase";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    
const {userName,userImage,testimonial,rating} = await req.json()

try {
    const {data,error} = await supabase.from('testimonials').insert({userName,userImage,testimonial,rating}).select()

if(error){
    console.log('an error occured');
    
}

return NextResponse.json(data)

    
} catch (error) {
    return NextResponse.json(error)
}

}