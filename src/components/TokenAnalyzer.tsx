'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Search, Loader2, TrendingUp, AlertCircle } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import AnalysisResults from '@/components/AnalysisResults'

interface TokenAnalyzerProps {
  onAnalysisStart: () => void
  analysisRef: React.RefObject<HTMLDivElement>
}

const QUICK_TOKENS = [
  { symbol: 'BONK', address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' },
  { symbol: 'WIF', address: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm' },
  { symbol: 'POPCAT', address: '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr' },
  { symbol: 'JUP', address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN' },
  { symbol: 'PYTH', address: 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3' },
]

const TokenAnalyzer = ({ onAnalysisStart, analysisRef }: TokenAnalyzerProps) => {
  const [contractAddress, setContractAddress] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const { toast } = useToast()

  const validateSolanaAddress = (address: string): boolean => {
    // Basic Solana address validation (base58, 32-44 chars)
    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
    return base58Regex.test(address)
  }

  const analyzeToken = async (address: string = contractAddress) => {
    if (!address.trim()) {
      toast({
        title: "Error",
        description: "Please enter a contract address",
        variant: "destructive",
      })
      return
    }

    if (!validateSolanaAddress(address)) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid Solana contract address",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    onAnalysisStart()

    try {
      // Call your API route
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractAddress: address }),
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const data = await response.json()
      setAnalysisResult(data)

      // Auto-post to social media
      await fetch('/api/post-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenData: data.tokenData, analysis: data }),
      })

      toast({
        title: "Analysis Complete! ✅",
        description: `${data.tokenData?.symbol || 'Token'} analysis ready`,
      })
    } catch (error) {
      console.error('Analysis error:', error)
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze this token. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleQuickAnalysis = (address: string) => {
    setContractAddress(address)
    analyzeToken(address)
  }

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-2xl max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-center mb-6">
          <TrendingUp className="w-6 h-6 text-blue-400 mr-2" />
          <h2 className="text-2xl font-bold text-white">Analyze Any Solana Token</h2>
        </div>

        {/* Instructions */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
          <h4 className="text-blue-400 font-semibold mb-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            How it Works
          </h4>
          <p className="text-sm text-gray-300">
            Paste the contract address of any token launched on Solana. 
            ClickShift analyzes it in seconds and provides actionable insights.
            Scroll down to see results! 👇
          </p>
        </div>

        {/* Input Field */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && analyzeToken()}
            placeholder="Paste Solana contract address here..."
            className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            disabled={isAnalyzing}
          />
          <button
            onClick={() => analyzeToken()}
            disabled={isAnalyzing}
            className="btn-primary px-8 py-4 min-w-[140px] flex items-center justify-center"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Get Alpha
              </>
            )}
          </button>
        </div>

        {/* Quick Token Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <span className="text-sm text-gray-400 self-center mr-2">Quick Alpha:</span>
          {QUICK_TOKENS.map((token) => (
            <button
              key={token.symbol}
              onClick={() => handleQuickAnalysis(token.address)}
              disabled={isAnalyzing}
              className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {token.symbol}
            </button>
          ))}
        </div>

        {/* Advanced Toggle */}
        {analysisResult && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-center w-full text-sm text-gray-400 hover:text-white transition-colors"
            >
              <span className="mr-2">
                {showAdvanced ? '👆 Hide' : '👇 Show'} Advanced Technical Analysis
              </span>
            </button>
          </div>
        )}
      </motion.div>

      {/* Analysis Results */}
      <div ref={analysisRef}>
        {analysisResult && (
          <AnalysisResults 
            data={analysisResult} 
            showAdvanced={showAdvanced}
          />
        )}
      </div>

      {/* Loading Animation */}
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block"
          >
            <TrendingUp className="w-16 h-16 text-blue-400" />
          </motion.div>
          <p className="text-xl text-gray-300 mt-4 font-semibold">
            Analyzing token data...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Fetching real-time data from 7+ sources
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default TokenAnalyzer