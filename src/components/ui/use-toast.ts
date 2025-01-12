import { useToast as useToastOriginal } from "@/components/ui/toast"

export function useToast() {
  const { toast } = useToastOriginal()
  
  return {
    success: (message: string) => {
      toast({
        title: "Success",
        description: message,
        variant: "default",
      })
    },
    error: (message: string) => {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
    }
  }
}