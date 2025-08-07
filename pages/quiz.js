// pages/quiz.js
import { useEffect, useState } from 'react'
import QuestionCard from '../components/QuestionCard'
import Timer from '../components/Timer'
import questions from '../data/questions.json'

// Fetch category & its questions on each request
export async function getServerSideProps({ query }) {
  const { category } = query
  const allQs = questions.filter(q => q.category === category)

  if (!category || allQs.length === 0) {
    // Return 404 if no such category
    return { notFound: true }
  }

  return {
    props: {
      category,
      allQs
    }
  }
}

export default function QuizPage({ category, allQs }) {
  const total = allQs.length
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeUp, setTimeUp] = useState(false)

  // Advance when timer expires
  useEffect(() => {
    if (timeUp) handleAnswer(null)
  }, [timeUp])

  function handleAnswer(selected) {
    const current = allQs[index]
    if (selected === current.answerIndex) {
      setScore(s => s + 1)
    }

    if (index + 1 < total) {
      setIndex(i => i + 1)
      setTimeUp(false)
    } else {
      // At end, redirect to results
      window.location.href = `/results?score=${score + (selected === current.answerIndex ? 1 : 0)}&total=${total}`
    }
  }

  const currentNumber = index + 1

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <h2 className="text-2xl font-semibold text-center">{category} Quiz</h2>

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
