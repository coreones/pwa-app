import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 grid-rows-5 gap-10 h-screen w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className=" row-span-2 bg-gradient-to-b from-[#21A29D] to-[#21A29D]/30  p-6  flex justify-center rounded-b-3xl relative">
          <div className="flex items-center absolute p-6 top-0 w-full justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">
              Hey John <span className="inline-block">👋</span>
            </h1>
            <button className="text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>

          {/* Supporting Card */}
          <div className="bg-[#1a8a86] h-70 border-[20px] absolute -bottom-10 max-w-2xl w-full mx-auto rounded-2xl  ">
            <div className="w-full h-full rounded-2xl relative bg-gradient-to-br from-[#21A29D] to-[#21A29D]/50 flex items-center gap-4 ">
              <div className="flex-1  text-center ">
                <p className="text-white/80 text-3xl mb-1">You're supporting</p>
                <p className="text-white font-semibold text-3xl">@Fraesh</p>
              </div>
              <Image
                src="/img/user.png"
                alt="Fraesh"
                width={150}
                height={56}
                className="object-cover absolute right-0 bottom-0"
              />
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className=" row-span-3 p-6 space-y-5">
          <div className="bg-[#21A29D] text-white rounded-2xl p-5 max-w-md mx-auto flex items-center gap-4 hover:bg-[#21A29D]/90 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <span className="font-semibold text-lg">Pay Bills</span>
          </div>

          <div className="bg-[#21A29D] text-white rounded-2xl p-5 max-w-md mx-auto flex items-center gap-4 hover:bg-[#21A29D]/90 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <span className="font-semibold text-lg">Wallet</span>
          </div>

          <div className="bg-[#21A29D] text-white rounded-2xl p-5 max-w-md mx-auto flex items-center gap-4 hover:bg-[#21A29D]/90 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
            </div>
            <span className="font-semibold text-lg">Rewards</span>
          </div>
        </div>
      </div>
    </div>
  );
}
