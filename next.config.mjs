/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      config.externals = [...config.externals, '@mapbox/node-pre-gyp'];
      return config;
    },
  };
  
  export default nextConfig;
  