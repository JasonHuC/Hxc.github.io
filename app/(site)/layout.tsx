import type {Metadata} from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
export const metadata : Metadata  ={
  metadataBase: new URL('https://huxc.vercel.app'),
  title: {
    default: 'HU XUECHENG',
    template: '%s | HU XUECHENG',
  },
  description:'Experience the difference.',
  openGraph: {
    title: 'Lee Robinson',
    description: 'Developer, writer, and creator.',
    url: 'https://leerob.io',
    siteName: 'Lee Robinson',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Lee Robinson',
    card: 'summary_large_image',
  },
  verification:{
    google:'',
  }
}

const cx = (...classes) => classes.filter(Boolean).join(' ');
export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    // Sometimes content will inevitably differ between the server and client, 
    // You can silence the hydration mismatch warning by adding suppressHydrationWarning={true} to the element.
    <html suppressHydrationWarning lang="zh-CN" className="scroll-smooth">
      <head>
      {/* 主类型（Type）：这部分指定了数据的大类。对于图片来说，主类型是 image。
子类型（Subtype）：这部分提供了关于数据更具体的信息。对于 SVG 文件，子类型是 svg+xml，表示这是一个 SVG 格式的图片，它以 XML 为基础。 */}

{/* 在 Next.js 中，public 目录是一个特殊的目录，可以用于存放静态文件，比如图片、样式表或者 JavaScript 文件。这些文件会自动映射到应用的根 URL 下。也就是说，如果你把一个文件放在 public/images 目录下，那么你可以通过 /images/your-file.png 这样的路径直接在浏览器中访问到这个文件。 */}
        <link rel="icon" type="image/svg+xml" href="/images/fuxiaochen-dark.svg" />
        {/* 验证您对网站的所有权:<meta name="google-site-verification"content=""/> */}
      </head>
      {/* Tailwind 提供了几个断点（如 sm, md, lg, xl, 2xl），其中 md: 对应的是“中等”屏幕尺寸。
      具体的宽度可以在 Tailwind 的配置文件中定义，但默认情况下通常是以 768px 作为 md 断点的最小宽度。 */}
      <body className="max-w-2xl mb-40 scroll-smooth flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto overflow-x-clip">
        {/* flex-auto = flex:1 1 auto;允许元素grow以及shrink ，且参考初始尺寸*/}
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0"></main>
      </body>
    </html>
  );
}
