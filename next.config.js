/** @type {import('next').NextConfig} */
   const nextConfig = {
     reactStrictMode: true,
     swcMinify: true,
     // Enable static exports for Cloudflare Pages
     output: 'export',
     // Disable image optimization (not supported on Cloudflare Pages)
     images: {
       unoptimized: true,
     },
   }

   module.exports = nextConfig
   
   