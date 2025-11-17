import { Outfit, Ovo} from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600", "700"]
});

const ovo = Ovo({
  subsets: ["latin"], weight: ["400"]
});



export const metadata = {
  title: {
    default: "Shreerama's Portfolio - AI & Full-Stack Developer",
    template: "%s | Shreerama's Portfolio"
  },
  description: "Shreerama - Full-Stack Developer specializing in AI, Robotics, and Automation. Building intelligent systems with Next.js, React, Python, and cutting-edge technologies. Explore my portfolio of AI agents, trading workflows, and innovative projects.",
  keywords: [
    "Shreerama",
    "Shreerama Shiva Sai Bharadwaja",
    "Full-Stack Developer",
    "AI Developer",
    "Robotics Engineer",
    "Next.js Developer",
    "React Developer",
    "Python Developer",
    "Machine Learning",
    "Automation",
    "Portfolio",
    "Multi-Agent Systems",
    "Trading Algorithms",
    "Chatbot Development",
    "Web Development",
    "SaaS Development"
  ],
  authors: [{ name: "Shreerama" }],
  creator: "Shreerama",
  publisher: "Shreerama's Portfolio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://srama.co.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Shreerama's Portfolio - AI & Full-Stack Developer",
    description: "Expert Full-Stack Developer specializing in AI, Robotics, and Automation. Building intelligent systems with Next.js, React, Python, and cutting-edge technologies.",
    url: 'https://srama.co.in',
    siteName: "Shreerama's Portfolio",
    images: [
      {
        url: '/assets/shreerama-projects/og_image.png',
        width: 1200,
        height: 630,
        alt: 'Shreerama - AI & Full-Stack Developer Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Shreerama's Portfolio - AI & Full-Stack Developer",
    description: "Expert Full-Stack Developer specializing in AI, Robotics, and Automation. Building intelligent systems with Next.js, React, Python, and cutting-edge technologies.",
    images: ['/assets/shreerama-projects/og_image.png'],
    creator: '@shreerama9',
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
  verification: {
    google: 'TzCnkdqlNAQx5iCsxYZc36Rd2yL7o9Wsc1QTJg5bpDU',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shreerama",
    "url": "https://srama.co.in",
    "sameAs": [
      "https://github.com/shreerama9",
      "https://linkedin.com/in/shreerama9",
      "https://twitter.com/shreerama9"
    ],
    "jobTitle": "Full-Stack Developer & AI Engineer",
    "description": "Expert Full-Stack Developer specializing in AI, Robotics, and Automation",
    "knowsAbout": [
      "Next.js",
      "React",
      "Python",
      "Machine Learning",
      "Robotics",
      "Automation",
      "AI Development",
      "Web Development",
      "SaaS Development"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Panjab University (UIET)",
      "address": "Chandigarh, India"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "ThinkMetal Private Limited",
      "address": "Chennai, India"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "description": "Full-Stack Developer and AI Engineer with expertise in building intelligent systems, automation workflows, and innovative web applications",
      "occupationLocation": {
        "@type": "Place",
        "address": "Chennai, India"
      }
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1WDXVYF0F2"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1WDXVYF0F2');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
