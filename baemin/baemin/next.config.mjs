/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true, // Sử dụng `true` cho redirect vĩnh viễn (HTTP 308), `false` cho tạm thời (HTTP 307)
      },
    ];
  },
  images: {
    domains: ['localhost'], // Thêm domain để Next.js cho phép tải hình ảnh từ localhost
  },
};

export default nextConfig;
