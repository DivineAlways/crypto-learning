"use server"

import { getCryptoPrice, getCryptoMetadata, getHistoricalCryptoData } from "@/lib/coingecko"

const cryptoIdMap: { [key: string]: string } = {
  "BTC-USD": "bitcoin",
  "ETH-USD": "ethereum",
  "ADA-USD": "cardano",
  "DOT-USD": "polkadot",
  // Add more mappings as needed
}

export async function fetchMarketData(symbols: string[]) {
  try {
    const prices = await Promise.all(
      symbols.map(async (symbol) => {
        try {
          const coinId = cryptoIdMap[symbol]
          if (!coinId) {
            throw new Error(`Unknown crypto symbol: ${symbol}`)
          }
          const [priceData, metaData] = await Promise.all([getCryptoPrice(coinId), getCryptoMetadata(coinId)])

          return {
            symbol,
            name: metaData.name,
            price: priceData.usd,
            change: priceData.usd_24h_change,
            percentChange: priceData.usd_24h_change,
            volume: priceData.usd_24h_vol,
            timestamp: priceData.last_updated_at * 1000,
          }
        } catch (error) {
          console.error(`Error fetching data for ${symbol}:`, error)
          return {
            symbol,
            name: symbol,
            price: null,
            change: null,
            percentChange: null,
            volume: null,
            timestamp: null,
          }
        }
      }),
    )

    return { prices, error: null }
  } catch (error) {
    console.error("Crypto data fetch error:", error)
    return {
      prices: [],
      error: error instanceof Error ? error.message : "Failed to fetch crypto data",
    }
  }
}

export async function fetchHistoricalCryptoPrices(symbol: string, days = 30) {
  try {
    const coinId = cryptoIdMap[symbol]
    if (!coinId) {
      throw new Error(`Unknown crypto symbol: ${symbol}`)
    }
    const data = await getHistoricalCryptoData(coinId, days)
    return { data, error: null }
  } catch (error) {
    console.error("Historical crypto data fetch error:", error)
    return {
      data: [],
      error: error instanceof Error ? error.message : "Failed to fetch historical crypto data",
    }
  }
}

