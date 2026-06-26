import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const solscanApi = `https://api.solscan.io/token/holders?tokenAddress=${process.env.NEXT_PUBLIC_AIRDROP_CA}`
    
    if (!process.env.NEXT_PUBLIC_AIRDROP_CA) {
      return NextResponse.json(
        { error: 'Missing environment variable: NEXT_PUBLIC_AIRDROP_CA' },
        { status: 400 }
      )
    }

    const response = await fetch(solscanApi, {
      headers: process.env.SOLSCAN_API_KEY 
        ? { 'token': process.env.SOLSCAN_API_KEY }
        : {},
    })

    if (!response.ok) {
      throw new Error(`Solscan API error: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching top holders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch top holders' },
      { status: 500 }
    )
  }
}
