"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { fetchHistoricalData } from "@/app/actions"

interface MarketChartProps {
  symbol: string
  title: string
  currentPrice: number
  percentChange: number
}

export function MarketChart({ symbol, title, currentPrice, percentChange }: MarketChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    async function loadData() {
      const { data, error } = await fetchHistoricalData(symbol)
      if (!error && data) {
        setData(
          data.map((item: any) => ({
            date: new Date(item.date).toLocaleDateString(),
            price: item.close,
          })),
        )
      }
    }
    loadData()
  }, [symbol])

  const isNegative = percentChange < 0

  return (
    <Card className="bg-[#2a2a40] p-4">
      <h3 className="text-lg mb-2 text-white">{title}</h3>
      <div className={`text-xl ${isNegative ? "text-red-500" : "text-green-500"}`}>{percentChange.toFixed(2)}%</div>
      <div className="h-[100px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line type="monotone" dataKey="price" stroke={isNegative ? "#ef4444" : "#22c55e"} dot={false} />
            <XAxis dataKey="date" hide />
            <YAxis hide domain={["auto", "auto"]} />
            <Tooltip contentStyle={{ background: "#1f2937", border: "none" }} labelStyle={{ color: "#9ca3af" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

