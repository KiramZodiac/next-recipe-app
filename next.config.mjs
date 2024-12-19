/** @type {import('next').NextConfig} */
const nextConfig = {



  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        port: '',
        pathname: '/**',
      },
    ],
},
}
  

// module.exports={
//   env:{
//     NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
//   }
// }

export default nextConfig;
