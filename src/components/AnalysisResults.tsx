'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle, Clock, Target, Activity, BarChart3, Shield, DollarSign } from 'lucide-react'

interface AnalysisResultsProps {
  data: any
  showAdvanced: boolean
}

const AnalysisResults = ({ data, showAdvanced }: AnalysisResultsProps) => {
  const getSignalColor = (signal: string) => {
    switch (signal?.toUpperCase()) {
      case 'BUY':
        return 'from-green-500 to-emerald-600'
      case 'WAIT':
        return 'from-yellow-500 to-orange-600'
      case 'AVOID':
        return 'from-red-500 to-pink-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const getSignalIcon = (signal: string) => {
    switch (signal?.toUpperCase()) {
      case 'BUY':
        return <CheckCircle className="w-8 h-8" />
      case 'WAIT':
        return <Clock className="w-8 h-8" />
      case 'AVOID':
        return <XCircle className="w-8 h-8" />
      default:
        return <AlertTriangle className="w-8 h-8" />
    }
  }

  const getRiskColor = (risk: number) => {
    if (risk < 30) return 'text-green-400'
    if (risk < 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 max-w-6xl mx-auto"
    >
      {/* Main Signal Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`glass p-8 rounded-2xl bg-gradient-to-br ${getSignalColor(data.signal)} relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                {getSignalIcon(data.signal)}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-1">
                  {data.signal?.toUpperCase()} Recommendation
                </h3>
                <p className="text-white/80">
                  {data.tokenData?.symbol || 'Token'} • ${data.tokenData?.price || '0.00'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/60 mb-1">Confidence</div>
              <div className="text-2xl font-bold text-white">
                {data.confidence || 0}%
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <Target className="w-5 h-5 text-white/60 mb-2" />
              <div className="text-sm text-white/60">Entry Price</div>
              <div className="text-xl font-bold text-white">
                ${data.recommendations?.entry || data.tokenData?.price || '0.00'}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <TrendingUp className="w-5 h-5 text-white/60 mb-2" />
              <div className="text-sm text-white/60">Take Profit</div>
              <div className="text-xl font-bold text-white">
                ${data.recommendations?.takeProfit || 'N/A'}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <TrendingDown className="w-5 h-5 text-white/60 mb-2" />
              <div className="text-sm text-white/60">Stop Loss</div>
              <div className="text-xl font-bold text-white">
                ${data.recommendations?.stopLoss || 'N/A'}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <Shield className="w-5 h-5 text-white/60 mb-2" />
              <div className="text-sm text-white/60">Risk Score</div>
              <div className={`text-xl font-bold ${getRiskColor(data.riskScore || 0)}`}>
                {data.riskScore || 0}/100
              </div>
            </div>
          </div>

          {/* Key Insight */}
          {data.keyInsight && (
            <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white mb-1">Key Insight</div>
                  <p className="text-sm text-white/80">{data.keyInsight}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Analysis Details Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Technical Indicators */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass p-6 rounded-xl"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="w-6 h-6 text-blue-400" />
            <h4 className="text-xl font-bold text-white">Technical Indicators</h4>
          </div>
          
          <div className="space-y-4">
            {/* RSI */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">RSI (Relative Strength Index)</span>
                <span className="text-white font-semibold">
                  {data.technical?.rsi || 'N/A'}
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                  style={{ width: `${Math.min(data.technical?.rsi || 0, 100)}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {data.technical?.rsi < 30 && '📉 Oversold - Potential buying opportunity'}
                {data.technical?.rsi >= 30 && data.technical?.rsi < 70 && '📊 Neutral momentum'}
                {data.technical?.rsi >= 70 && '📈 Overbought - Consider taking profits'}
              </div>
            </div>

            {/* ATR */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">ATR (Volatility)</span>
                <span className="text-white font-semibold">
                  {data.technical?.atr || 'N/A'}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Average True Range - Volatility measure for stop-loss calculation
              </div>
            </div>

            {/* Volume */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">24h Volume</span>
                <span className="text-white font-semibold">
                  ${(data.tokenData?.volume24h || 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Holder Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-6 rounded-xl"
        >
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="w-6 h-6 text-purple-400" />
            <h4 className="text-xl font-bold text-white">Holder Analysis</h4>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Top Holder</span>
              <span className="text-white font-semibold">
                {data.holderAnalysis?.topHolder || 'N/A'}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Top 10 Holders</span>
              <span className="text-white font-semibold">
                {data.holderAnalysis?.top10 || 'N/A'}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Total Holders</span>
              <span className="text-white font-semibold">
                {(data.holderAnalysis?.totalHolders || 0).toLocaleString()}
              </span>
            </div>
            
            {data.holderAnalysis?.warning && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-300">{data.holderAnalysis.warning}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Advanced Technical Analysis (Toggleable) */}
      {showAdvanced && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
          className="glass p-6 rounded-xl"
        >
          <div className="flex items-center space-x-3 mb-6">
            <DollarSign className="w-6 h-6 text-green-400" />
            <h4 className="text-xl font-bold text-white">Advanced Technical Analysis</h4>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Market Cap */}
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Market Cap</div>
              <div className="text-2xl font-bold text-white">
                ${(data.tokenData?.marketCap || 0).toLocaleString()}
              </div>
            </div>

            {/* Liquidity */}
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Liquidity</div>
              <div className="text-2xl font-bold text-white">
                ${(data.tokenData?.liquidity || 0).toLocaleString()}
              </div>
            </div>

            {/* Price Change */}
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">24h Change</div>
              <div className={`text-2xl font-bold ${
                (data.tokenData?.priceChange24h || 0) > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {(data.tokenData?.priceChange24h || 0) > 0 ? '+' : ''}
                {(data.tokenData?.priceChange24h || 0).toFixed(2)}%
              </div>
            </div>
          </div>

          {/* Detailed Explanations */}
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h5 className="text-sm font-semibold text-blue-400 mb-2">📊 RSI Explanation</h5>
              <p className="text-xs text-gray-300">
                RSI measures momentum on a scale of 0-100. Below 30 suggests oversold (potential buy), 
                above 70 suggests overbought (potential sell). Our AI uses RSI alongside other indicators 
                for more accurate predictions.
              </p>
            </div>

            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <h5 className="text-sm font-semibold text-purple-400 mb-2">🎯 ATR & Dynamic Targets</h5>
              <p className="text-xs text-gray-300">
                Average True Range (ATR) measures volatility. We use it to set dynamic stop-losses (1.5-2x ATR below entry) 
                and take-profits (2.5-4x ATR above entry) for optimized risk-reward ratios.
              </p>
            </div>

            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h5 className="text-sm font-semibold text-green-400 mb-2">🐋 Exit Cluster Prediction</h5>
              <p className="text-xs text-gray-300">
                Our patent-pending algorithm analyzes price levels, volume, and whale activity to predict 
                WHERE major holders plan to exit. This gives you {data.confidence || 73}% confidence in timing your trades.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
      >
        <p className="text-xs text-yellow-200/80 text-center">
          <strong>⚠️ Disclaimer:</strong> This analysis is for educational purposes only. 
          Always conduct your own research and never invest more than you can afford to lose. 
          Past performance does not guarantee future results.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default AnalysisResults