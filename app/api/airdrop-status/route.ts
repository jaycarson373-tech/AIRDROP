import { NextResponse } from 'next/server'

type EpochRow = {
  epoch_id: string
  status: string | null
  eligible_count: number | null
  mcdx_bought: string | number | null
  mcdx_distributed: string | number | null
  started_at: string | null
  completed_at: string | null
}

const emptyStatus = () => ({
  currentEpoch: 0,
  totalEpochs: 0,
  lastPumpAirdropped: 0,
  nextDropTime: nextDropTime(),
  epochHistory: [],
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

function epochNumber(epochId: string, fallback: number) {
  const timestamp = Date.parse(epochId)
  if (!Number.isFinite(timestamp)) return fallback
  return Math.floor(timestamp / (5 * 60 * 1000))
}

function nextDropTime() {
  const now = Date.now()
  const fiveMinutes = 5 * 60 * 1000
  return new Date(Math.ceil(now / fiveMinutes) * fiveMinutes).toISOString()
}

export async function GET() {
  try {
    const supabase = getSupabaseConfig()

    if (!supabase) {
      return NextResponse.json({ ...emptyStatus(), warning: 'Missing Supabase env vars' })
    }

    const response = await fetch(
      `${supabase.url}/rest/v1/epochs?select=epoch_id,status,eligible_count,mcdx_bought,mcdx_distributed,started_at,completed_at&order=started_at.desc&limit=20`,
      {
        headers: {
          apikey: supabase.key,
          Authorization: `Bearer ${supabase.key}`,
        },
        cache: 'no-store',
      },
    )

    if (!response.ok) {
      throw new Error(`Supabase epochs error: ${response.status}`)
    }

    const rows = (await response.json()) as EpochRow[]
    const completedRows = rows.filter((row) => row.status === 'completed' || row.status === 'skipped')
    const latest = completedRows[0] ?? rows[0]

    const epochHistory = completedRows.slice(0, 10).map((row, index) => ({
      epoch: epochNumber(row.epoch_id, completedRows.length - index),
      pumpAmount: toNumber(row.mcdx_distributed),
      timestamp: row.completed_at ?? row.started_at ?? row.epoch_id,
    }))

    return NextResponse.json({
      currentEpoch: latest ? epochNumber(latest.epoch_id, rows.length) : 0,
      totalEpochs: rows.length,
      lastPumpAirdropped: epochHistory[0]?.pumpAmount ?? 0,
      nextDropTime: nextDropTime(),
      epochHistory,
    })
  } catch (error) {
    console.error('Error fetching airdrop status:', error)
    return NextResponse.json({ ...emptyStatus(), warning: 'Failed to fetch airdrop status' })
  }
}
