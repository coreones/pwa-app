import React from "react";

export default function BillTag({
  setTab,
}: {
  setTab: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  return (
    <div
      className={` grid grid-cols-1 grid-rows-4 absolute top-0 left-0 w-full min-h-screen bg-[#21A29D] `}
    >
      <div className=" flex flex-col  row-span-1 justify-between-center w-full p-4">
        <div className="mb-8 text-xl font-bold rext-white">
          <button onClick={() => setTab(null)} className="hover:bg-alternate/20 p-2 rounded-full">
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
        {/* Header */}
        <h1 className="text-center text-2xl font-semibold w-full text-white mb-6">
          Set BillTag
        </h1>

        <h1 className="text-center text-lg">
          Create a bill tag to be paid by Bill point users
        </h1>
      </div>

      <div className=" row-span-3 space-y-10 bg-white rounded-t-[60px] flex items-center w-full p-4">
        <div className="space-y-10 max-w-md mx-auto w-full text-lg">
          <div className="space-y-4">
            <div>
              <label className="block  font-medium text-black mb-2">
                BillTag
              </label>

              <input
                type="text"
                placeholder="@Tag"
                className="w-full px-4 py-3 border text-black/90 placeholder:text-black/60r bg-white/90 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21A29D] focus:border-transparent"
              />
            </div>
          </div>

          <button className="w-full bg-primary text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#21A29D]/90 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
