import './globals.css'
import { Bebas_Neue, Poppins } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AddCoffeeProvider } from '@/context/AddCoffeeContext';
import type { Metadata } from 'next';


const bebas = Bebas_Neue({ weight: "400", subsets: ['latin'], variable: "--font-bebas" });
const poppins = Poppins({ weight: ["300", "400", "500", "600", "700", "800", "900"], subsets: ['latin'], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: {
    default: "MVST Coffee | Premium Roasted Coffee",
    template: "%s | MVST Coffee",
  },
  description: "Make and create your favorite coffees.",
  keywords: ['coffee', 'roasted coffee', 'arabic coffee', 'robusta', 'premium coffee', 'coffee blends'],
  authors: [{ name: 'Pol de Perez' }],
  openGraph: {
    title: "MVST Coffee | Premium Roasted Coffee",
    description: "Make and create your favorite coffees.",
    url: "https://domain.com",
    siteName: "MVST Coffee",
    images: [
      {
        url: "/mvst_logo.jpeg",
        width: 1200,
        height: 630,
        alt: "MVST Coffee",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MVST Coffee | Premium Roasted Coffee",
    description: "Make and create your favorite coffees.",
    images: ["/mvst_logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebas.variable} ${poppins.variable}`}>
      <body className="font-poppins">
        <AddCoffeeProvider>
          <Header />
          {children}
          <Footer />
        </AddCoffeeProvider>
      </body>
    </html>
  );
}
