import Image from "next/image"

export default function SelectCreatorPage() {
  const creators = [
    { name: "Adaeze", verified: true, image: "/img/user.png" },
    { name: "Bia Olu", verified: true, image: "/img/user.png" },
    { name: "Eniola", verified: true, image: "/img/user.png" },
    { name: "Eniola", verified: true, image: "/img/user.png" },
    { name: "Fraesh", verified: true, image: "/img/user.png" },
    { name: "Kemi", verified: true, image: "/img/user.png" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-3xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <button className="text-gray-700 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">Who're sipping @Fraesh?</h2>
            <p className="text-xl text-gray-600">
              Choose the creatly you want to support. At your support will go to them.
            </p>
          </div>

          {/* Creator Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            {creators.map((creator, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 bg-[#21A29D]/5 rounded-xl border border-gray-200 hover:border-[#21A29D] transition-colors cursor-pointer"
              >
                <div className="relative mb-3">
                  <Image
                    src={creator.image}
                    alt={creator.name}
                    width={20}
                    height={20}
                    className="w-20 h-20 rounded-full bg-[#21A29D] object-contain"
                  />
                </div>
                <p className="font-medium text-gray-900">{creator.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <svg className="w-3 h-3 text-[#21A29D]" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  {creator.verified && (
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
