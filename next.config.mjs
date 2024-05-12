/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      'gw.alipayobjects.com',
      'www.spotgifts.com.br',
      'cloudflare-ipfs.com'
    ],
  },
};

export default nextConfig;
