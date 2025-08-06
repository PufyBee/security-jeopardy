// pages/results.js
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

export default function Results() {
  const { score, total } = useRouter().query

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8 space-y-6">
      <motion.h1
        className="text-4xl font-bold"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        You scored {score} / {total}
      </motion.h1>

      <Link
        href="/"
        className="inline-block px-8 py-3 bg-green-500 hover:bg-green-400 rounded-full text-lg font-semibold transition"
        as={motion.a}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Play Again
      </Link>
    </div>
  )
}
