// components/QuestionCard.js
import { motion } from 'framer-motion'

export default function QuestionCard({ question, onSelect }) {
  return (
    <motion.div
      key={question.question}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-xl font-medium mb-4">{question.question}</h3>
      
      {/* Responsive grid: 1 column on mobile, 2 on md+ */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className="w-full text-left px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition"
          >
            {opt}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
