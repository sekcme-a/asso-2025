/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.8.175'],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "epvmrgguaywedyufbatz.supabase.co" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;