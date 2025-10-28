"use client"

import ProfileHeader from '@/components/ProfileHeader'
import {useState} from 'react'

export default function Verify() {
    const [step, setStep] = useState(1)
    const [stage, setStage] = useState("nin")

    const handleNextStage = () => {
        switch(stage){
            
        }
    }
  return (
     <div className="container">
          {/* Header */}
          <ProfileHeader title="Verify" />
    
          {/* Content */}
          <div className="w-full p-4">
            <div className="w-full p-4 text-stone-400 text-sm">
              
            </div>
    
          
          </div>
    
          
        </div>
  )
}
