import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const heliusRpc = process.env.HELIUS_RPC_URL
    const airdropCA = process.env.NEXT_PUBLIC_AIRDROP_CA

    if (!heliusRpc || !airdropCA) {
      return NextResponse.json(
        { error: 'Missing environment variables: HELIUS_RPC_URL or NEXT_PUBLIC_AIRDROP_CA' },
        { status: 400 }
      )
    }

    // Fetch airdrop data from Helius RPC
    const response = await fetch(heliusRpc, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'airdrop-status',
        method: 'getProgramAccounts',
        params: [airdropCA],
      }),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching airdrop status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch airdrop status' },
      { status: 500 }
    )
  }
}
