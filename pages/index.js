// pages/index.js
import Link from 'next/link'
import questions from '../data/questions.json'

export default function Home() {
  const counts = questions.reduce((acc, q) => {
    acc[q.category] = (acc[q.category] || 0) + 1
    return acc
  }, {})
  let categories = Object.keys(counts)

  // If we have an odd number of cards, append a placeholder
  if (categories.length % 2 !== 0) {
    categories = [...categories, 'Coming Soon']
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col">
      <h1 className="text-4xl font-bold text-center mb-8">
        Security Jeopardy
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 flex-grow">
        {categories.map(cat => {
          const isPlaceholder = cat === 'Coming Soon'
          const count = counts[cat] || 0

          return (
            isPlaceholder ? (
              <div
                key={cat}
                className="flex items-center justify-center bg-gray-800 rounded-lg shadow-lg opacity-50"
              >
                <span className="text-xl">Coming Soon</span>
              </div>
            ) : (
              <Link
                key={cat}
                href={`/quiz?category=${encodeURIComponent(cat)}`}
                className="group relative block bg-indigo-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold group-hover:text-indigo-200">
                    {cat}
                  </h2>
                  <p className="mt-2 text-indigo-300">
                    {count} question{count > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </Link>
            )
          )
        })}
      </div>

      <footer className="mt-8 text-center text-sm text-gray-400">
        <a
          href="https://github.com/PufyBee/security-jeopardy"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          View source on GitHub
        </a>
      </footer>
    </div>
  )
}
