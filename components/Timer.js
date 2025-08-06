// components/Timer.js
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Timer({ duration, onExpire }) {
  const [seconds, setSeconds] = useState(duration)

  useEffect(() => {
    if (seconds <= 0) {
      onExpire()
      return
    }
    const id = setTimeout(() => setSeconds(s => s - 1), 1000)
    return () => clearTimeout(id)
  }, [seconds])

  return (
    <div className="relative h-4 bg-gray-700 rounded overflow-hidden">
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: `${(seconds / duration) * 100}%` }}
        transition={{ duration: 1, ease: 'linear' }}
        className="absolute inset-0 bg-green-400"
      />
      <div className="relative text-xs text-center">{seconds}s left</div>
    </div>
  )
}
