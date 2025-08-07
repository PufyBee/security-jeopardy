/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // By default Next uses server‐side rendering for pages with getServerSideProps
  // so we do NOT include `output: 'export'` here.
}

module.exports = nextConfig
