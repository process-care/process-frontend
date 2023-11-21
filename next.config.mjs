/** @type {import('next').NextConfig} */

const nextConfig = {
  // experimental: {
  //   fullySpecified: true,
  // },
  
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
      ".cjs": [".cts", ".cjs"],
    }

    // Update the webpack config to use raw-loader for *.node files
    webpackConfig.module.rules.push({
      test: /\.node/,
      use: 'raw-loader',
    });

    return webpackConfig
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/process-care/**',
      },
    ],
  },
}

export default nextConfig