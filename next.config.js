const redirects = require('./config/redirects');

module.exports = {
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return redirects;
  },
  async headers() {
    return [
      {
        source: '/app/:path*/',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};
