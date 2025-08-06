// pages/quiz.js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import questions from '../data/questions.json'
import QuestionCard from '../components/QuestionCard'
import Timer from '../components/Timer'

export default function QuizPage() {
  const router = useRouter()
  const { category } = router.query

  // 1) State hooks (always in the same order)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeUp, setTimeUp] = useState(false)

  // 2) Derive filtered questions once router is ready
  const allQs = router.isReady
    ? questions.filter(q => q.category === category)
    : []

  // 3) Side-effect for timer expiry (always registered)
  useEffect(() => {
    if (timeUp) {
      handleAnswer(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeUp])

  // 4) Early loading / error returns
  if (!router.isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    )
  }

  if (allQs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-xl text-red-500">
          No questions found for “{category}”.
        </p>
      </div>
    )
  }

  // 5) Answer handler
  function handleAnswer(selected) {
    const current = allQs[index]

    if (selected === current.answerIndex) {
      setScore(s => s + 1)
    }

    if (index + 1 < allQs.length) {
      setIndex(i => i + 1)
      setTimeUp(false)
    } else {
      const finalScore = score + (selected === current.answerIndex ? 1 : 0)
      router.push(`/results?score=${finalScore}&total=${allQs.length}`)
    }
  }

  // 6) Main render
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          {category} Quiz
        </h2>

        <Timer
          duration={30}
          onExpire={() => setTimeUp(true)}
          key={index}
        />

        <QuestionCard
          question={allQs[index]}
          onSelect={handleAnswer}
        />

        <div className="text-center text-lg">
          Score: <span className="font-bold">{score} / {allQs.length}</span>
        </div>
      </div>
    </div>
  )
}
