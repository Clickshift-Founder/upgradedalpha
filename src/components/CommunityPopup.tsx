'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bell, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'

const CommunityPopup = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if popup has been shown in this session
    const popupShown = sessionStorage.getItem('communityPopupShown')
    
    if (popupShown) {
      setHasShown(true)
      return
    }

    // Show popup after 1 minute
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true)
        sessionStorage.setItem('communityPopupShown', 'true')
      }
    }, 60000) // 60000ms = 1 minute

    return () => clearTimeout(timer)
  }, [hasShown])

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative max-w-lg w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
              
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors z-10"
                aria-label="Close popup"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Content */}
              <div className="relative p-8">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="flex justify-center mb-6"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-50 animate-pulse" />
                    <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl">
                      <Send className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </motion.div>

                {/* Heading */}
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 gradient-text">
                  🎉 Join Our Trading Community!
                </h2>

                {/* Description */}
                <p className="text-gray-300 text-center mb-6">
                  Get exclusive access to:
                </p>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  {[
                    { icon: Bell, text: 'Real-time token alerts & pump signals' },
                    { icon: TrendingUp, text: 'New features & tool updates' },
                    { icon: Users, text: '525+ active traders sharing alpha' },
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <benefit.icon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{benefit.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Link
                    href={process.env.NEXT_PUBLIC_TELEGRAM_COMMUNITY || 'https://t.me/ClickShiftAlerts'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClose}
                    className="block w-full btn-primary text-center"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Join Telegram Community</span>
                    </span>
                  </Link>

                  <button
                    onClick={handleClose}
                    className="w-full py-3 px-6 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Maybe Later
                  </button>
                </div>

                {/* Trust Badge */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-xs text-center text-gray-400">
                    <span className="text-green-400 font-semibold">525+ traders</span> rely on 
                    ClickShift daily • <span className="text-purple-400 font-semibold">73% accuracy</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CommunityPopup