import { NextResponse } from 'next/server'

type EpochRow = {
  epoch_id: string
}

type SnapshotRow = {
  epoch_id: string
  wallet: string
  mcjob_balance: string | number | null
}

const emptyHolders = () => ({
  topHolders: [],
  totalSupply: 0,
  uniqueHolders: 0,
})

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.SUPABASE_SERVICE_ROLE ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) return null
  return { url: url.replace(/\/$/, ''), key }
}

function toNumber(value: string | number | null | undefined) {
  const parsed = Number(value ?? 0)
  return Number.isFinite(parsed) ? parsed : 0
}

async function supabaseGet<T>(url: string, key: string) {
  const response = await fetch(url, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Supabase error: ${response.status}`)
  }

  return (await response.json()) as T
}

export async function GET() {
  try {
    const supabase = getSupabaseConfig()

    if (!supabase) {
      return NextResponse.json({ ...emptyHolders(), warning: 'Missing Supabase env vars' })
    }

    const epochs = await supabaseGet<EpochRow[]>(
      `${supabase.url}/rest/v1/epochs?select=epoch_id&order=started_at.desc&limit=1`,
      supabase.key,
    )

    const latestEpochId = epochs[0]?.epoch_id

    if (!latestEpochId) {
      return NextResponse.json(emptyHolders())
    }

    const snapshots = await supabaseGet<SnapshotRow[]>(
      `${supabase.url}/rest/v1/snapshots?select=epoch_id,wallet,mcjob_balance&epoch_id=eq.${encodeURIComponent(latestEpochId)}&order=mcjob_balance.desc&limit=50`,
      supabase.key,
    )

    const totalSupply = snapshots.reduce((sum, row) => sum + toNumber(row.mcjob_balance), 0)
    const topHolders = snapshots.map((row, index) => {
      const balance = toNumber(row.mcjob_balance)
      const percentage = totalSupply > 0 ? ((balance / totalSupply) * 100).toFixed(2) : '0.00'

      return {
        rank: index + 1,
        address: row.wallet,
        balance,
        percentage,
      }
    })

    return NextResponse.json({
      topHolders,
      totalSupply,
      uniqueHolders: snapshots.length,
    })
  } catch (error) {
    console.error('Error fetching top holders:', error)
    return NextResponse.json({ ...emptyHolders(), warning: 'Failed to fetch top holders' })
  }
}
