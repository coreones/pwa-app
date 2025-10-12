import { AnimatePresence, motion } from 'framer-motion'
import React, { Dispatch, SetStateAction } from 'react'

export default function ComingSoon({ close }: { close: Dispatch<SetStateAction<boolean>> }) {

  return (
    <div>
      <AnimatePresence>
        {true && (
          <motion.div
            className="fixed inset-0 bg-black/40 w-full container backdrop-blur-sm flex items-end justify-center z-[99]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => close(false)}
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white flex flex-col gap-5 items-center justify-center rounded-t-3xl p-6 min-h-100 shadow-lg"
            >
              <h1 className='text-8xl text-center'>🙃</h1>
              <h3 className='text-3xl text-center font-black text-orange-400 animate-bounce'>Coming Soon!!!</h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
