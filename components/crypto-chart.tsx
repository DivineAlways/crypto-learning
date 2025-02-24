"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { fetchHistoricalCryptoPrices } from "@/app/actions"

interface CryptoChartProps {
  symbol: string
  name?: string
  currentPrice?: number
  percentChange?: number
}

export function CryptoChart({ symbol, name = "Loading...", currentPrice, percentChange }: CryptoChartProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      setError(null)
      const { data, error } = await fetchHistoricalCryptoPrices(symbol)
      if (error) {
        console.error(`Error fetching historical data for ${symbol}:`, error)
        setError(`Failed to load data for ${symbol}. ${error}`)
      } else if (data && data.length > 0) {
        setData(
          data.map((item: any) => ({
            date: new Date(item.date).toLocaleDateString(),
            price: item.price,
          })),
        )
      } else {
        setError(`No historical data available for ${symbol}`)
      }
      setLoading(false)
    }
    loadData()
  }, [symbol])

  const isNegative = (percentChange ?? 0) < 0

  return (
    <Card className="bg-[#2a2a40] p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{name || symbol}</h3>
          <p className="text-sm text-gray-400">{symbol}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold text-white">{currentPrice ? `$${currentPrice.toFixed(2)}` : "N/A"}</div>
          <div className={`text-sm ${isNegative ? "text-red-500" : "text-green-500"}`}>
            {percentChange ? `${percentChange.toFixed(2)}%` : "N/A"}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-[200px] flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      ) : error ? (
        <div className="h-[200px] flex items-center justify-center">
          <div className="text-red-500 text-center">{error}</div>
        </div>
      ) : (
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line type="monotone" dataKey="price" stroke={isNegative ? "#ef4444" : "#22c55e"} dot={false} />
              <XAxis dataKey="date" tick={{ fill: "#9ca3af" }} tickFormatter={(value) => value.split("/")[1]} />
              <YAxis domain={["auto", "auto"]} tick={{ fill: "#9ca3af" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px",
                }}
                labelStyle={{ color: "#9ca3af" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}

