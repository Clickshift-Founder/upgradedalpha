'use client'

import Link from 'next/link'
import { Twitter, Send, Github, Mail, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      href: 'https://t.me/ClickShiftAlerts',
      icon: Send,
      label: 'Telegram',
      color: 'hover:text-blue-400'
    },
    {
      href: 'https://twitter.com/ClickShift',
      icon: Twitter,
      label: 'Twitter',
      color: 'hover:text-sky-400'
    },
  ]

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { href: 'https://clickshift.io/products', label: 'All Tools' },
        { href: 'https://clickshift.io/pricing', label: 'Pricing' },
        { href: 'https://clickshift.io/faq', label: 'FAQ' },
      ]
    },
    {
      title: 'Company',
      links: [
        { href: 'https://clickshift.io/about', label: 'About Us' },
        { href: 'https://clickshift.io/blog', label: 'Blog' },
        { href: 'https://clickshift.io/contact', label: 'Contact' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { href: 'https://clickshift.io/privacy', label: 'Privacy Policy' },
        { href: 'https://clickshift.io/terms', label: 'Terms of Service' },
        { href: 'https://clickshift.io/disclaimer', label: 'Disclaimer' },
      ]
    }
  ]

  return (
    <footer className="bg-black/50 backdrop-blur-lg border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <h3 className="text-2xl font-bold gradient-text">ClickShift Alpha</h3>
            </Link>
            <p className="text-gray-400 mb-4 max-w-sm">
              The Bloomberg Terminal of DeFi. Advanced AI-powered Solana token analysis 
              with 73% accuracy. Empowering traders to make profitable decisions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg bg-white/5 ${social.color} transition-colors`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© {currentYear} ClickShift. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>for the crypto community</span>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-xs text-yellow-200/80 text-center">
              <strong>Disclaimer:</strong> ClickShift Alpha provides analysis tools for educational purposes only. 
              Trading cryptocurrencies carries significant risk. Always conduct your own research and never invest 
              more than you can afford to lose. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer