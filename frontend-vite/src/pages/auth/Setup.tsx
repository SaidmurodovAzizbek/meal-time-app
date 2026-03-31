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
import { useState } from "react"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Ismingiz kamida 2 ta harfdan iborat bo'lishi kerak.",
  }),
  age: z.string().regex(/^\d+$/, { message: "Yosh to'g'ri kiritilmagan" }),
  weight: z.string().regex(/^\d+(\.\d)?$/, { message: "Masalan: 75.5" }),
  height: z.string().regex(/^\d+(\.\d)?$/, { message: "Masalan: 180" }),
})

export default function Setup() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      age: "",
      weight: "",
      height: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // Simulate API profile creation
    setTimeout(() => {
      setIsLoading(false)
      alert("Profilingiz muvaffaqiyatli yaratildi!")
      navigate("/")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Profilni to'ldirish</h1>
        <p className="text-sm text-gray-500">
          Sog'lom ovqatlanishingiz uchun bazi shaxsiy ma'lumotlaringiz kerak bo'ladi
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To'liq Ism-Sharif</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} className="rounded-xl focus-visible:ring-emerald-500" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Yosh</FormLabel>
                  <FormControl>
                    <Input placeholder="25" {...field} className="rounded-xl focus-visible:ring-emerald-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vazn (kg)</FormLabel>
                  <FormControl>
                    <Input placeholder="70" {...field} className="rounded-xl focus-visible:ring-emerald-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bo'y (cm)</FormLabel>
                  <FormControl>
                    <Input placeholder="175" {...field} className="rounded-xl focus-visible:ring-emerald-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-11 mt-4 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Tugatish
          </Button>
        </form>
      </Form>
    </div>
  )
}
