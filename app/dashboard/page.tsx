'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CountdownTimer } from '@/components/countdown-timer'
import { ArrowRight } from 'lucide-react'

interface AirdropStatus {
  currentEpoch: number
  totalEpochs: number
  lastPumpAirdropped: number
  nextDropTime: string
  epochHistory: Array<{
    epoch: number
    pumpAmount: number
    timestamp: string
  }>
}

interface Holder {
  rank: number
  address: string
  balance: number
  percentage: string
}

const fallbackAirdropData: AirdropStatus = {
  currentEpoch: 0,
  totalEpochs: 0,
  lastPumpAirdropped: 0,
  nextDropTime: new Date().toISOString(),
  epochHistory: [],
}

function numberOrZero(value: unknown) {
  const parsed = Number(value ?? 0)
  return Number.isFinite(parsed) ? parsed : 0
}

function normalizeAirdropData(value: unknown): AirdropStatus {
  if (!value || typeof value !== 'object') return fallbackAirdropData

  const data = value as Partial<AirdropStatus>
  const epochHistory = Array.isArray(data.epochHistory)
    ? data.epochHistory.map((epoch, index) => ({
        epoch: numberOrZero(epoch?.epoch) || index + 1,
        pumpAmount: numberOrZero(epoch?.pumpAmount),
        timestamp: epoch?.timestamp ?? new Date().toISOString(),
      }))
    : []

  return {
    currentEpoch: numberOrZero(data.currentEpoch),
    totalEpochs: numberOrZero(data.totalEpochs),
    lastPumpAirdropped: numberOrZero(data.lastPumpAirdropped),
    nextDropTime: data.nextDropTime ?? new Date().toISOString(),
    epochHistory,
  }
}

function normalizeHolders(value: unknown): Holder[] {
  if (!value || typeof value !== 'object') return []

  const topHolders = (value as { topHolders?: unknown }).topHolders
  if (!Array.isArray(topHolders)) return []

  return topHolders.map((holder, index) => {
    const row = holder as Partial<Holder>

    return {
      rank: numberOrZero(row.rank) || index + 1,
      address: row.address ?? '',
      balance: numberOrZero(row.balance),
      percentage: String(row.percentage ?? '0.00'),
    }
  })
}

export default function DashboardPage() {
  const [airdropData, setAirdropData] = useState<AirdropStatus>(fallbackAirdropData)
  const [holders, setHolders] = useState<Holder[]>([])
  const [loading, setLoading] = useState(true)
  const [warning, setWarning] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusRes, holdersRes] = await Promise.all([
          fetch('/api/airdrop-status'),
          fetch('/api/top-holders'),
        ])

        const [statusData, holdersData] = await Promise.all([
          statusRes.json().catch(() => null),
          holdersRes.json().catch(() => null),
        ])

        setAirdropData(normalizeAirdropData(statusData))
        setHolders(normalizeHolders(holdersData))
        setWarning(!statusRes.ok || !holdersRes.ok ? 'Some live dashboard data is temporarily unavailable.' : null)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setAirdropData(fallbackAirdropData)
        setHolders([])
        setWarning('Some live dashboard data is temporarily unavailable.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 60000)

    return () => clearInterval(interval)
  }, [])

  const totalAirdropped = airdropData.epochHistory.reduce((sum, epoch) => sum + epoch.pumpAmount, 0)

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Airdrop Dashboard</h1>
            <p className="text-muted-foreground">Real-time airdrop status and top holder leaderboard</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading dashboard data...</p>
            </div>
          ) : (
            <div className="grid gap-8">
              {warning && (
                <div className="rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm text-primary">
                  {warning}
                </div>
              )}

              {/* Countdown Timer Section */}
              <div className="rounded-lg border border-border bg-surface/50 p-8">
                <CountdownTimer />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-lg border border-border bg-surface/50 p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2">
                    Current Epoch
                  </p>
                  <p className="text-3xl font-bold text-primary">{airdropData.currentEpoch}</p>
                </div>

                <div className="rounded-lg border border-border bg-surface/50 p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2">
                    Total Epochs
                  </p>
                  <p className="text-3xl font-bold text-primary">{airdropData.totalEpochs}</p>
                </div>

                <div className="rounded-lg border border-border bg-surface/50 p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2">
                    Last Airdrop
                  </p>
                  <p className="text-3xl font-bold text-primary">{airdropData.lastPumpAirdropped.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground mt-1">PUMP tokens</p>
                </div>

                <div className="rounded-lg border border-border bg-surface/50 p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2">
                    Total Airdropped
                  </p>
                  <p className="text-3xl font-bold text-primary">{totalAirdropped.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground mt-1">PUMP tokens</p>
                </div>
              </div>

              {/* Epoch History */}
              <div className="rounded-lg border border-border bg-surface/50 p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Epoch History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-muted-foreground font-medium">Epoch</th>
                        <th className="text-left py-3 px-4 text-muted-foreground font-medium">PUMP Airdropped</th>
                        <th className="text-left py-3 px-4 text-muted-foreground font-medium">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {airdropData.epochHistory.length > 0 ? (
                        airdropData.epochHistory.map((epoch) => (
                          <tr key={`${epoch.epoch}-${epoch.timestamp}`} className="border-b border-border/50 hover:bg-surface/50 transition-colors">
                            <td className="py-3 px-4 text-foreground font-medium">#{epoch.epoch}</td>
                            <td className="py-3 px-4 text-primary font-semibold">{epoch.pumpAmount.toFixed(2)}</td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {new Date(epoch.timestamp).toLocaleString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="py-6 px-4 text-center text-muted-foreground">
                            No completed drops yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top 50 Holders */}
              <div className="rounded-lg border border-border bg-surface/50 p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Top 50 Holders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-muted-foreground font-medium">Rank</th>
                        <th className="text-left py-3 px-4 text-muted-foreground font-medium">Address</th>
                        <th className="text-right py-3 px-4 text-muted-foreground font-medium">Balance</th>
                        <th className="text-right py-3 px-4 text-muted-foreground font-medium">% of Supply</th>
                      </tr>
                    </thead>
                    <tbody>
                      {holders.length > 0 ? (
                        holders.map((holder) => (
                          <tr key={`${holder.rank}-${holder.address}`} className="border-b border-border/50 hover:bg-surface/50 transition-colors">
                            <td className="py-3 px-4 text-foreground font-medium w-12">{holder.rank}</td>
                            <td className="py-3 px-4 text-muted-foreground font-mono text-xs">{holder.address}</td>
                            <td className="py-3 px-4 text-foreground text-right font-semibold">
                              {holder.balance.toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-primary text-right font-semibold">{holder.percentage}%</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-6 px-4 text-center text-muted-foreground">
                            No holder snapshot yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-lg border border-border bg-surface/50 p-8 text-center">
                <h3 className="text-2xl font-semibold text-foreground mb-2">Ready to join the top holders?</h3>
                <p className="text-muted-foreground mb-6">Buy $AIRDROP now and start earning PUMP every 5 minutes.</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Get $AIRDROP
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
