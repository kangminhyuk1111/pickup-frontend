/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.NEXT_PUBLIC_API_URL + '/:path*'
            }
        ]
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*'  // 또는 특정 IP만 허용하려면 'http://192.0.0.2:3000'
                    }
                ]
            }
        ]
    },
}

module.exports = nextConfig