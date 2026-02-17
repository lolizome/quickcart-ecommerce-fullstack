/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                pathname: '**',
            },
        ],
    },
    transpilePackages: ['@clerk/nextjs', 'react-hot-toast', 'styled-jsx'],
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals = [...(config.externals || []), 'styled-jsx'];
        }
        return config;
    },
};

export default nextConfig;
