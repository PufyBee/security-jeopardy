// components/CategoryCard.js
export default function CategoryCard({ category, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-6 bg-gray-800 text-white rounded-lg shadow hover:shadow-lg transition"
    >
      <h2 className="text-xl font-semibold">{category}</h2>
    </div>
  )
}
