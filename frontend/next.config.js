/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // inline svg as component
  // https://dev.to/dolearning/importing-svgs-to-next-js-nna
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
