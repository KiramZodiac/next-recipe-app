"use client"

import { useToast } from "@/components/hooks/use-toast"


export function ToastSimple(message:string) {
  const { toast } = useToast()

  return (
    
        toast({
          description: message,
        })
    

  )
}
