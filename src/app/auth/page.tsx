export default function WelcomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#21A29D] relative -z-10 via-[#21A29D]/20  to-[#21A29D]/0 p-4">
      <div className="w-full max-w-3xl">
        <div className="flex flex-col items-center justify-center text-center space-y-8 py-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <svg className="w-7 h-7 text-[#21A29D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white">CoreOnes</h1>
          </div>

          {/* Tagline */}
          <p className="text-xl font-black text-black max-w-sm leading-relaxed">
            Every bill you pay supports your favorite creator
          </p>

          {/* Buttons */}
          <div className="w-full max-w-sm space-y-3 pt-8 relative  z-20">
            <button className="w-full bg-white text-[#21A29D] border-[#21A29D] border-2 font-semibold py-4 px-6 rounded-xl hover:bg-white/90 transition-colors">
              Sign Up
            </button>
            <button className="w-full bg-[#21A29D] border-2 border-[#21A29D] text-white  font-semibold py-4 px-6 rounded-xl hover:bg-white/10 transition-colors">
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
