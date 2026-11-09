/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep old shared links to /CV.pdf working.
  async redirects() {
    return [{ source: "/CV.pdf", destination: "/Shreyash_Arali_Resume.pdf", permanent: true }];
  },
};

module.exports = nextConfig;
