import { NextResponse } from 'next/server'

// Simulated data - replace with actual Helius RPC calls
const simulatedAirdropData = {
  currentEpoch: 1247,
  totalEpochs: 1247,
  lastPumpAirdropped: 425.50,
  nextDropTime: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
  epochHistory: [
    { epoch: 1247, pumpAmount: 425.50, timestamp: new Date().toISOString() },
    { epoch: 1246, pumpAmount: 418.75, timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString() },
    { epoch: 1245, pumpAmount: 422.10, timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString() },
    { epoch: 1244, pumpAmount: 420.33, timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString() },
    { epoch: 1243, pumpAmount: 419.88, timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString() },
    { epoch: 1242, pumpAmount: 424.15, timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString() },
    { epoch: 1241, pumpAmount: 421.92, timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString() },
    { epoch: 1240, pumpAmount: 423.50, timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString() },
  ],
}

export async function GET() {
  try {
    // TODO: Replace with actual Helius RPC call
    // const heliusRpc = process.env.HELIUS_RPC_URL
    // const response = await fetch(heliusRpc, {...})

    return NextResponse.json(simulatedAirdropData)
  } catch (error) {
    console.error('Error fetching airdrop status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch airdrop status' },
      { status: 500 }
    )
  }
}
