import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ['localhost', 'example.com'], // adicione todos os domínios necessários aqui
  },
};

export default nextConfig;
