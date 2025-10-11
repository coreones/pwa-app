import { ArrowBigLeft } from "lucide-react";

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50 grid grid-col-1 h-full grid-rows-3">
        <div className=" flex row-span-1 items-end bg-[#21A29D] rounded-b-[40px] justify-center text-center space-y-8">
        
          <div className="  rounded-full bg-gradient-to-br from-[#3FD9D4] to-[#21A29D]/90 p-5 -mb-4 w-fit flex items-center justify-center">
            <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

        </div>

        <div className="flex row-span-3  flex-col items-center  justify-evenly">

          <div className="space-y-3 text-center">
            <h2 className="text-3xl lg:text-5xl lg:max-w-lg mx-auto font-bold text-gray-900">You're now supporting <span className="text-[#21A29D]">@Fraesh!</span> </h2>
            <p className="text-gray-600 text-2xl mx-auto max-w-md">Every bill you pay rewards them automatically.</p>
          </div>

          <button className="w-full max-w-sm bg-[#21A29D] text-white font-semibold py-4 px-6 rounded-xl hover:bg-[#21A29D]/90 transition-colors">
            Continue to Dashboard
          </button>
        </div>
      </div>
  )
}
