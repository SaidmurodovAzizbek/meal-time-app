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
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  phone: z.string().regex(/^\+998\d{9}$/, {
    message: "Telefon raqam +998XXXXXXXXX formatida bo'lishi kerak.",
  }),
})

export default function Register() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [generalError, setGeneralError] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "+998",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setGeneralError("")
    try {
      const res = await fetch("http://localhost:8000/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // is_register explicitly true
        body: JSON.stringify({ phone_number: values.phone, is_register: true }),
      })
      const data = await res.json()
      
      if (!res.ok) {
        setGeneralError(data.detail || "Xatolik yuz berdi")
        return
      }

      localStorage.setItem("auth_phone", values.phone)
      navigate("/auth/verify")
    } catch (error) {
      setGeneralError("Tarmoq xatosi yuz berdi. Iltimos qayta urinib ko'ring.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Ro'yxatdan o'tish</h1>
        <p className="text-sm text-gray-500">
          Yangi hisob yaratish uchun telefon raqamingizni kiriting
        </p>
      </div>

      {generalError && (
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg text-center font-medium">
          {generalError}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Telefon raqam</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="+998 90 123 45 67" 
                    {...field} 
                    className="focus-visible:ring-emerald-500 rounded-xl h-11 text-lg tracking-wide"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 text-base font-medium shadow-sm transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : null}
            Kodni olish
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-500">Akkountingiz mavjud bo'lsa, </span>
        <Link to="/auth/login" className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline">
          profilga kiring
        </Link>
      </div>
    </div>
  )
}
