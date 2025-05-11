/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-froala-wysiwyg'],
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.resolve.fallback = { 
      fs: false,
      net: false,
      tls: false
    };
    return config;
  }
};

export default nextConfig; 