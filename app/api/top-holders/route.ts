import { NextResponse } from 'next/server'

// Simulated data - replace with actual Solscan/Helius calls
const simulatedHolders = Array.from({ length: 50 }, (_, i) => ({
  rank: i + 1,
  address: `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`.toUpperCase(),
  balance: Math.floor(Math.random() * 1000000 + 100000),
  percentage: (Math.random() * 2 + 0.1).toFixed(2),
}))

export async function GET() {
  try {
    // TODO: Replace with actual Solscan or Helius call
    // const solscanApi = `https://api.solscan.io/token/holders?tokenAddress=${process.env.NEXT_PUBLIC_AIRDROP_CA}`
    // const response = await fetch(solscanApi)
    // const data = await response.json()

    return NextResponse.json({
      topHolders: simulatedHolders,
      totalSupply: 1000000000,
      uniqueHolders: 12543,
    })
  } catch (error) {
    console.error('Error fetching top holders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch top holders' },
      { status: 500 }
    )
  }
}
