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

export default function DashboardPage() {
  const [airdropData, setAirdropData] = useState<AirdropStatus | null>(null)
  const [holders, setHolders] = useState<Holder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusRes, holdersRes] = await Promise.all([
          fetch('/api/airdrop-status'),
          fetch('/api/top-holders'),
        ])

        const statusData = await statusRes.json()
        const holdersData = await holdersRes.json()

        setAirdropData(statusData)
        setHolders(holdersData.topHolders)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 60000) // Refresh every minute

    return () => clearInterval(interval)
  }, [])

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
              {/* Countdown Timer Section */}
              <div className="rounded-lg border border-border bg-surface/50 p-8">
                <CountdownTimer />
              </div>

              {/* Stats Grid */}
              {airdropData && (
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
                    <p className="text-3xl font-bold text-primary">
                      {(airdropData.epochHistory.reduce((sum, e) => sum + e.pumpAmount, 0)).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">PUMP tokens</p>
                  </div>
                </div>
              )}

              {/* Epoch History */}
              {airdropData && (
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
                        {airdropData.epochHistory.map((epoch) => (
                          <tr key={epoch.epoch} className="border-b border-border/50 hover:bg-surface/50 transition-colors">
                            <td className="py-3 px-4 text-foreground font-medium">#{epoch.epoch}</td>
                            <td className="py-3 px-4 text-primary font-semibold">{epoch.pumpAmount.toFixed(2)}</td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {new Date(epoch.timestamp).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

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
                      {holders.map((holder) => (
                        <tr key={holder.rank} className="border-b border-border/50 hover:bg-surface/50 transition-colors">
                          <td className="py-3 px-4 text-foreground font-medium w-12">{holder.rank}</td>
                          <td className="py-3 px-4 text-muted-foreground font-mono text-xs">{holder.address}</td>
                          <td className="py-3 px-4 text-foreground text-right font-semibold">
                            {holder.balance.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-primary text-right font-semibold">{holder.percentage}%</td>
                        </tr>
                      ))}
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
