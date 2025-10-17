import { NextRequest, NextResponse } from 'next/server'
import { analyzeToken } from '@/lib/analysis'

export async function POST(request: NextRequest) {
  try {
    const { contractAddress } = await request.json()

    if (!contractAddress) {
      return NextResponse.json(
        { error: 'Contract address is required' },
        { status: 400 }
      )
    }

    // Perform analysis
    const analysis = await analyzeToken(contractAddress)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze token' },
      { status: 500 }
    )
  }
}