"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { fetchCryptoData } from "@/app/actions"
import { CryptoChart } from "@/components/crypto-chart"

export function CryptoOverview() {
  const [cryptoData, setCryptoData] = useState<any[]>([])
  const [searchTicker, setSearchTicker] = useState("")

  const fetchData = useCallback(async (symbols: string[]) => {
    const { prices } = await fetchCryptoData(symbols)
    setCryptoData(prices)
  }, [])

  useEffect(() => {
    fetchData(["BTC-USD", "ETH-USD", "ADA-USD", "DOT-USD"])
  }, [fetchData])

  const handleSearch = () => {
    if (searchTicker) {
      fetchData([...cryptoData.map((item) => item.symbol), searchTicker])
    }
  }

  return (
    <Card className="bg-gray-50 dark:bg-gray-800">
      <CardHeader>
        <CardTitle>Crypto Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex mb-4">
          <Input
            type="text"
            placeholder="Enter crypto symbol (e.g., BTC-USD)..."
            value={searchTicker}
            onChange={(e) => setSearchTicker(e.target.value)}
            className="mr-2"
          />
          <Button onClick={handleSearch}>Add</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cryptoData.map((item) => (
            <CryptoChart
              key={item.symbol}
              symbol={item.symbol}
              name={item.name}
              currentPrice={item.price}
              percentChange={item.percentChange}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

