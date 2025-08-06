// pages/index.js
import Link from 'next/link'
import questions from '../data/questions.json'

export default function Home() {
  const categories = Array.from(new Set(questions.map(q => q.category)))

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-wrap gap-6 justify-center">
      {categories.map(cat => (
        <Link
          key={cat}
          href={`/quiz?category=${encodeURIComponent(cat)}`}
          className="block w-full sm:w-auto px-6 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg transition text-center"
        >
          <h2 className="text-xl font-semibold">{cat}</h2>
        </Link>
      ))}
    </div>
  )
}
