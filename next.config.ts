/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.NEXT_PUBLIC_API_URL + '/:path*' // 또는 'http://localhost:8080/:path*'
            }
        ]
    }
}

module.exports = nextConfig