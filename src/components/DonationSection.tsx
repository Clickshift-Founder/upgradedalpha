'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Copy, CheckCircle, Wallet, Send } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

const DONATION_WALLET = process.env.NEXT_PUBLIC_DONATION_WALLET || '8YfkH2b4ppoSbBh8Ewei94uQABrqAKn87w4S2CAN7SS5'

const DonationSection = () => {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(DONATION_WALLET)
      setCopied(true)
      toast({
        title: "Address Copied! 📋",
        description: "Donation address copied to clipboard",
      })
      setTimeout(() => setCopied(false), 3000)
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please copy manually",
        variant: "destructive",
      })
    }
  }

  const quickDonation = async (amount: number) => {
    await copyAddress()
    toast({
      title: `${amount} SOL Donation Ready! ✨`,
      description: "Address copied - open your wallet to complete",
    })
  }

  const donationAmounts = [
    { sol: 0.1, usd: '~$25' },
    { sol: 0.25, usd: '~$60' },
    { sol: 0.5, usd: '~$120' },
    { sol: 1, usd: '~$240' },
  ]

  const wallets = [
    { name: 'Phantom', icon: '👻', action: () => connectWallet('phantom') },
    { name: 'Solflare', icon: '☀️', action: () => connectWallet('solflare') },
    { name: 'Backpack', icon: '🎒', action: () => connectWallet('backpack') },
  ]

  const connectWallet = async (walletType: string) => {
    await copyAddress()
    toast({
      title: `${walletType.charAt(0).toUpperCase() + walletType.slice(1)} Ready`,
      description: "Address copied - complete transfer in your wallet",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass p-8 rounded-2xl max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="inline-block mb-4"
        >
          <Heart className="w-12 h-12 text-red-400 fill-current" />
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-2">
          💎 Made Profits Using Our Tool?
        </h3>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Support our ongoing AI upgrade! Every SOL donated helps us build features 
          that make trading profitable for everyone. This tool is free for now! 😊
        </p>
      </div>

      {/* Quick Donation Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {donationAmounts.map((amount, index) => (
          <motion.button
            key={amount.sol}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            onClick={() => quickDonation(amount.sol)}
            className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30 rounded-xl transition-all duration-300 hover:scale-105 group"
          >
            <div className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">
              {amount.sol} SOL
            </div>
            <div className="text-sm text-gray-400">{amount.usd}</div>
          </motion.button>
        ))}
      </div>

      {/* Wallet Options */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {wallets.map((wallet, index) => (
          <motion.button
            key={wallet.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            onClick={wallet.action}
            className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 hover:scale-105 group"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              {wallet.icon}
            </div>
            <div className="text-sm text-gray-300">{wallet.name}</div>
          </motion.button>
        ))}
      </div>

      {/* Manual Copy Button */}
      <button
        onClick={copyAddress}
        className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center space-x-2 group"
      >
        {copied ? (
          <>
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">Address Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
            <span className="text-gray-300 group-hover:text-white transition-colors font-medium">
              📋 Copy Donation Address
            </span>
          </>
        )}
      </button>

      {/* Stats */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-white mb-1">47</div>
            <div className="text-sm text-gray-400">Generous Supporters</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-1">12.8 SOL</div>
            <div className="text-sm text-gray-400">Total Raised</div>
          </div>
        </div>
      </div>

      {/* Thank You Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 text-center"
      >
        <p className="text-xs text-gray-500">
          Thank you for supporting independent developers building amazing tools for the community! 🙏
        </p>
      </motion.div>
    </motion.div>
  )
}

export default DonationSection