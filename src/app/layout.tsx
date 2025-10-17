import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'
import CommunityPopup from '@/components/CommunityPopup'
import { Analytics } from '@/components/Analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ClickShift Alpha - The Bloomberg Terminal of DeFi | Solana Token Analysis',
  description: 'Advanced AI-powered Solana token analysis with 73% accuracy. Predict exit clusters, whale movements, and pump signals before they happen. Used by 525+ daily traders.',
  keywords: 'Solana, token analysis, DeFi, crypto trading, pump signals, whale tracking, exit predictions, RSI, ATR, trading signals',
  authors: [{ name: 'ClickShift' }],
  creator: 'ClickShift',
  publisher: 'ClickShift',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://alpha.clickshift.io'),
  openGraph: {
    title: 'ClickShift Alpha - The Bloomberg Terminal of DeFi',
    description: 'Advanced AI-powered Solana token analysis with 73% accuracy. Join 525+ daily traders.',
    url: 'https://alpha.clickshift.io',
    siteName: 'ClickShift Alpha',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ClickShift Alpha - DeFi Analytics Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClickShift Alpha - The Bloomberg Terminal of DeFi',
    description: 'Advanced AI-powered Solana token analysis with 73% accuracy',
    images: ['/og-image.png'],
    creator: '@ClickShift',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900">
          {/* Navigation */}
          <Navigation />
          
          {/* Main Content */}
          <main className="flex-grow">
            {children}
          </main>
          
          {/* Footer */}
          <Footer />
          
          {/* Toast Notifications */}
          <Toaster />
          
          {/* Community Popup (appears after 1 minute) */}
          <CommunityPopup />
          
          {/* Analytics */}
          <Analytics />
        </div>
      </body>
    </html>
  )
}