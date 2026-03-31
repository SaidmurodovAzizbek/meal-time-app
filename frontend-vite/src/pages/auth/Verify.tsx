import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  code: z.string().length(6, {
    message: "Kod 6 ta belgidan iborat bo'lishi kerak.",
  }),
})

export default function Verify() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)

  // Retrieve phone from localStorage
  const [phone, setPhone] = useState("")

  useEffect(() => {
    setPhone(localStorage.getItem("auth_phone") || "+998")
  }, [])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const res = await fetch("http://localhost:8000/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phone, code: values.code }),
      })
      
      if (!res.ok) {
        throw new Error("Invalid OTP")
      }
      
      // Verified successfully 
      navigate("/auth/setup")
    } catch (error) {
      form.setError("code", { message: "Noto'g'ri kod. 123456 ni sinab ko'ring." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = () => {
    setTimeLeft(60)
    // resend logic...
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Raqamni tasdiqlash</h1>
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-900">{phone}</span> raqamiga yuborilgan 6 xonali kodni kiriting
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bir martalik kod</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="123456" 
                    {...field} 
                    maxLength={6}
                    className="text-center tracking-widest text-lg h-12 focus-visible:ring-emerald-500 rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-11 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Tasdiqlash va Davom etish
          </Button>
        </form>
      </Form>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Kodni olmadingizmi?{" "}
          {timeLeft > 0 ? (
            <span className="text-emerald-600 font-medium">Qayta yuborish: {timeLeft}s</span>
          ) : (
            <button 
              onClick={handleResend}
              className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
            >
              Hozir qayta yuborish
            </button>
          )}
        </p>
      </div>
    </div>
  )
}
