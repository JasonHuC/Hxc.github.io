import NextBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

const VERCEL_BLOB_STORE_ID = process.env.BLOB_READ_WRITE_TOKEN?.match(
    /^vercel_blob_rw_([a-z0-9]+)_[a-z0-9]+$/i,
)?.[1].toLowerCase();

const HOSTNAME_VERCEL_BLOB = VERCEL_BLOB_STORE_ID
    ? `${VERCEL_BLOB_STORE_ID}.public.blob.vercel-storage.com`
    : undefined;

const HOSTNAME_CLOUDFLARE_R2 =
    process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_DOMAIN;

const HOSTNAME_AWS_S3 =
    process.env.NEXT_PUBLIC_AWS_S3_BUCKET &&
    process.env.NEXT_PUBLIC_AWS_S3_REGION
        ? `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com`
        : undefined;

const createRemotePattern = (hostname) => hostname
    ? {
        protocol: 'https',
        hostname,
        port: '',
        pathname: '/**',
    }
    : [];

/** @type {import('next').NextConfig} */
const config = {
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },
    reactStrictMode: false,  // Disable React Strict Mode to avoid double rendering in development
    images: {
        imageSizes: [200],
        remotePatterns: [
            // Combine remote patterns from both files
            {
                protocol: 'https',
                hostname: '**.aliyuncs.com',
            },
            {
                protocol: 'http',
                hostname: '**.aliyuncs.com',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
            {
                protocol: 'http',
                hostname: 'placehold.co',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            // Add Vercel Blob, Cloudflare R2, and AWS S3 remote patterns
            ...[].concat(
                createRemotePattern(HOSTNAME_VERCEL_BLOB),
                createRemotePattern(HOSTNAME_CLOUDFLARE_R2),
                createRemotePattern(HOSTNAME_AWS_S3)
            ),
        ],
        minimumCacheTTL: 31536000, // Cache time for images (1 year)
    },
};

// Export combined configuration with bundle analyzer enabled if required
export default withBundleAnalyzer(config);