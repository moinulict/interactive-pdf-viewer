/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add webpack config to handle canvas module dependency
  webpack: (config) => {
    // Add a rule for handling PDF.js worker files
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });
    
    return config;
  },
}

module.exports = nextConfig 