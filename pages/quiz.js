// pages/quiz.js (excerpt)
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import questions from '../data/questions.json'
import QuestionCard from '../components/QuestionCard'
import Timer from '../components/Timer'

export default function QuizPage() {
  // ... existing hooks and router.isReady guard ...

  const allQs = questions.filter(q => q.category === category)
  const total = allQs.length
  const currentNumber = index + 1

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{ width: `${(currentNumber / total) * 100}%` }}
          />
        </div>
        <p className="text-center text-gray-300">
          Question {currentNumber} of {total}
        </p>

        {/* Timer */}
        <Timer duration={30} onExpire={() => setTimeUp(true)} key={index} />

        {/* Question */}
        <QuestionCard
          question={allQs[index]}
          onSelect={handleAnswer}
        />

        {/* Score */}
        <div className="text-center text-lg">
          Score: <span className="font-bold">{score} / {total}</span>
        </div>
      </div>
    </div>
  )
}
