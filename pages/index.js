// pages/index.js
import Link from 'next/link'
import questions from '../data/questions.json'

export default function Home() {
  // Count questions per category
  const counts = questions.reduce((acc, q) => {
    acc[q.category] = (acc[q.category] || 0) + 1
    return acc
  }, {})

  // Extract unique category names
  const categories = Object.keys(counts)

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col">
      {/* Page title */}
      <h1 className="text-4xl font-bold text-center mb-8">
        Security Jeopardy
      </h1>

      {/* Category grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-grow">
        {categories.map(cat => (
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
                {counts[cat]} question{counts[cat] > 1 ? 's' : ''}
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
          </Link>
        ))}
      </div>

      {/* Footer with repo link */}
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
