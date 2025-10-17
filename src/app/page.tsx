'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, TrendingUp, Shield, Zap, Users, Target } from 'lucide-react'
import TokenAnalyzer from '@/components/TokenAnalyzer'
import DonationSection from '@/components/DonationSection'
import { useToast } from '@/components/ui/use-toast'

export default function Home() {
  const [showAnalysis, setShowAnalysis] = useState(false)
  const analysisRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Scroll to analysis when it appears
  useEffect(() => {
    if (showAnalysis && analysisRef.current) {
      setTimeout(() => {
        analysisRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }, 300)
    }
  }, [showAnalysis])

  const stats = [
    { icon: Users, value: '525+', label: 'Daily Active Users' },
    { icon: Target, value: '73%', label: 'Prediction Accuracy' },
    { icon: Shield, value: '100%', label: 'Free Analysis' },
    { icon: Zap, value: '<5s', label: 'Analysis Time' },
  ]

  const features = [
    {
      icon: TrendingUp,
      title: 'Exit Cluster Prediction',
      description: 'AI-powered prediction of where whales plan to exit with 73% accuracy'
    },
    {
      icon: Shield,
      title: 'Real Holder Data',
      description: 'Verified on-chain holder distribution, not estimates'
    },
    {
      icon: Zap,
      title: 'RSI & ATR Signals',
      description: 'Dynamic pump predictions and volatility-adjusted targets'
    },
  ]

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="badge-info">
              🚀 The Bloomberg Terminal of DeFi
            </span>
          </motion.div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Predict <span className="gradient-text">Exit Clusters</span>
            <br />Before They Happen
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Advanced AI analyzes Solana tokens in real-time. 
            Get whale movements, pump signals, and precise entry/exit predictions with 73% accuracy.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group"
              >
                <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center space-x-2 text-sm text-gray-400 mb-8"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 border-2 border-black"
                />
              ))}
            </div>
            <span className="ml-2">
              Trusted by <strong className="text-white">525+ traders</strong> daily
            </span>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="glass p-6 rounded-xl hover:bg-white/10 transition-all duration-300 group"
            >
              <feature.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Token Analyzer Section */}
      <section className="container mx-auto px-4">
        <TokenAnalyzer 
          onAnalysisStart={() => setShowAnalysis(true)}
          analysisRef={analysisRef}
        />
      </section>

      {/* Donation Section */}
      <section className="container mx-auto px-4 mt-16">
        <DonationSection />
      </section>
    </div>
  )
}