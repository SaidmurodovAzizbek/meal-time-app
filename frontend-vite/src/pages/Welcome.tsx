import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="mt-6 text-center text-4xl font-extrabold text-emerald-600">
          Meal Time
        </h1>
        <p className="mt-4 text-center text-lg text-gray-700">
          Meal Timega xush kelibsiz!
        </p>
        <p className="mt-2 text-center text-sm text-gray-500 max-w-sm mx-auto">
          Sog'lom va mazali taomlar yetkazib berish xizmati. Dasturdan foydalanish uchun ro'yxatdan o'ting!
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow sm:rounded-3xl sm:px-10 border border-gray-100 space-y-4">
          <Link to="/auth/register" className="block">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 text-lg transition-colors shadow-sm">
              Ro'yxatdan o'tish
            </Button>
          </Link>

          <div className="text-center mt-6">
            <span className="text-sm text-gray-500">Akkountingiz mavjudmi? </span>
            <Link to="/auth/login" className="text-emerald-600 font-medium hover:underline">
              Profilga kirish
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
