"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"

interface CountdownTimerProps {
  initialTime: number // in seconds
  onTimeUp: () => void
}

export function CountdownTimer({ initialTime, onTimeUp }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = ((initialTime - timeLeft) / initialTime) * 100

  return (
    <Card className="fixed top-4 right-4 w-40 bg-background bg-opacity-90 backdrop-blur-sm shadow-lg z-50">
      <CardContent className="p-2">
        <div className="flex items-center justify-between mb-1">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary">Time Left</span>
        </div>
        <div className="text-xl font-bold text-center mb-1 text-primary">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
        <Progress value={progress} className="h-1" />
      </CardContent>
    </Card>
  )
}