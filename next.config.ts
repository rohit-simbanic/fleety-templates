import type { NextConfig } from "next";
import withPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache";

const isDev = process.env.NODE_ENV === 'development';

// Content Security Policy — non-nonce approach for static rendering compatibility
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://apis.google.com https://*.firebaseapp.com https://www.google.com https://www.gstatic.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' blob: data: https://lh3.googleusercontent.com https://ik.imagekit.io https://pub-96deed498c084b7daf1d2de76d40e3ce.r2.dev;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://www.googleapis.com https://lh3.googleusercontent.com https://ik.imagekit.io https://pub-96deed498c084b7daf1d2de76d40e3ce.r2.dev https://*.firebaseio.com https://*.firebaseapp.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://www.google.com;
  media-src 'self' blob: https://lh3.googleusercontent.com https://ik.imagekit.io https://drive.google.com https://pub-96deed498c084b7daf1d2de76d40e3ce.r2.dev;
  frame-src 'self' https://*.firebaseapp.com https://drive.google.com https://docs.google.com https://*.google.com https://*.googleusercontent.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  ${!isDev ? 'upgrade-insecure-requests;' : ''}
`;

const relaxedCspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://apis.google.com https://*.firebaseapp.com https://translate.google.com https://translate.googleapis.com https://www.google.com https://www.gstatic.com https://ssl.gstatic.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com https://cdn.jsdelivr.net https://translate.googleapis.com https://translate.google.com https://www.google.com https://www.gstatic.com https://ssl.gstatic.com;
  img-src 'self' blob: data: https://lh3.googleusercontent.com https://ik.imagekit.io https://pub-96deed498c084b7daf1d2de76d40e3ce.r2.dev https://translate.google.com https://translate.googleapis.com https://www.google.com https://www.gstatic.com https://ssl.gstatic.com;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://www.googleapis.com https://lh3.googleusercontent.com https://ik.imagekit.io https://pub-96deed498c084b7daf1d2de76d40e3ce.r2.dev https://*.firebaseio.com https://*.firebaseapp.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://translate.googleapis.com https://translate.google.com https://www.gstatic.com https://ssl.gstatic.com https://www.google.com;
  media-src 'self' blob: https://lh3.googleusercontent.com https://ik.imagekit.io https://drive.google.com https://pub-96deed498c084b7daf1d2de76d40e3ce.r2.dev;
  frame-src 'self' https://*.firebaseapp.com https://drive.google.com https://docs.google.com https://translate.google.com https://translate.googleapis.com https://www.google.com https://*.google.com https://*.googleusercontent.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  ${!isDev ? 'upgrade-insecure-requests;' : ''}
`;

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [65, 70, 75],
    deviceSizes: [640, 750, 828, 1080, 1280, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-96deed498c084b7daf1d2de76d40e3ce.r2.dev',
        pathname: '/**',
      },
    ],
  },
  // Use webpack for next-pwa compatibility
  turbopack: {},
  async headers() {
    const sharedHeaders = [
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'Cross-Origin-Opener-Policy',
        value: 'same-origin-allow-popups',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      },
    ];

    return [
      {
        source: '/api/admin/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
      {
        source: '/documentation',
        headers: [
          ...sharedHeaders,
        ],
      },
      {
        source: '/documentation/:path*',
        headers: [
          ...sharedHeaders,
        ],
      },
      {
        source: '/((?!documentation(?:/|$)).*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\s{2,}/g, ' ').trim(),
          },
          ...sharedHeaders,
        ],
      },
    ];
  },
};

const customRuntimeCaching = [
  // Google User Content (Photos)
  {
    urlPattern: ({ url }: { url: URL }) => {
      return url.origin === 'https://lh3.googleusercontent.com';
    },
    handler: 'CacheFirst',
    options: {
      cacheName: 'google-usercontent-images',
      expiration: {
        maxEntries: 150,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      },
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  },
  // ImageKit Images
  {
    urlPattern: ({ url }: { url: URL }) => {
      return (
        url.origin === 'https://ik.imagekit.io' &&
        !url.pathname.includes('.m3u8') &&
        !url.pathname.includes('.ts')
      );
    },
    handler: 'CacheFirst',
    options: {
      cacheName: 'imagekit-images',
      expiration: {
        maxEntries: 150,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      },
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  },
  // ImageKit Videos (HLS)
  {
    urlPattern: ({ url }: { url: URL }) => {
      return (
        url.origin === 'https://ik.imagekit.io' &&
        (url.pathname.includes('.m3u8') || url.pathname.includes('.ts') || url.pathname.includes('ik-master'))
      );
    },
    handler: 'CacheFirst',
    options: {
      rangeRequests: true,
      cacheName: 'imagekit-videos',
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      },
      cacheableResponse: {
        statuses: [0, 200, 206],
      },
    },
  },
  // Cloudflare R2 Videos (HLS)
  {
    urlPattern: ({ url }: { url: URL }) => {
      return (
        url.origin === 'https://pub-96deed498c084b7daf1d2de76d40e3ce.r2.dev' &&
        (url.pathname.includes('.m3u8') || url.pathname.includes('.ts'))
      );
    },
    handler: 'CacheFirst',
    options: {
      rangeRequests: true,
      cacheName: 'r2-videos',
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      },
      cacheableResponse: {
        statuses: [0, 200, 206],
      },
    },
  },
  // Google Drive Videos
  {
    urlPattern: ({ url }: { url: URL }) => {
      return url.origin === 'https://drive.google.com' && url.pathname.startsWith('/uc');
    },
    handler: 'CacheFirst',
    options: {
      rangeRequests: true,
      cacheName: 'google-drive-videos',
      expiration: {
        maxEntries: 20,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      },
      cacheableResponse: {
        statuses: [0, 200, 206],
      },
    },
  },
  ...runtimeCaching,
];

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: customRuntimeCaching,
});

export default pwaConfig(nextConfig);